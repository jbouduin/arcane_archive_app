import { ToastProps } from "@blueprintjs/core";

export interface IIpcProxyService {
  logServerResponses: boolean;

  deleteData(path: string): Promise<number>;
  getData<Res extends object | string>(path: string): Promise<Res>;
  postData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  postEmptyBody<Res extends object>(path: string): Promise<Res>;
  putData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  patchData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
  initialize(showToast: (props: ToastProps, key?: string) => void): void;
}
