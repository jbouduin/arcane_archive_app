import { createWriteStream, existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { inject, injectable } from "tsyringe";
import { ProgressCallback } from "../../../../common/ipc";
import { CardSymbolDto } from "../../../dto/card-symbol.dto";
import { IMtgCollectionClient, IScryfallClient } from "../../api/interface";
import { BaseService, IResult } from "../../base";
import { IConfigurationService, ILogService, IResultFactory } from "../../infra/interface";
import { API, INFRASTRUCTURE } from "../../service.tokens";
import { ICardSymbolService } from "../interface/card-symbol.service";

@injectable()
export class CardSymbolService extends BaseService implements ICardSymbolService {
  // #region Private fields ---------------------------------------------------
  private readonly cacheDirectory: string;
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
    this.cacheDirectory = path.join(configurationService.configuration.systemConfiguration.dataConfiguration.cacheDirectory, "card-symbols");
    this.mtgCollectionClient = mtgCollectionClient;
    this.scryfallClient = scryfallClient;
  }
  // #endregion

  // #region ICardSymbolService Members ---------------------------------------
  public async getCardSymbolSvg(): Promise<IResult<Map<string, string>>> {
    const result = new Map<string, string>();
    const cardSymbols = await this.mtgCollectionClient.getData<Array<CardSymbolDto>>("/public/card-symbol");
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
    this.checkCacheDirectory();
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
    return path.join(this.cacheDirectory, fileName);
  }

  private checkCacheDirectory(): void {
    if (!existsSync(this.cacheDirectory)) {
      mkdirSync(this.cacheDirectory, { recursive: true });
    }
  }
  // #endregion
}
