import { Card } from "@blueprintjs/core";
import classNames from "classnames";
import { noop } from "lodash";
import { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { LoginResponseDto } from "../../../common/dto";
import { usePreferences, useServices, useSession } from "../../hooks";
import { LoginViewmodel, PreferencesViewmodel, RegisterViewmodel, SystemSettingsViewmodel } from "../../shared/viewmodel";
import { FirstTimeViewProps } from "./first-time-view.props";
import { IntroPanel } from "./panels/intro-panel";
import { LoginPanel } from "./panels/login-panel";
import { PanelType } from "./panels/panel-type";
import { PreferencesPanel } from "./panels/preferences-panel";
import { RegisterPanel } from "./panels/register-panel";
import { SystemPanel } from "./panels/system-panel";

export function FirstTimeView(props: FirstTimeViewProps) {
  // #region Hooks ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  const { loggedIn } = useSession();
  const nodeRef = useRef(null);
  const serviceContainer = useServices();
  // #endregion

  // #region State ------------------------------------------------------------
  const [currentPanel, setCurrentPanel] = useState<PanelType>("intro");
  const [loginViewmodel, setLoginViewmodel] = useState<LoginViewmodel>(
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getInitialLoginViewmodel(false)
  );
  const [registrationViewmodel, setRegistrationViewmodel] = useState<RegisterViewmodel>(
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getInitialRegisterViewmodel(false, serviceContainer.configurationService.preferences)
  );
  // this one is initialized with the factory default system settings
  const [systemSettingsViewmodel, _setSystemSettingsViewmodel] = useState<SystemSettingsViewmodel>(
    serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getSystemSettingsViewmodelFromDto(props.systemSettings, true)
  );
  const [preferencesViewmodel, setPreferencesViewmodel] = useState<PreferencesViewmodel>(
    serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(serviceContainer.configurationService.preferences)
  );
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
        .getLoginViewmodel(false, serviceContainer)
        .then((model: LoginViewmodel) => setLoginViewmodel(model));
    },
    []
  );
  useEffect(
    () => {
      serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
        .getRegisterViewmodel(false, serviceContainer)
        .then((model: RegisterViewmodel) => setRegistrationViewmodel(model));
    },
    []
  );
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function onGo(): void {
    Promise.all([
      serviceContainer.configurationService.savePreferences(
        serviceContainer.arcaneArchiveProxy,
        preferencesViewmodel.dto,
        loggedIn
      ),
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
            // TODO correct this and the other viewmodelchanged
            viewmodelChanged={noop}
          />
        );
      case "register":
        return (
          <RegisterPanel
            navigateTo={setCurrentPanel}
            viewmodel={registrationViewmodel}
            viewmodelChanged={noop}
          />
        );
      case "system":
        return (
          <SystemPanel
            navigateTo={setCurrentPanel}
            viewmodel={systemSettingsViewmodel}
            viewmodelChanged={noop}
          />
        );
      case "preferences":
        return (
          <PreferencesPanel
            navigateTo={setCurrentPanel}
            onGo={onGo}
            viewmodel={preferencesViewmodel}
            viewmodelChanged={noop}
          />
        );
    }
  }
}
