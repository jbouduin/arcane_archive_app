import { Button, ButtonGroup, DialogBody, DialogFooter } from "@blueprintjs/core";
import { noop } from "lodash";
import { useReducer } from "react";
import { LoginResponseDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { LoginDialogBody } from "../../../shared/components/dialogs/login-dialog/login-dialog-body";
import { LoginPanelProps } from "./login-panel.props";

export function LoginPanel(props: LoginPanelProps) {
  // #region State ------------------------------------------------------------
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(): void {
    if (props.viewmodel.isValid) {
      void serviceContainer.sessionService.login(serviceContainer, props.viewmodel.dto)
        .then(
          (r: LoginResponseDto) => {
            props.afterLogin(r);
            props.navigateTo("system");
          },
          noop
        );
    }
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      <DialogBody className="first-time-view-panel-body">
        <LoginDialogBody
          viewmodelChanged={forceUpdate}
          onValidationCompleted={forceUpdate}
          viewmodel={props.viewmodel}
          isOpen={true}
        />
      </DialogBody>
      <DialogFooter>
        <div className="dialog-footer-button-bar">
          <ButtonGroup>
            <Button onClick={() => props.navigateTo("intro")}>Back</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={() => props.navigateTo("register")}>Register instead</Button>
            <Button onClick={() => props.navigateTo("system")}>Continue without account</Button>
            <Button
              disabled={!props.viewmodel.canCommit}
              onClick={loginClick}
            >
              Login
            </Button>
          </ButtonGroup>
        </div>
      </DialogFooter>
    </>
  );
  // #endregion
}
