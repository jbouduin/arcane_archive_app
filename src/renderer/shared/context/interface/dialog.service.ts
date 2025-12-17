import { ToastProps } from "@blueprintjs/core";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { BaseViewmodel } from "../../viewmodel/base.viewmodel";

export interface IDialogService {
  setDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>
  ): void;
  initialize(showToast: (props: ToastProps, key?: string) => void): void;
  openDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(props: BaseDialogProps<Dto, Vm>): void;
  closeDialog(dialogNumber: number): void;
  showToast(props: ToastProps, key?: string): void;
}
