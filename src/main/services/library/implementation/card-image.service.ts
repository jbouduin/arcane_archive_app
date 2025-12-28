import { net } from "electron";
import { createWriteStream, existsSync } from "fs";
import { join } from "path";
import { inject, injectable } from "tsyringe";
import { CARD_IMAGE_FACE } from "../../../../common/types";
import { IScryfallClient } from "../../api/interface";
import { BaseService } from "../../base";
import { IConfigurationService, IIoService, ILogService, IResultFactory } from "../../infra/interface";
import { API, INFRASTRUCTURE } from "../../service.tokens";
import { ICardImageService } from "../interface";

@injectable()
export class CardImageService extends BaseService implements ICardImageService {
  // #region Private fields ---------------------------------------------------
  private readonly configurationService: IConfigurationService;
  private readonly scryfallClient: IScryfallClient;
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
    @inject(API.ScryfallClient) scryfallClient: IScryfallClient
  ) {
    super(logService, resultFactory);
    this.configurationService = configurationService;
    this.scryfallClient = scryfallClient;
    this.ioService = ioService;
    this.imageCacheDirectory = "card-images";
    this.cardBackCacheDirectory = "card-back";
  }
  // #endregion

  // #region ICardImageService Members ----------------------------------------
  public getImage(url: URL): Promise<Response> {
    // LATER improve error handling
    let result: Promise<Response>;
    const cachedImagePath = this.calculateCachedImagePath(url);
    if (!existsSync(cachedImagePath)) {
      result = this.cacheImage(url, cachedImagePath).then((_cached: boolean) => net.fetch(cachedImagePath));
    } else {
      result = net.fetch(cachedImagePath);
    }
    return result;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private calculateCachedImagePath(url: URL): string {
    let result: string;
    const cacheDirectory = join(this.configurationService.configuration.dataConfiguration.cacheDirectory, this.imageCacheDirectory);
    if (url.host == CARD_IMAGE_FACE) {
      const [_cards, setCode, collectorNumber, language] = url.pathname.split("/").filter((p: string) => p != "");

      const dirName = join(
        cacheDirectory,
        setCode.toLowerCase(),
        language);
      this.ioService.createDirectoryIfNotExists(dirName);
      result = join(
        dirName,
        `${collectorNumber.padStart(6, "0")}.${url.searchParams.get("side")}.jpg`
      );
    } else {
      const dirName = join(cacheDirectory, this.cardBackCacheDirectory);
      this.ioService.createDirectoryIfNotExists(dirName);
      result = join(dirName, `${url.pathname}.jpg`);
    }
    return result;
  }

  private async cacheImage(url: URL, cachedImagePath: string): Promise<boolean> {
    if (this.configurationService.apiConfiguration != null) {
      let imageUrl: URL;
      if (url.host == CARD_IMAGE_FACE) {
        imageUrl = new URL(this.configurationService.apiConfiguration.scryfallApiRoot);
        imageUrl.pathname = (imageUrl.pathname + url.pathname).replace("//", "");
        url.searchParams.forEach((v: string, k: string) => imageUrl.searchParams.append(k, v));
      } else {
        const cardBackId = url.pathname.substring(1);
        imageUrl = new URL(this.configurationService.apiConfiguration.scryfallCardBackRoot +
          `/large/${cardBackId.substring(0, 1)}/${cardBackId.substring(1, 2)}/${cardBackId}.jpg`
        );
      }
      const arrayBuffer: ArrayBuffer = await this.scryfallClient.fetchArrayBuffer(imageUrl);
      const buffer = Buffer.from(arrayBuffer);
      // TODO store required data in index database so we can "scan" for updates of images
      return new Promise((resolve, reject) => {
        if (buffer.length > 0) {
          const writeStream = createWriteStream(cachedImagePath);
          writeStream.on("error", (err: Error) => reject(err));
          writeStream.on("finish", () => resolve(true));
          writeStream.write(buffer);
          writeStream.end();
        } else {
          reject(new Error("Empty response received"));
        }
      });
    } else {
      return Promise.reject(new Error("Api configuration is null"));
    }
  }
  // #endregion
}
