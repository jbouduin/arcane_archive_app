import { ToastProps } from "@blueprintjs/core";
import { Dispatch } from "react";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { IDialogService } from "../interface";

export class DialogService implements IDialogService {
  // #region Private fields ---------------------------------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setDialogs!: Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any>>>>;
  private _showToast!: (props: ToastProps, key?: string) => void;
  private dialogSequence: number;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.dialogSequence = 0;
  }
  // #endregion

  // #region IDialogService Members -------------------------------------------
  public setDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any>>>>
  ): void {
    this.setDialogs = setDialogs;
  }

  public initialize(showToast: (props: ToastProps, key?: string) => void): void {
    this._showToast = showToast;
  }

  public openDialog<T extends object>(props: BaseDialogProps<T>): void {
    this.dialogSequence++;
    const modifiedProps = {
      ...props,
      onClose: (event: React.SyntheticEvent<HTMLElement>) => {
        if (props.onClose) {
          props.onClose(event);
        }
        this.closeDialog(this.dialogSequence);
      }
    };
    this.setDialogs((prev: Map<number, BaseDialogProps<T>>) => {
      const newMap = new Map<number, BaseDialogProps<T>>(prev.entries());
      newMap.set(this.dialogSequence, modifiedProps);
      return newMap;
    });
  }

  public closeDialog<T extends object>(dialogNumber: number): void {
    const newMap = new Map<number, BaseDialogProps<T>>();
    this.setDialogs((prev: Map<number, BaseDialogProps<T>>) => {
      prev.forEach((props: BaseDialogProps<T>, key: number) => {
        if (key != dialogNumber) {
          newMap.set(key, props);
        }
      });
      return newMap;
    });
  }

  public showToast(props: ToastProps, key?: string): void {
    this._showToast(props, key);
  }
  // #endregion
}
