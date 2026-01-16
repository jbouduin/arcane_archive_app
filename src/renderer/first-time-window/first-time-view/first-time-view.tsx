import { Card } from "@blueprintjs/core";
import classNames from "classnames";
import { cloneDeep, noop } from "lodash";
import { useReducer, useRef, useState } from "react";
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
  // Use a mutable viewmodel and force update after changes using reducer
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  const loginViewmodelRef = useRef<LoginViewmodel>(cloneDeep(props.loginViewmodel));
  const registrationViewmodelRef = useRef<RegisterViewmodel>(props.registerViewmodel);
  const systemSettingsViewmodelRef = useRef<SystemSettingsViewmodel>(
    serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getSystemSettingsViewmodelFromDto(cloneDeep(props.systemSettings), true)
  );
  const preferencesViewmodelRef = useRef<PreferencesViewmodel>(
    serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(serviceContainer.configurationService.preferences)
  );
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function onGo(): void {
    Promise.all([
      serviceContainer.configurationService.savePreferences(
        serviceContainer.arcaneArchiveProxy,
        preferencesViewmodelRef.current.dto,
        loggedIn
      ),
      serviceContainer.configurationService.saveSystemSettings(systemSettingsViewmodelRef.current.dto)
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
            afterLogin={(dto: LoginResponseDto) => {
              preferencesViewmodelRef.current = serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(dto.profile.preferences);
              forceUpdate();
            }}
            viewmodel={loginViewmodelRef.current}
          />
        );
      case "register":
        return (
          <RegisterPanel
            navigateTo={setCurrentPanel}
            viewmodel={registrationViewmodelRef.current}
          />
        );
      case "system":
        return (
          <SystemPanel
            navigateTo={setCurrentPanel}
            viewmodel={systemSettingsViewmodelRef.current}
          />
        );
      case "preferences":
        return (
          <PreferencesPanel
            navigateTo={setCurrentPanel}
            onGo={onGo}
            viewmodel={preferencesViewmodelRef.current}
          />
        );
    }
  }
}
