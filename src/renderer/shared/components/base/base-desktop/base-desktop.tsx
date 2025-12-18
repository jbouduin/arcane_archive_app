import { Card } from "@blueprintjs/core";
import classNames from "classnames";
import { usePreferences } from "../../../../hooks";
import { BaseDesktopProps } from "./base-desktop.props";

export function BaseDesktop(props: BaseDesktopProps) {
  // #region State ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <Card className={classNames(themeClassName, "desktop-wrapper")}>
        {props.desktopContent({ className: themeClassName })}
      </Card>
    </div>
  );
  // #endregion
}
