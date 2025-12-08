import React from "react";
import { IDialogService } from "../../../context";
import { BaseDialog } from "./base-dialog";
import { BaseDialogProps } from "./base-dialog.props";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function DialogRenderer({ dialogService }: { dialogService: IDialogService; }) {
  // #region State ------------------------------------------------------------
  const [dialogs, setDialogs] = React.useState<Map<number, BaseDialogProps<any>>>(new Map<number, BaseDialogProps<any>>());
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
      dialogs.forEach((props: BaseDialogProps<any>, key: number) => {
        const dlg = (
          <BaseDialog key={"dialog-" + key.toString()} {...props} />
        );
        result.push(dlg);
      });
      return result;
    }
  }
  // #endregion
}
