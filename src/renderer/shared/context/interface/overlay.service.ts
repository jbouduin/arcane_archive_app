import { AlertProps, ToastProps } from "@blueprintjs/core";
import { ProgressCallbackValue } from "../../../../common/ipc";
import { BaseDialogProps, BaseDialogPropsNew } from "../../components/base/base-dialog";
import { ShowToastFn } from "../../types";
import { BaseViewmodel } from "../../viewmodel/base.viewmodel";
import { BaseViewmodelNew } from "../../viewmodel/base.viewmodel-new";

export interface IOverlayService {
  setAlertDispatcher(setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>): void;
  setDialogDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any, any>>>>
  ): void;
  setDialogDispatcherNew(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogPropsNew<any, any>>>>
  ): void;
  setSplashScreenDispatcher(setSplashScreen: React.Dispatch<React.SetStateAction<ProgressCallbackValue | null>>): void;
  /**
   * Stores the showtoast function.
   * @param showToast the showToast function
   */
  setShowToast(showToast: ShowToastFn): void;
  openDialog<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>>(
    props: BaseDialogProps<Dto, Fn, Vm>
  ): void;
  openDialogNew<Dto extends object, Vm extends BaseViewmodelNew<Dto>>(
    props: BaseDialogPropsNew<Dto, Vm>
  ): void;
  closeDialog(dialogNumber: number): void;
  showToast(toastProps: ToastProps, key?: string): void;
  showSplashScreen(value: ProgressCallbackValue): void;
  hideSplashSceen(): void;
  showAlert(alertProps: AlertProps): void;
}
