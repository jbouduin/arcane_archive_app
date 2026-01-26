import { Card, H1, H3, ToastProps } from "@blueprintjs/core";
import classNames from "classnames";
import { ServerNotAvailableProps } from "./server-not-available.props";
import { usePreferences } from "../../../hooks";

export function ServerNotAvailable(props: ServerNotAvailableProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { themeClassName } = usePreferences();
  // #region Rendering --------------------------------------------------------
  return (
    <Card className={classNames("server-not-available", themeClassName)}>
      <H1>Server not available</H1>
      {
        props.nextTry == 0 &&
        <H3>Retrying...</H3>
      }
      {
        props.nextTry != 0 &&
        (
          <H3>
            retrying in&nbsp;
            {props.nextTry}
            &nbsp;seconds
          </H3>
        )
      }
      {
        props.initializationResult.errors.map((toastProps: ToastProps) => {
          return (
            <p>
              {toastProps.message}
            </p>
          );
        })
      }
    </Card>
  );
  // #endregion
}
