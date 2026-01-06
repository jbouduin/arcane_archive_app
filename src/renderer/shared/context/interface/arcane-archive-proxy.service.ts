import { SettingsDto } from "../../../../common/dto";
import { ApiInfoDto } from "../../dto";
import { MtgServer, ShowToastFn } from "../../types";
import { ApiStatusChangeListener } from "../providers";
import { IConfigurationService } from "./configuration.service";
import { ISessionService } from "./session.service";

export interface IArcaneArchiveProxyService {
  readonly apiStatus: Map<MtgServer, ApiInfoDto | null>;
  readonly apiRoots: Map<MtgServer, string>;

  /**
   * Log server responses in console
   */
  // readonly logServerResponses: boolean;
  /**
   * Fetch data from backend
   * @param path the path
   */
  getData<T extends object>(
    server: MtgServer,
    path: string,
    supressSuccessMessage?: boolean,
    supressErrorMessage?: boolean
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
    supressSuccessMessage: boolean
  ): Promise<Res>;

  putData<Req extends object, Res extends object>(
    server: MtgServer,
    path: string,
    data: Req | null,
    supressSuccessMessage: boolean
  ): Promise<Res>;

  forceRefresh(): Promise<Map<MtgServer, ApiInfoDto | null>>;
  startRefreshing(): Promise<Map<MtgServer, ApiInfoDto | null>>;
  stopRefreshing(): boolean;
  subscribe(listener: ApiStatusChangeListener): () => void;
  setShowToast(showToast: ShowToastFn): void;
}
