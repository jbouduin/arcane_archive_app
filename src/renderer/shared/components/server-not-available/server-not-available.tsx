import { Card, H1, H3, ToastProps } from "@blueprintjs/core";
import classNames from "classnames";
import { ServerNotAvailableProps } from "./server-not-available.props";

export function ServerNotAvailable(props: ServerNotAvailableProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <Card className={classNames("server-not-available", props.className)}>
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
