import React from "react";
import { IDialogService } from "../../../context";
import { DialogType } from "../../../types";
import { BaseDialog } from "./base-dialog";
import { BaseDialogProps } from "./base-dialog.props";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function DialogRenderer({ dialogService }: { dialogService: IDialogService; }) {
  // #region State ------------------------------------------------------------
  const [dialogs, setDialogs] = React.useState<Map<DialogType, BaseDialogProps<any>>>(new Map<DialogType, BaseDialogProps<any>>());
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(() => {
    dialogService.setDispatcher(setDialogs);
  }, [dialogService]);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        buildDialogs()
      }
    </>
  );

  function buildDialogs(): Array<React.JSX.Element> {
    const result = new Array<React.JSX.Element>();
    {
      dialogs.forEach((props: BaseDialogProps<any>, key: DialogType) => {
        const dlg = (
          <BaseDialog key={key} {...props} />
        );
        result.push(dlg);
      });
      return result;
    }
  }
  // #endregion
}
