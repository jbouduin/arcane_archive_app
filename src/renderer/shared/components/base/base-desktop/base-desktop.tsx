import { Alert, Card, Classes } from "@blueprintjs/core";
import classNames from "classnames";
import { cloneDeep, noop } from "lodash";
import React from "react";
import { ConfigurationDto } from "../../../../../common/dto";
import { LanguageDto } from "../../../dto";
import { SplashScreen } from "../../splash";
import { BaseDesktopProps } from "./base-desktop.props";
import { BaseDesktopState } from "./base-desktop.state";
import { useServices } from "../../../../hooks";

export function BaseDesktop(props: BaseDesktopProps) {
  // #region State ------------------------------------------------------------
  const useDarkTheme = useServices().configurationService.rendererConfiguration.useDarkTheme;
  const initialState: BaseDesktopState = {
    alertProps: null,
    initialized: true,
    languages: new Array<LanguageDto>(),
    rendererConfiguration: null,
    splashScreenOpen: false,
    themeClassName: useDarkTheme ? Classes.DARK : ""
  };
  const [desktopState, setDesktopState] = React.useState<BaseDesktopState>(initialState);
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onConfigurationChanged(saved: ConfigurationDto): void {
    const newState = cloneDeep(desktopState);
    newState.rendererConfiguration = saved.rendererConfiguration;
    newState.themeClassName = saved.rendererConfiguration.useDarkTheme ? Classes.DARK : "";
    setDesktopState(newState);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        desktopState.initialized &&
        (
          <div>
            <Card className={classNames(desktopState.themeClassName, "desktop-wrapper")}>
              {
                props.desktopContent({
                  className: desktopState.themeClassName,
                  onConfigurationChanged: (newConfiguration: ConfigurationDto) => onConfigurationChanged(newConfiguration)
                })
              }
            </Card>
            {
              desktopState.splashScreenOpen &&
              (
                <SplashScreen
                  {...props}
                  className={desktopState.themeClassName}
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
        )
      }
    </>
  );
  // #endregion
}
