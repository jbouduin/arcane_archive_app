import { ToastProps } from "@blueprintjs/core";
import { BaseDialogProps } from "../../components/base/base-dialog";

export interface IDialogService {
  setDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any>>>>
  ): void;
  initialize(showToast: (props: ToastProps, key?: string) => void): void;
  openDialog<T extends object>(props: BaseDialogProps<T>): void;
  closeDialog(dialogNumber: number): void;
  showToast(props: ToastProps, key?: string): void;
}
