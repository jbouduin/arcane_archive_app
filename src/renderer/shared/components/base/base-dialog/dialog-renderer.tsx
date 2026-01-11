import { Alert, AlertProps } from "@blueprintjs/core";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { ProgressCallbackValue } from "../../../../../common/ipc";
import { usePreferences } from "../../../../hooks";
import { SplashScreen } from "../../splash";
import { BaseDialog } from "./base-dialog";
import { BaseDialogProps } from "./base-dialog.props";
import { DialogRendererProps } from "./dialog-renderer.props";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function DialogRenderer(props: DialogRendererProps): JSX.Element {
  // #region State ------------------------------------------------------------
  const [dialogs, setDialogs] = useState<Map<number, BaseDialogProps<any, any, any>>>(new Map<number, BaseDialogProps<any, any, any>>());
  const [splashScreen, setSplashScreen] = useState<ProgressCallbackValue | null>(null);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(() => {
    props.overlayService.setAlertDispatcher(setAlert);
    props.overlayService.setDialogDispatcher(setDialogs);
    props.overlayService.setSplashScreenDispatcher(setSplashScreen);
  }, [props.overlayService]);
  // #endregion

  // #region Event handling ---------------------------------------------------
  window.ipc.onProgress((status: ProgressCallbackValue) => {
    setSplashScreen(status);
  });
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        buildDialogs()
      }
      {
        splashScreen &&
        (
          <SplashScreen callBackValue={splashScreen} />
        )
      }
      {
        alert &&
        (
          <Alert
            {...alert}
            className={classNames(alert.className, themeClassName)}
          />
        )
      }
    </>
  );

  function buildDialogs(): Array<React.JSX.Element> {
    const result = new Array<React.JSX.Element>();
    {
      dialogs.forEach((props: BaseDialogProps<any, any, any>, key: number) => {
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
