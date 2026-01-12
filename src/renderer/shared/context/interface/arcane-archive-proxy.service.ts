import { SettingsDto } from "../../../../common/dto";
import { ApiInfoDto } from "../../dto";
import { MtgServer, ShowToastFn } from "../../types";
import { ApiStatusChangeListener, ArcaneArchiveRequestOptions, InvalidSessionListener } from "../types";
import { IConfigurationService } from "./configuration.service";
import { ISessionService } from "./session.service";

export interface IArcaneArchiveProxyService {
  readonly apiStatus: Map<MtgServer, ApiInfoDto | null>;
  readonly apiRoots: Map<MtgServer, string>;

  delete(server: MtgServer, path: string): Promise<number>;

  /**
   * Fetch data from backend
   * @param path the path
   */
  getData<T extends object>(
    server: MtgServer,
    path: string,
    options?: ArcaneArchiveRequestOptions
  ): Promise<T>;

  /**
   * Initialize the Arcane Archive Proxy
   * @param configurationService The configuration service, used to subscribe to preferences changes
   * @param sessionService The session service, used to subscribe to session changes
   * @param configuration The system configuration.
   * @param showToast the function to show toasts
   */
  initialize(
    configurationService: IConfigurationService,
    sessionService: ISessionService,
    configuration: SettingsDto
  ): void;

  postData<Req extends object, Res extends object>(
    server: MtgServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res>;

  putData<Req extends object, Res extends object>(
    server: MtgServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res>;

  forceRefresh(): Promise<Map<MtgServer, ApiInfoDto | null>>;
  startRefreshing(): Promise<Map<MtgServer, ApiInfoDto | null>>;
  stopRefreshing(): boolean;
  subscribeApiStatusChangeListener(listener: ApiStatusChangeListener): () => void;
  subscribeInvalidSessionListener(listener: InvalidSessionListener): () => void;
  setShowToast(showToast: ShowToastFn): void;
}
