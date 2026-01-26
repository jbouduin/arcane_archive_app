import { AlertProps, ToastProps } from "@blueprintjs/core";
import { Dispatch } from "react";
import { ProgressCallbackValue } from "../../../../common/ipc";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { ShowToastFn } from "../../types";
import { BaseViewmodel } from "../../viewmodel";
import { IOverlayService } from "../interface";

export class OverlayService implements IOverlayService {
  // #region Private fields ---------------------------------------------------
  private setAlert!: Dispatch<React.SetStateAction<AlertProps | null>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setDialogs!: Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>;
  // TODO check if line above it works with unknown
  private setSplashScreen!: Dispatch<React.SetStateAction<ProgressCallbackValue | null>>;
  private _showToast!: ShowToastFn;
  private dialogSequence: number;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.dialogSequence = 0;
  }
  // #endregion

  // #region IOverlayService Members ------------------------------------------
  public setDialogDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogsNew: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>
  ): void {
    this.setDialogs = setDialogsNew;
  }

  public setAlertDispatcher(setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>): void {
    this.setAlert = setAlert;
  }

  public setSplashScreenDispatcher(
    setSplashScreen: React.Dispatch<React.SetStateAction<ProgressCallbackValue | null>>
  ): void {
    this.setSplashScreen = setSplashScreen;
  }

  public setShowToast(showToast: ShowToastFn): void {
    this._showToast = showToast;
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

  public showToast(toastProps: ToastProps, key?: string): void {
    this._showToast(toastProps, key);
  }

  public showSplashScreen(value: ProgressCallbackValue): void {
    this.setSplashScreen(value);
  }

  public hideSplashSceen(): void {
    this.setSplashScreen(null);
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
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
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
  // #endregion
}
