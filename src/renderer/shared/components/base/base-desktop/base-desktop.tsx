import { Alert, Card } from "@blueprintjs/core";
import classNames from "classnames";
import { noop } from "lodash";
import React from "react";
import { usePreferences } from "../../../../hooks";
import { SplashScreen } from "../../splash";
import { BaseDesktopProps } from "./base-desktop.props";
import { BaseDesktopState } from "./base-desktop.state";

export function BaseDesktop(props: BaseDesktopProps) {
  // #region State ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  // TODO use dialog provider to show alerts and splash screen
  const initialState: BaseDesktopState = {
    alertProps: null,
    splashScreenOpen: false
  };
  const [desktopState, _setDesktopState] = React.useState<BaseDesktopState>(initialState);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <Card className={classNames(themeClassName, "desktop-wrapper")}>
        {props.desktopContent({ className: themeClassName })}
      </Card>
      {
        desktopState.splashScreenOpen &&
        (
          <SplashScreen
            {...props}
            className={themeClassName}
            isOpen={desktopState.splashScreenOpen}
            onDialogClose={noop}
          />
        )
      }
      {
        desktopState.alertProps &&
        <Alert {...desktopState.alertProps} isOpen={true} />
      }
    </div>
  );
  // #endregion
}
