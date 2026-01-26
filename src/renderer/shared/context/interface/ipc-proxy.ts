import { ShowToastFn } from "../../types";
import { IConfigurationService } from "./configuration.service";

export interface IIpcProxy {
  //#region Service methods ---------------------------------------------------
  initializeSubscriptions(configurationService: IConfigurationService): void;
  setShowToast(showToast: ShowToastFn): void;
  //#endregion

  //#region Data methods ------------------------------------------------------
  deleteData(path: string): Promise<number>;
  getData<Res extends object | string>(path: string): Promise<Res>;
  postData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  postEmptyBody<Res extends object>(path: string): Promise<Res>;
  putData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  patchData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  //#endregion
}
