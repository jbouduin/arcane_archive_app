import "./card-set-icon.css";

import classNames from "classnames";
import { CardSetIconProps } from "./card-set-icon.props";

export function CardSetIcon(props: CardSetIconProps): JSX.Element {
  //#region Initialization ----------------------------------------------------
  const baseClassName = [
    "ss",
    "ss-" + props.keyruneCode.toLowerCase(),
    "ss-" + props.rarity?.toLowerCase() || "common"
  ];
  const sizeClassName = props.size == "large"
    ? classNames(baseClassName, "ss-2x", "aa-card-set-icon-large")
    : classNames(baseClassName, "aa-card-set-icon-small");
  //#endregion

  //#region Rendering ---------------------------------------------------------
  /**
   * using <i> is what https://keyrune.andrewgioia.com shows as example
   */
  return (
    <i
      key={`icon-${props.keyruneCode}`}
      className={sizeClassName}
    >
    </i>
  );
  //#endregion
}
