import { AlertProps, ToastProps } from "@blueprintjs/core";
import { ProgressCallbackValue } from "../../../../common/ipc";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { ShowToastFn } from "../../types";
import { BaseViewmodel } from "../../viewmodel";
import { IIpcProxy } from "./ipc-proxy";

export interface IOverlayService {
  //#region Service methods ---------------------------------------------------
  setAlertDispatcher(setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>): void;
  setDialogDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>
  ): void;
  /**
   * Stores the showtoast function.
   * @param showToast the showToast function
   */
  setShowToast(showToast: ShowToastFn): void;
  setSplashScreenDispatcher(setSplashScreen: React.Dispatch<React.SetStateAction<ProgressCallbackValue | null>>): void;
  //#endregion

  //#region Blueprint overlays ------------------------------------------------
  hideSplashSceen(): void;
  openDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(
    props: BaseDialogProps<Dto, Vm>
  ): void;
  showAlert(alertProps: AlertProps): void;
  showSplashScreen(value: ProgressCallbackValue): void;
  showToast(toastProps: ToastProps, key?: string): void;
  //#endregion

  //#region OS Native Dialogs -------------------------------------------------
  saveAs(ipcProxy: IIpcProxy, purpose?: string): Promise<string | undefined>;
  selectDirectory(ipcProxy: IIpcProxy, currentValue: string): Promise<string | undefined>;
  selectFile(ipcProxy: IIpcProxy, purpose?: string): Promise<string | undefined>;
  //#endregion
}
