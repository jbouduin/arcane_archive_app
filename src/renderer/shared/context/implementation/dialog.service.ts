import { ToastProps } from "@blueprintjs/core";
import { Dispatch } from "react";
import { BaseDialogProps } from "../../components/base/base-dialog";
import { IDialogService } from "../interface";
import { BaseViewmodel } from "../../viewmodel/base.viewmodel";

export class DialogService implements IDialogService {
  // #region Private fields ---------------------------------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setDialogs!: Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>;
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
    setDialogs: React.Dispatch<React.SetStateAction<Map<number, BaseDialogProps<any, any>>>>
  ): void {
    this.setDialogs = setDialogs;
  }

  public initialize(showToast: (props: ToastProps, key?: string) => void): void {
    this._showToast = showToast;
  }

  public openDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(props: BaseDialogProps<Dto, Vm>): void {
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
    this.setDialogs((prev: Map<number, BaseDialogProps<Dto, Vm>>) => {
      const newMap = new Map<number, BaseDialogProps<Dto, Vm>>(prev.entries());
      newMap.set(this.dialogSequence, modifiedProps);
      return newMap;
    });
  }

  public closeDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(dialogNumber: number): void {
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

  public showToast(props: ToastProps, key?: string): void {
    this._showToast(props, key);
  }
  // #endregion
}
