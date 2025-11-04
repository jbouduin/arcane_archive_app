import { H3, H5 } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { compareClassNameProp } from "../../util";
import { CardHeaderViewProps } from "./card-header-view.props";

export const CardHeaderView = React.memo(
  (props: CardHeaderViewProps) => {
    // #region Rendering ------------------------------------------------------
    return (
      <>
        <div className="card-header-line-1">
          <i
            key={`icon-${props.keyruneCode}`}
            className={classNames("tree-view-image", "ss", "ss-" + props.keyruneCode.toLowerCase(), props.rarity != "COMMON" ? "ss-" + props.rarity.toLowerCase() : "", "ss-2x")}
          >
          </i>
          <H3>{props.cardName}</H3>
        </div>
        <div className="card-header-line-2" style={{ width: "100%" }}>
          <H5>{props.type}</H5>
        </div>
      </>

    );
    // #endregion
  },
  (prev: CardHeaderViewProps, next: CardHeaderViewProps) => {
    return prev.code == next.code &&
      compareClassNameProp(prev.className || "", next.className || "");
  }
);
