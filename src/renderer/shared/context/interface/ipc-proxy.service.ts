import { PreferencesDto } from "../../../../common/dto";
import { ShowToastFn } from "../../types";
import { IConfigurationService } from "./configuration.service";

export interface IIpcProxyService {
  /**
   * Initialize the IpcProxyService
   * @param configurationService The configuration service, used to subscribe to preferences changes
   * @param preferences The preferences
   */
  initialize(configurationService: IConfigurationService, preferences: PreferencesDto): void;
  deleteData(path: string): Promise<number>;
  getData<Res extends object | string>(path: string): Promise<Res>;
  postData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  postEmptyBody<Res extends object>(path: string): Promise<Res>;
  putData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  patchData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  setShowToast(showToast: ShowToastFn): void;
}
