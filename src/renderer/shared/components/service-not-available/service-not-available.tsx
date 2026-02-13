import "./service-not-available.css";

import { Callout } from "@blueprintjs/core";
import { ServiceNotAvailableProps } from "./service-not-available.props";

export function ServiceNotAvailable(props: ServiceNotAvailableProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  return (
    <div className="aa-service-not-available-wrapper">
      <Callout intent="warning">
        {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line*/}
        {props.serviceName} is currently not available
      </Callout>
    </div>
  );
  //#endregion
}
