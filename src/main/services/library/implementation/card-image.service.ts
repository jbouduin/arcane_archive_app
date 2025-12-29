import { net } from "electron";
import { createWriteStream, existsSync, rmSync } from "fs";
import { join } from "path";
import { inject, injectable } from "tsyringe";
import { EIpcStatus } from "../../../../common/ipc";
import { CachedImageSize, CARD_IMAGE_FACE, ScryFallImageStatus } from "../../../../common/types";
import { CardSide } from "../../../../renderer/shared/types";
import { IScryfallClient } from "../../api/interface";
import { BaseService } from "../../base";
import { ICardfaceRepository } from "../../database/interface";
import { CardfaceInsertDto, CardfaceUpdateDto } from "../../database/schema";
import { IConfigurationService, IIoService, ILogService, IResultFactory } from "../../infra/interface";
import { API, DATABASE, INFRASTRUCTURE } from "../../service.tokens";
import { ICardImageService } from "../interface";

@injectable()
export class CardImageService extends BaseService implements ICardImageService {
  // #region Private fields ---------------------------------------------------
  private readonly configurationService: IConfigurationService;
  private readonly scryfallClient: IScryfallClient;
  private readonly cardfaceRepository: ICardfaceRepository;
  private readonly ioService: IIoService;
  private readonly imageCacheDirectory: string;
  private readonly cardBackCacheDirectory: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService,
    @inject(INFRASTRUCTURE.IoService) ioService: IIoService,
    @inject(API.ScryfallClient) scryfallClient: IScryfallClient,
    @inject(DATABASE.CardfaceRepository) cardfaceRepository: ICardfaceRepository
  ) {
    super(logService, resultFactory);
    this.configurationService = configurationService;
    this.scryfallClient = scryfallClient;
    this.cardfaceRepository = cardfaceRepository;
    this.ioService = ioService;
    this.imageCacheDirectory = "card-images";
    this.cardBackCacheDirectory = "card-back";
  }
  // #endregion

  // #region ICardImageService Members ----------------------------------------
  public async getImage(url: URL): Promise<Response> {
    // LATER improve error handling
    let result: Promise<Response>;
    const requestedSize = url.searchParams.get("version") as CachedImageSize || this.configurationService.preferences.cachedImageSize;
    const statusParam = url.searchParams.get("status");
    const currentStatus = statusParam
      ? ScryFallImageStatus[statusParam as keyof typeof ScryFallImageStatus]
      : ScryFallImageStatus.UNKNOWN;
    this.logService.debug("Main", "requesting image:", url);
    const cardfaceResult = await this.cardfaceRepository.findByPathAndSide(`${url.host}/${url.pathname}`, url.searchParams.get("side") as CardSide || "back");
    const recordFound = cardfaceResult.status != EIpcStatus.NotFound;
    const cachedImagePath = this.calculateCachedImagePath(url, requestedSize);
    this.logService.debug("Main", "Found cached image record:", recordFound);
    const cachedImageFound = existsSync(cachedImagePath);
    this.logService.debug("Main", "Cached file", cachedImagePath, "; found:", cachedImageFound);
    if (!cachedImageFound) {
      result = this
        .cacheImage(url, cachedImagePath, currentStatus, requestedSize, recordFound)
        .then((_cached: boolean) => net.fetch(cachedImagePath));
    } else {
      let recache = false;
      if (!recordFound) {
        recache = true;
      } else if (cardfaceResult.data.size != requestedSize || cardfaceResult.data.status != currentStatus) {
        const toRemove = this.calculateCachedImagePath(url, cardfaceResult.data.size);
        if (existsSync(toRemove)) {
          this.logService.trace("Main", "Removing old cached file", toRemove);
          rmSync(toRemove);
        }
        recache = true;
      }
      if (recache) {
        result = this
          .cacheImage(url, cachedImagePath, currentStatus, requestedSize, recordFound)
          .then((_cached: boolean) => net.fetch(cachedImagePath));
      } else {
        result = net.fetch(cachedImagePath);
      }
    }
    return result;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private calculateCachedImagePath(url: URL, size: CachedImageSize): string {
    if (size == undefined) {
      size = this.configurationService.preferences.cachedImageSize;
    }
    let result: string;
    const cacheDirectory = join(this.configurationService.configuration.dataConfiguration.cacheDirectory, this.imageCacheDirectory);
    if (url.host == CARD_IMAGE_FACE) {
      const [_cards, setCode, collectorNumber, language] = url.pathname.split("/").filter((p: string) => p != "");
      const dirName = join(
        cacheDirectory,
        size,
        setCode.toLowerCase(),
        language);
      this.ioService.createDirectoryIfNotExists(dirName);
      result = join(
        dirName,
        `${collectorNumber.padStart(6, "0")}.${url.searchParams.get("side")}.jpg`
      );
    } else {
      const dirName = join(cacheDirectory, size, this.cardBackCacheDirectory);
      this.ioService.createDirectoryIfNotExists(dirName);
      result = join(dirName, `${url.pathname}.jpg`);
    }
    return result;
  }

  private async cacheImage(url: URL, cachedImagePath: string, status: ScryFallImageStatus, size: CachedImageSize, isRecache: boolean): Promise<boolean> {
    if (this.configurationService.apiConfiguration != null) {
      let imageUrl: URL;
      let side: CardSide = "back";

      if (url.host == CARD_IMAGE_FACE) {
        imageUrl = new URL(this.configurationService.apiConfiguration.scryfallApiRoot);
        imageUrl.pathname = (imageUrl.pathname + url.pathname).replace("//", "");
        url.searchParams.forEach((v: string, k: string) => {
          if (k != "status") {
            imageUrl.searchParams.append(k, v);
          }
          if (k == "side") {
            side = v as CardSide;
          }
        });
      } else {
        const cardBackId = url.pathname.substring(1);
        imageUrl = new URL(this.configurationService.apiConfiguration.scryfallCardBackRoot +
          `/${this.configurationService.preferences.cachedImageSize}/${cardBackId.substring(0, 1)}/${cardBackId.substring(1, 2)}/${cardBackId}.jpg`
        );
      }
      const arrayBuffer: ArrayBuffer = await this.scryfallClient.fetchArrayBuffer(imageUrl);
      const buffer = Buffer.from(arrayBuffer);
      return new Promise(async (resolve, reject) => {
        if (buffer.length > 0) {
          const writeStream = createWriteStream(cachedImagePath);
          writeStream.on("error", (err: Error) => reject(err));
          writeStream.on("finish", () => resolve(true));
          writeStream.write(buffer);
          writeStream.end();
          this.logService.trace("Main", `Cached image ${imageUrl} -> ${cachedImagePath}`);
          if (isRecache) {
            const toUpdate: CardfaceUpdateDto = {
              status: status,
              size: size,
              last_synced_at: new Date().toISOString()
            };
            await this.cardfaceRepository.updateCardface(`${url.host}/${url.pathname}`, side, toUpdate);
          } else {
            const toInsert: CardfaceInsertDto = {
              path: `${url.host}/${url.pathname}`,
              side: side,
              status: status,
              size: size,
              created_at: new Date().toISOString()
            };
            await this.cardfaceRepository.insertCardface(toInsert);
          }
        } else {
          this.logService.error("Main", `Cached image ${imageUrl} -> empty response received`);
          reject(new Error("Empty response received"));
        }
      });
    } else {
      this.logService.error("Main", "Cache image -> api configuration is null");
      return Promise.reject(new Error("Api configuration is null"));
    }
  }
  // #endregion
}
