import { inject, injectable } from "tsyringe";
import { ResultDto } from "../../../../common/dto/mtg-collection";
import { DiscoveryDto } from "../../../dto";
import { BaseService } from "../../base";
import { IConfigurationService, ILogService, IResultFactory } from "../../infra/interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IMtgCollectionClient } from "../interface";

@injectable()
export class MtgCollectionClient extends BaseService implements IMtgCollectionClient {
  // #region Private fields ---------------------------------------------------
  private readonly configurationService: IConfigurationService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService
  ) {
    super(logService, resultFactory);
    this.configurationService = configurationService;
  }
  // #endregion

  // #region IMtgCollectionData Members ---------------------------------------
  public async discover(): Promise<ResultDto<DiscoveryDto>> {
    const response = await fetch(this.configurationService.configuration.discovery);
    const result = (await response.json()) as ResultDto<DiscoveryDto>;
    return result;
  }

  public async getData<T>(path: string): Promise<ResultDto<T>> {
    const response = await fetch(this.configurationService.apiConfiguration.libraryApiRoot + path);
    const result = (await response.json()) as ResultDto<T>;
    return result;
  }
  // #endregion
}
