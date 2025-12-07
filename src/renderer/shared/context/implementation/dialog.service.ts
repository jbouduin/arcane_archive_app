import { ToastProps } from "@blueprintjs/core";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { DialogType } from "../../types";
import { IDialogService } from "../interface";
import { Dispatch } from "react";

export class DialogService implements IDialogService {
  // #region Private fields ---------------------------------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setDialogs!: Dispatch<React.SetStateAction<Map<DialogType, BaseDialogProps<any>>>>;
  private _showToast!: (props: ToastProps, key?: string) => void;
  // #endregion

  // #region IDialogService Members -------------------------------------------
  public setDispatcher(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDialogs: React.Dispatch<React.SetStateAction<Map<DialogType, BaseDialogProps<any>>>>
  ): void {
    this.setDialogs = setDialogs;
  }

  public initialize(showToast: (props: ToastProps, key?: string) => void): void {
    this._showToast = showToast;
  }

  public openDialog<T extends object>(id: DialogType, props: BaseDialogProps<T>): void {
    this.setDialogs((prev: Map<DialogType, BaseDialogProps<T>>) => {
      const newMap = new Map<DialogType, BaseDialogProps<T>>(prev.entries());
      newMap.set(id, props);
      return newMap;
    });
  }

  public closeDialog<T extends object>(id: DialogType): void {
    const newMap = new Map<DialogType, BaseDialogProps<T>>();
    this.setDialogs((prev: Map<DialogType, BaseDialogProps<T>>) => {
      prev.forEach((props: BaseDialogProps<T>, key: DialogType) => {
        if (key != id) {
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
