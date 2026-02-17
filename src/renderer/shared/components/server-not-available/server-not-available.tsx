import "./server-not-available.css";

import { Card, H1, H3, ToastProps } from "@blueprintjs/core";
import classNames from "classnames";
import { ServerNotAvailableProps } from "./server-not-available.props";
import { usePreferences } from "../../../hooks";

export function ServerNotAvailable(props: ServerNotAvailableProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { themeClassName } = usePreferences();
  // #region Rendering --------------------------------------------------------
  return (
    <Card className={classNames("aa-server-not-available", themeClassName)}>
      <H1 key="key-1">Server not available</H1>
      {
        props.nextTry == 0 &&
        <H3 key="key-2">Retrying...</H3>
      }
      {
        props.nextTry != 0 &&
        (
          <H3 key="key-3">
            retrying in&nbsp;
            {props.nextTry}
            &nbsp;seconds
          </H3>
        )
      }
      {
        props.initializationResult.errors.map((toastProps: ToastProps) => {
          return (
            <p key="key-4">
              {toastProps.message}
            </p>
          );
        })
      }
    </Card>
  );
  // #endregion
}
