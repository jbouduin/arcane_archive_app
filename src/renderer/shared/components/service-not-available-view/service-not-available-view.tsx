import { Callout } from "@blueprintjs/core";
import { ServiceNotAvailableViewProps } from "./service-not-available-view.props";

export function ServiceNotAvailableView(props: ServiceNotAvailableViewProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  return (
    <div className="not-logged-in-wrapper">
      <Callout intent="warning">
        {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line*/}
        {props.serviceName} is currently not available
      </Callout>
    </div>
  );
  //#endregion
}
