import { createWriteStream, existsSync, readFileSync } from "fs";
import { join } from "path";
import { inject, injectable } from "tsyringe";
import { ProgressCallback } from "../../../../common/ipc";
import { runSerial } from "../../../../common/util";
import { CardSymbolDto } from "../../../dto/card-symbol.dto";
import { IArcaneArchiveClient, IScryfallClient } from "../../api/interface";
import { BaseService, IResult } from "../../base";
import { ICardSymbolRepository } from "../../database/interface";
import { CardSymbolQueryDto } from "../../database/schema";
import { IConfigurationService, IIoService, ILogService, IResultFactory } from "../../infra/interface";
import { API, DATABASE, INFRASTRUCTURE } from "../../service.tokens";
import { ICardSymbolService } from "../interface";

@injectable()
export class CardSymbolService extends BaseService implements ICardSymbolService {
  // #region Private fields ---------------------------------------------------
  private readonly arcaneArchiveClient: IArcaneArchiveClient;
  private readonly scryfallClient: IScryfallClient;
  private readonly configurationService: IConfigurationService;
  private readonly cardSymbolRepository: ICardSymbolRepository;
  private readonly cardSymbolCacheDirectory: string;
  private readonly ioService: IIoService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService,
    @inject(API.ArcaneArchiveClient) arcaneArchiveClient: IArcaneArchiveClient,
    @inject(API.ScryfallClient) scryfallClient: IScryfallClient,
    @inject(INFRASTRUCTURE.IoService) ioService: IIoService,
    @inject(DATABASE.CardSymbolRepository) cardSymbolRepository: ICardSymbolRepository
  ) {
    super(logService, resultFactory);
    this.arcaneArchiveClient = arcaneArchiveClient;
    this.scryfallClient = scryfallClient;
    this.configurationService = configurationService;
    this.cardSymbolRepository = cardSymbolRepository;
    this.cardSymbolCacheDirectory = "card-symbols";
    this.ioService = ioService;
  }
  // #endregion

  // #region ICardSymbolService Members ---------------------------------------
  public async getCardSymbolSvg(): Promise<IResult<Map<string, string>>> {
    const result = new Map<string, string>();
    const cardSymbols = await this.cardSymbolRepository.getAll();
    cardSymbols.data.forEach((cardSymbol: CardSymbolQueryDto) => {
      const pathToFile = this.calculatedSymbolFileName(cardSymbol.svg_uri);
      if (existsSync(pathToFile)) {
        try {
          result.set(
            cardSymbol.code,
            readFileSync(pathToFile, { encoding: "utf-8" })
          );
        } catch (_err) {
          // LATER
        }
      }
    });
    return this.resultFactory.createSuccessResult(result);
  }

  public async cacheImages(callBack: ProgressCallback): Promise<void> {
    this.ioService.createDirectoryIfNotExists(
      join(
        this.configurationService.systemConfiguration.dataConfiguration.cacheDirectory,
        this.cardSymbolCacheDirectory
      )
    );
    const cardSymbols = await this.arcaneArchiveClient.getData<Array<CardSymbolDto>>("/public/card-symbol");
    await runSerial(
      cardSymbols.data,
      async (cardSymbol: CardSymbolDto, idx: number, total: number) => {
        callBack(`Processing card symbol '${cardSymbol.code}' (${idx}/${total})`);
        const pathToFile = this.calculatedSymbolFileName(cardSymbol.svgUri);
        await this.scryfallClient.fetchArrayBuffer(cardSymbol.svgUri)
          .then((arrayBuffer: ArrayBuffer) => {
            const buffer = Buffer.from(arrayBuffer);
            createWriteStream(pathToFile).write(buffer);
          })
          .then(() => this.cardSymbolRepository.upsert(cardSymbol.code, cardSymbol.svgUri));
      }
    );
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private calculatedSymbolFileName(svgUri: string): string {
    const fileName = new URL(svgUri).pathname.split("/").pop()!;
    return join(
      this.configurationService.systemConfiguration.dataConfiguration.cacheDirectory,
      this.cardSymbolCacheDirectory,
      fileName
    );
  }
  // #endregion
}
