import { createWriteStream, existsSync, readFileSync } from "fs";
import { join } from "path";
import { inject, injectable } from "tsyringe";
import { ProgressCallback } from "../../../../common/ipc";
import { CardSymbolDto } from "../../../dto/card-symbol.dto";
import { IMtgCollectionClient, IScryfallClient } from "../../api/interface";
import { BaseService, IResult } from "../../base";
import { IConfigurationService, IIoService, ILogService, IResultFactory } from "../../infra/interface";
import { API, INFRASTRUCTURE } from "../../service.tokens";
import { ICardSymbolService } from "../interface";

@injectable()
export class CardSymbolService extends BaseService implements ICardSymbolService {
  // #region Private fields ---------------------------------------------------
  private readonly mtgCollectionClient: IMtgCollectionClient;
  private readonly scryfallClient: IScryfallClient;
  private readonly configurationService: IConfigurationService;
  private readonly cardSymbolCacheDirectory: string;
  private readonly ioService: IIoService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService,
    @inject(API.ApiClient) mtgCollectionClient: IMtgCollectionClient,
    @inject(API.ScryfallClient) scryfallClient: IScryfallClient,
    @inject(INFRASTRUCTURE.IoService) ioService: IIoService
  ) {
    super(logService, resultFactory);
    this.mtgCollectionClient = mtgCollectionClient;
    this.scryfallClient = scryfallClient;
    this.configurationService = configurationService;
    this.cardSymbolCacheDirectory = "card-symbols";
    this.ioService = ioService;
  }
  // #endregion

  // #region ICardSymbolService Members ---------------------------------------
  public async getCardSymbolSvg(): Promise<IResult<Map<string, string>>> {
    const result = new Map<string, string>();
    const cardSymbols = await this.mtgCollectionClient.getData<Array<CardSymbolDto>>("/public/card-symbol");
    // TODO this retrieves all CardSymbolDto's again -> so there is currently no use in caching
    // Solution: when caching store code and svguri fields of card symbols in the sqlite index database
    cardSymbols.data.forEach((cardSymbol: CardSymbolDto) => {
      const pathToFile = this.calculatedSymbolFileName(cardSymbol);
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

  public async cacheImages(_callBack: ProgressCallback): Promise<void> {
    this.ioService.createDirectoryIfNotExists(
      join(
        this.configurationService.configuration.dataConfiguration.cacheDirectory,
        this.cardSymbolCacheDirectory
      )
    );
    const cardSymbols = await this.mtgCollectionClient.getData<Array<CardSymbolDto>>("/public/card-symbol");
    await Promise.all(cardSymbols.data.map(async (cardSymbol: CardSymbolDto) => {
      const pathToFile = this.calculatedSymbolFileName(cardSymbol);

      await this.scryfallClient.fetchArrayBuffer(cardSymbol.svgUri)
        .then((arrayBuffer: ArrayBuffer) => {
          const buffer = Buffer.from(arrayBuffer);
          createWriteStream(pathToFile).write(buffer);
        });
    }));
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private calculatedSymbolFileName(cardSymbol: CardSymbolDto): string {
    const fileName = new URL(cardSymbol.svgUri).pathname.split("/").pop()!;
    return join(
      this.configurationService.configuration.dataConfiguration.cacheDirectory,
      this.cardSymbolCacheDirectory,
      fileName
    );
  }
  // #endregion
}
