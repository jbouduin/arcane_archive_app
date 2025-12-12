import { inject, singleton } from "tsyringe";
import { ApiConfigurationDto } from "../../../../common/dto";
import { BaseService } from "../../base";
import { IConfigurationService, ILogService, IResultFactory } from "../../infra/interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IScryfallClient } from "../interface";

@singleton()
export class ScryfallClient extends BaseService implements IScryfallClient {
  // #region Private fields ---------------------------------------------------
  private readonly apiConfiguration: ApiConfigurationDto;
  private readonly requestQueue: Array<() => Promise<void>>;
  private isProcessingQueue: boolean;
  private nextQuery: number;

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService
  ) {
    super(logService, resultFactory);
    this.apiConfiguration = configurationService.configuration.systemConfiguration.apiConfiguration;
    this.requestQueue = new Array<() => Promise<void>>();
    this.isProcessingQueue = false;
    this.nextQuery = Date.now() + this.apiConfiguration.scryfallMinimumRequestTimeout;
  }
  // #endregion

  // #region IScryfallClient Members ------------------------------------------
  public async fetchArrayBuffer(uri: string | URL): Promise<ArrayBuffer> {
    return await this.tryFetch(uri)
      .then((response: Response) => response.arrayBuffer());
  }
  // #endregion

  // #region Auxiliary Methods: queue -----------------------------------------
  private async tryFetch(uri: string | URL): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(() => this.processRequest(uri, resolve, reject));
      if (!this.isProcessingQueue) {
        void this.processQueue();
      }
    });
  }

  private async processRequest(uri: string | URL, resolve: (value: Response | PromiseLike<Response>) => void, reject: (reason?: unknown) => void) {
    const now = Date.now();
    const sleepTime = Math.max(this.nextQuery - now, 0);
    this.nextQuery = now + this.apiConfiguration.scryfallMinimumRequestTimeout;

    await this.sleep(sleepTime);
    this.logService.debug("Main", `fetch ${uri}`);
    try {
      const result = await fetch(uri);
      this.logService.debug("Main", `retrieved ${uri} -> status: ${result.status}`);
      // LATER if not 200 reject
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }

  private async processQueue() {
    this.isProcessingQueue = true;
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request) {
        await request();
      }
    }
    this.isProcessingQueue = false;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private async sleep(ms: number): Promise<void> {
    return await new Promise((resolve) => {
      this.logService.debug("Main", `sleeping ${ms}`);
      setTimeout(resolve, ms);
    });
  }
  // #endregion
}
