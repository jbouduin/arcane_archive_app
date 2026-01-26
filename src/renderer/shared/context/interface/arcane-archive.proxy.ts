import { ApiConfigurationDto } from "../../../../common/dto";
import { ArcanArchiveServer } from "../../../../common/types";
import { ApiInfoDto } from "../../dto";
import { ShowToastFn } from "../../types";
import { ApiStatusChangeListener, ArcaneArchiveRequestOptions, InvalidSessionListener } from "../types";
import { IConfigurationService } from "./configuration.service";
import { ISessionService } from "./session.service";

export interface IArcaneArchiveProxy {
  //#region Service methods ---------------------------------------------------
  /**
   * Initialize the Arcane Archive Proxy
   */
  initialize(apiConfiguration: ApiConfigurationDto | null): void;
  initializeSubscriptions(sessionService: ISessionService, configurationService: IConfigurationService): void;
  setShowToast(showToast: ShowToastFn): void;
  //#endregion

  //#region Data methods ------------------------------------------------------
  delete(server: ArcanArchiveServer, path: string): Promise<number>;

  /**
   * Fetch data from backend
   * @param path the path
   */
  getData<T extends object>(
    server: ArcanArchiveServer,
    path: string,
    options?: ArcaneArchiveRequestOptions
  ): Promise<T>;

  postData<Req extends object, Res extends object>(
    server: ArcanArchiveServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res>;

  putData<Req extends object, Res extends object>(
    server: ArcanArchiveServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res>;
  //#endregion

  //#region Api Status / Session related methods ------------------------------
  /**
   * Refreshes the api status. If the service was not automatically refreshing, it will not start doing so.
   */
  forceRefresh(): Promise<Map<ArcanArchiveServer, ApiInfoDto | null>>;
  startRefreshing(): Promise<Map<ArcanArchiveServer, ApiInfoDto | null>>;
  stopRefreshing(): boolean;
  subscribeApiStatusChangeListener(listener: ApiStatusChangeListener): () => void;
  subscribeInvalidSessionListener(listener: InvalidSessionListener): () => void;
  //#endregion
}
