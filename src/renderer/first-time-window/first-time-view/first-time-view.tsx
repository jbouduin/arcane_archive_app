import { Card } from "@blueprintjs/core";
import classNames from "classnames";
import { noop } from "lodash";
import { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { LoginResponseDto } from "../../../common/dto";
import { usePreferences, useServices } from "../../hooks";
import { LoginViewmodel, RegisterViewmodel } from "../../shared/viewmodel";
import { PreferencesViewmodel, SystemSettingsViewmodel } from "../../shared/viewmodel/settings";
import { FirstTimeViewProps } from "./first-time-view.props";
import { IntroPanel } from "./panels/intro-panel";
import { LoginPanel } from "./panels/login-panel";
import { PanelType } from "./panels/panel-type";
import { PreferencesPanel } from "./panels/preferences-panel";
import { RegisterPanel } from "./panels/register-panel";
import { SystemPanel } from "./panels/system-panel";

export function FirstTimeView(_props: FirstTimeViewProps) {
  // #region Hooks ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  const nodeRef = useRef(null);
  const serviceContainer = useServices();
  // #endregion

  // #region State ------------------------------------------------------------
  const [currentPanel, setCurrentPanel] = useState<PanelType>("intro");
  const [loginViewmodel, setLoginViewmodel] = useState<LoginViewmodel>(
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getLoginViewmodel(false)
  );
  const [registrationViewmodel, setRegistrationViewmodel] = useState<RegisterViewmodel>(
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getRegisterViewmodel(false)
  );
  const [systemSettingsViewmodel, setSystemSettingsViewmodel] = useState<SystemSettingsViewmodel>(
    serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getSystemSettingsViewmodel(_props.systemSettings)
  );
  const [preferencesViewmodel, setPreferencesViewmodel] = useState<PreferencesViewmodel>(
    serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(serviceContainer.configurationService.preferences)
  );
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function onGo(): void {
    Promise.all([
      serviceContainer.configurationService.savePreferences(serviceContainer, preferencesViewmodel.dto),
      serviceContainer.configurationService.saveSystemSettings(systemSettingsViewmodel.dto)
    ]).then(
      () => window.close(),
      noop
    );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Card className={classNames(themeClassName, "first-time-view-wrapper")}>
      <SwitchTransition>
        <CSSTransition
          key={currentPanel}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <div className={classNames(themeClassName, "first-time-view-panel-wrap")} ref={nodeRef}>
            {renderPanel()}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Card>

  );

  function renderPanel(): React.JSX.Element {
    switch (currentPanel) {
      case "intro":
        return (
          <IntroPanel
            navigateTo={setCurrentPanel}
          />
        );
      case "login":
        return (
          <LoginPanel
            navigateTo={setCurrentPanel}
            afterLogin={(dto: LoginResponseDto) => setPreferencesViewmodel(serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(dto.profile.preferences))}
            viewmodel={loginViewmodel}
            viewmodelChanged={setLoginViewmodel}
          />
        );
      case "register":
        return (
          <RegisterPanel
            navigateTo={setCurrentPanel}
            viewmodel={registrationViewmodel}
            viewmodelChanged={setRegistrationViewmodel}
          />
        );
      case "system":
        return (
          <SystemPanel
            navigateTo={setCurrentPanel}
            viewmodel={systemSettingsViewmodel}
            viewmodelChanged={setSystemSettingsViewmodel}
          />
        );
      case "preferences":
        return (
          <PreferencesPanel
            navigateTo={setCurrentPanel}
            onGo={onGo}
            viewmodel={preferencesViewmodel}
            viewmodelChanged={setPreferencesViewmodel}
          />
        );
    }
  }
}
