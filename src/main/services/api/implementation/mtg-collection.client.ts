import { inject, injectable } from "tsyringe";
import { ApiConfigurationDto } from "../../../../common/dto";
import { ResultDto } from "../../../../common/dto/mtg-collection";
import { BaseService } from "../../base";
import { IConfigurationService, ILogService, IResultFactory } from "../../infra/interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IMtgCollectionClient } from "../interface";

@injectable()
export class MtgCollectionClient extends BaseService implements IMtgCollectionClient {
  // #region Private fields ---------------------------------------------------
  private readonly apiConfiguration: ApiConfigurationDto;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService
  ) {
    super(logService, resultFactory);
    this.apiConfiguration = configurationService.configuration.systemConfiguration.apiConfiguration;
  }
  // #endregion

  // #region IMtgCollectionData Members ---------------------------------------
  public async getData<T>(path: string): Promise<ResultDto<T>> {
    const response = await fetch(this.apiConfiguration.libraryApiRoot + path);
    const result = (await response.json()) as ResultDto<T>;
    return result;
  }
  // #endregion
}
