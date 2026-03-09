import { ApiConfigurationDto } from "../../../../common/dto";
import { ProgressCallbackValue } from "../../../../common/ipc";
import { ArcaneArchiveServer } from "../../../../common/types";
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
  setSplashScreenFunctions(show: (value: ProgressCallbackValue) => void, hide: () => void): void;
  //#endregion

  //#region Data methods ------------------------------------------------------
  delete(server: ArcaneArchiveServer, path: string): Promise<number>;

  downloadFile(server: ArcaneArchiveServer, path: string): Promise<void>;
  /**
   * Fetch data from backend
   * @param path the path
   */
  getData<T extends object>(
    server: ArcaneArchiveServer,
    path: string,
    options?: ArcaneArchiveRequestOptions
  ): Promise<T>;

  postData<Req extends object, Res extends object>(
    server: ArcaneArchiveServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res>;

  putData<Req extends object, Res extends object>(
    server: ArcaneArchiveServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res>;
  //#endregion

  //#region Api Status / Session related methods ------------------------------
  /**
   * Refreshes the api status. If the service was not automatically refreshing, it will not start doing so.
   */
  forceRefresh(): Promise<Map<ArcaneArchiveServer, ApiInfoDto | null>>;
  startRefreshing(): Promise<Map<ArcaneArchiveServer, ApiInfoDto | null>>;
  stopRefreshing(): boolean;
  subscribeApiStatusChangeListener(listener: ApiStatusChangeListener): () => void;
  subscribeInvalidSessionListener(listener: InvalidSessionListener): () => void;
  //#endregion
}
