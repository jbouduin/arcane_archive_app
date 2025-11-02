import { ToastProps } from "@blueprintjs/core";

export interface IIpcProxyService {
  logServerResponses: boolean;

  deleteData(path: string): Promise<number>;
  getData<T extends object | string>(path: string): Promise<T>;
  postData<T extends object, U extends object>(path: string, data: T): Promise<U>;
  putData<T extends object, U extends object>(path: string, data: T): Promise<U>;
  patchData<T extends object, U extends object>(path: string, data: T): Promise<U>;
  showMainWindow(): void;
  initialize(showToast: (props: ToastProps, key?: string) => void): void;
}
