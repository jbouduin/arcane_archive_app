import { createWriteStream, existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { inject, injectable } from "tsyringe";
import { CardSymbolDto } from "../../../dto/card-symbol.dto";
import { IMtgCollectionClient, IScryfallClient } from "../../api/interface";
import { BaseService, IResult } from "../../base";
import { IConfigurationService, ILogService, IResultFactory } from "../../infra/interface";
import { API, INFRASTRUCTURE } from "../../service.tokens";
import { ICardSymbolService } from "../interface/card-symbol.service";
import { ProgressCallback } from "../../../../common/ipc";

@injectable()
export class CardSymbolService extends BaseService implements ICardSymbolService {
  // #region Private fields ---------------------------------------------------
  private readonly configurationService: IConfigurationService;
  private readonly mtgCollectionClient: IMtgCollectionClient;
  private readonly scryfallClient: IScryfallClient;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService,
    @inject(API.MtgCollectionClient) mtgCollectionClient: IMtgCollectionClient,
    @inject(API.ScryfallClient) scryfallClient: IScryfallClient
  ) {
    super(logService, resultFactory);
    this.configurationService = configurationService;
    this.mtgCollectionClient = mtgCollectionClient;
    this.scryfallClient = scryfallClient;
  }
  // #endregion

  // #region ICardSymbolService Members ---------------------------------------
  public async getCardSymbolSvg(): Promise<IResult<Map<string, string>>> {
    const result = new Map<string, string>();
    const cardSymbols = await this.mtgCollectionClient.getData<Array<CardSymbolDto>>("/card-symbol");
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

  public async cacheImages(callBack: ProgressCallback): Promise<void> {
    const cardSymbols = await this.mtgCollectionClient.getData<Array<CardSymbolDto>>("/card-symbol");
    await Promise.all(cardSymbols.data.map(async (cardSymbol: CardSymbolDto) => {
      const pathToFile = this.calculatedSymbolFileName(cardSymbol);
      await this.scryfallClient.fetchArrayBuffer(cardSymbol.svgUri)
        .then((arrayBuffer: ArrayBuffer) => {
          callBack("Caching image for '" + cardSymbol.code + "'");
          const buffer = Buffer.from(arrayBuffer);
          createWriteStream(pathToFile).write(buffer);
        });
    }));
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private calculatedSymbolFileName(cardSymbol: CardSymbolDto): string {
    const fileName = new URL(cardSymbol.svgUri).pathname.split("/").pop()!;
    const dirName = path.join(this.configurationService.configuration.dataConfiguration.cacheDirectory, "cardsymbols");
    if (!existsSync(dirName)) {
      mkdirSync(dirName, { recursive: true });
    }
    return path.join(dirName, fileName);
  }
  // #endregion
}
