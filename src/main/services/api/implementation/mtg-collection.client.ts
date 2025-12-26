import { isError } from "lodash";
import { inject, injectable } from "tsyringe";
import { ResultDto, ValidationErrorDto } from "../../../../common/dto/mtg-collection";
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
    return this.sendRequest(this.configurationService.configuration.discovery);
  }

  public async getData<T>(path: string): Promise<ResultDto<T>> {
    let result: Promise<ResultDto<T>>;
    if (this.configurationService.apiConfiguration != null) {
      result = this.sendRequest(this.configurationService.apiConfiguration.libraryApiRoot + path);
    } else {
      result = Promise.reject();
    }
    return result;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private sendRequest<T>(path: string): Promise<ResultDto<T>> {
    let result: Promise<ResultDto<T>>;
    try {
      return fetch(path)
        .then(
          async (response: Response) => {
            const resultDto: ResultDto<T> = (await response.json()) as ResultDto<T>;
            if (response.status >= 400) {
              return this.processErrorResponse<T>(path, resultDto);
            } else {
              return resultDto;
            }
          },
          (reason: Error) => this.processRejection<ResultDto<T>>(path, reason)
        );
    } catch (reason: unknown) {
      if (isError(reason)) {
        result = this.processRejection(path, reason);
      } else {
        result = this.processRejection<ResultDto<T>>(path, new Error("Unknown error"));
      }
    }
    return result;
  }

  private processRejection<T>(path: string, reason: Error): Promise<T> {
    let message: string;
    // Detect unreachable server (ERR_CONNECTION_REFUSED → "Failed to fetch")
    if (reason.message?.includes("Failed to fetch")) {
      message = "Cannot connect to the server.";
    } else {
      message = reason.message ?? "An unexpected error occurred.";
    }
    this.logService.error("Main", message);
    return Promise.reject<T>(reason);
  }

  private processErrorResponse<T>(path: string, response: ResultDto<T>): Promise<ResultDto<T>> {
    let message: Array<string>;
    if (response.errors) {
      message = response.errors;
    } else {
      message = response.validationErrors.map((v: ValidationErrorDto) => v.errorMessage);
    }
    this.logService.error("API", "Error", ...message);
    return Promise.reject(new Error(`Server error: ${response.status}`));
  }
  // #endregion
}
