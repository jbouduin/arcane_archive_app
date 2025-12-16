import { Button, ButtonGroup, DialogBody, DialogFooter } from "@blueprintjs/core";
import { cloneDeep, noop } from "lodash";
import { LoginResponseDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { LoginDialogBody } from "../../../shared/components/dialogs/login-dialog/login-dialog-body";
import { LoginRequestDto } from "../../../shared/dto";
import { LoginViewmodel } from "../../../shared/viewmodel";
import { BaseViewmodel } from "../../../shared/viewmodel/base.viewmodel";
import { LoginPanelProps } from "./login-panel.props";

export function LoginPanel(props: LoginPanelProps) {
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
          viewmodelChanged={(v: BaseViewmodel<LoginRequestDto>) => {
            props.viewmodelChanged(cloneDeep(v as LoginViewmodel));
          }}
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
              disabled={!props.viewmodel.isValid}
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
