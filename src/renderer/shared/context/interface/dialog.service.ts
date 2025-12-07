import { ToastProps } from "@blueprintjs/core";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { DialogType } from "../../types";

export interface IDialogService {
  setDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<DialogType, BaseDialogProps<any>>>>
  ): void;
  initialize(showToast: (props: ToastProps, key?: string) => void): void;
  openDialog<T extends object>(id: DialogType, props: BaseDialogProps<T>): void;
  closeDialog(id: DialogType): void;
  showToast(props: ToastProps, key?: string): void;
}
