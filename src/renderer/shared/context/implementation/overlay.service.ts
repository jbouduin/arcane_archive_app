import { AlertProps, ToastProps } from "@blueprintjs/core";
import { Dispatch } from "react";
import { IpcPaths, ProgressCallbackValue } from "../../../../common/ipc";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { ShowToastFn } from "../../types";
import { BaseViewmodel } from "../../viewmodel";
import { IIpcProxy, IOverlayService } from "../interface";

export class OverlayService implements IOverlayService {
  //#region Private fields ----------------------------------------------------
  private setAlert!: Dispatch<React.SetStateAction<AlertProps | null>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setDialogs!: Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>;
  // LATER check if line above it works with unknown
  private setSplashScreen!: Dispatch<React.SetStateAction<ProgressCallbackValue | null>>;
  private _showToast!: ShowToastFn;
  private dialogSequence: number;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    this.dialogSequence = 0;
  }
  //#endregion

  //#region IOverlayService Members: Service methods  -------------------------
  public setAlertDispatcher(setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>): void {
    this.setAlert = setAlert;
  }

  public setDialogDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogsNew: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>
  ): void {
    this.setDialogs = setDialogsNew;
  }

  public setShowToast(showToast: ShowToastFn): void {
    this._showToast = showToast;
  }

  public setSplashScreenDispatcher(
    setSplashScreen: React.Dispatch<React.SetStateAction<ProgressCallbackValue | null>>
  ): void {
    this.setSplashScreen = setSplashScreen;
  }
  //#endregion

  //#region IOverlayService Members: blueprint overlays  ----------------------
  public hideSplashSceen(): void {
    if (this.setSplashScreen) {
      this.setSplashScreen(null);
    }
  }

  public openDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(
    props: BaseDialogProps<Dto, Vm>
  ): void {
    this.dialogSequence++;
    const seq = this.dialogSequence;
    const modifiedProps = {
      ...props,
      onClose: (event: React.SyntheticEvent<HTMLElement>): void => {
        if (props.onClose) {
          props.onClose(event);
        }
        this.closeDialog(seq);
      }
    };
    this.setDialogs((prev: Map<number, BaseDialogProps<Dto, Vm>>) => {
      const newMap = new Map<number, BaseDialogProps<Dto, Vm>>(prev.entries());
      newMap.set(this.dialogSequence, modifiedProps);
      return newMap;
    });
  }

  public showAlert(alertProps: AlertProps): void {
    if (!alertProps.onClose) {
      const newAlertProps: AlertProps = {
        ...alertProps,
        onClose: () => this.setAlert(null)
      };
      this.setAlert(newAlertProps);
    } else {
      this.setAlert(alertProps);
    }
  }

  public showSplashScreen(value: ProgressCallbackValue): void {
    if (this.setSplashScreen) {
      this.setSplashScreen(value);
    }
  }

  public showToast(toastProps: ToastProps, key?: string): void {
    this._showToast(toastProps, key);
  }
  //#endregion

  //#region IOverlayService Members: OS Native Dialogs  -----------------------
  public saveAs(ipcProxy: IIpcProxy, purpose?: string): Promise<string | undefined> {
    return ipcProxy.getData<string>(IpcPaths.getSaveAsPath(purpose));
  }

  public selectDirectory(ipcProxy: IIpcProxy, currentValue: string): Promise<string | undefined> {
    return ipcProxy.getData<string>(`${IpcPaths.IO_SELECT_DIRECTORY}/${encodeURIComponent(currentValue)}`);
  }

  public selectFile(ipcProxy: IIpcProxy, purpose?: string): Promise<string | undefined> {
    return ipcProxy.getData<string>(IpcPaths.getSelectFilePath(purpose));
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  private closeDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(
    dialogNumber: number
  ): void {
    const newMap = new Map<number, BaseDialogProps<Dto, Vm>>();
    this.setDialogs((prev: Map<number, BaseDialogProps<Dto, Vm>>) => {
      prev.forEach((props: BaseDialogProps<Dto, Vm>, key: number) => {
        if (key != dialogNumber) {
          newMap.set(key, props);
        }
      });
      return newMap;
    });
  }
  //#endregion
}
