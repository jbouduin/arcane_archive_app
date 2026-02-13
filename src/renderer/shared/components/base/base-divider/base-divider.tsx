import "./base-divider.css";

import classNames from "classnames";
import { BaseDividerProps } from "./base-divider.props";

export function BaseDivider(props: BaseDividerProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  return (
    <p
      className={classNames("aa-divider", "bp6-divider", props.className)}
      style={props.style}
    />
  );
  //#endregion
}
