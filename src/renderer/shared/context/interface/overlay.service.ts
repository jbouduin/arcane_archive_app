import { AlertProps, ToastProps } from "@blueprintjs/core";
import { ProgressCallbackValue } from "../../../../common/ipc";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { BaseViewmodel } from "../../viewmodel/base.viewmodel";

export interface IOverlayService {
  setAlertDispatcher(setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>): void;
  setDialogDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>
  ): void;
  setSplashScreenDispatcher(setSplashScreen: React.Dispatch<React.SetStateAction<ProgressCallbackValue | null>>): void;
  initialize(showToast: (props: ToastProps, key?: string) => void): void;
  openDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(props: BaseDialogProps<Dto, Vm>): void;
  closeDialog(dialogNumber: number): void;
  showToast(toastProps: ToastProps, key?: string): void;
  showSplashScreen(value: ProgressCallbackValue): void;
  hideSplashSceen(): void;
  showAlert(alertProps: AlertProps): void;
}
