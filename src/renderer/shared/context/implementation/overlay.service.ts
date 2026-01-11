import { AlertProps, ToastProps } from "@blueprintjs/core";
import { Dispatch } from "react";
import { ProgressCallbackValue } from "../../../../common/ipc";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { ShowToastFn } from "../../types";
import { BaseViewmodel } from "../../viewmodel/base.viewmodel";
import { IOverlayService } from "../interface";

export class OverlayService implements IOverlayService {
  // #region Private fields ---------------------------------------------------
  private setAlert!: Dispatch<React.SetStateAction<AlertProps | null>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setDialogs!: Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any, any>>>>;
  private setSplashScreen!: Dispatch<React.SetStateAction<ProgressCallbackValue | null>>;
  private _showToast!: (props: ToastProps, key?: string) => void;
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
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any, any>>>>
  ): void {
    this.setDialogs = setDialogs;
  }

  public setAlertDispatcher(setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>): void {
    this.setAlert = setAlert;
  }

  public setSplashScreenDispatcher(setSplashScreen: React.Dispatch<React.SetStateAction<ProgressCallbackValue | null>>): void {
    this.setSplashScreen = setSplashScreen;
  }

  public setShowToast(showToast: ShowToastFn): void {
    this._showToast = showToast;
  }

  public openDialog<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>>(
    props: BaseDialogProps<Dto, Fn, Vm>
  ): void {
    this.dialogSequence++;
    const seq = this.dialogSequence;
    const modifiedProps = {
      ...props,
      onClose: (event: React.SyntheticEvent<HTMLElement>) => {
        if (props.onClose) {
          props.onClose(event);
        }
        this.closeDialog(seq);
      }
    };
    this.setDialogs((prev: Map<number, BaseDialogProps<Dto, Fn, Vm>>) => {
      const newMap = new Map<number, BaseDialogProps<Dto, Fn, Vm>>(prev.entries());
      newMap.set(this.dialogSequence, modifiedProps);
      return newMap;
    });
  }

  public closeDialog<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>>(
    dialogNumber: number
  ): void {
    const newMap = new Map<number, BaseDialogProps<Dto, Fn, Vm>>();
    this.setDialogs((prev: Map<number, BaseDialogProps<Dto, Fn, Vm>>) => {
      prev.forEach((props: BaseDialogProps<Dto, Fn, Vm>, key: number) => {
        if (key != dialogNumber) {
          newMap.set(key, props);
        }
      });
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
}
