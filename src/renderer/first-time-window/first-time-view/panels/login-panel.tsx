import { Button, ButtonGroup, DialogBody, DialogFooter } from "@blueprintjs/core";
import { noop } from "lodash";
import { useReducer } from "react";
import { SessionDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { LoginDialogBody } from "../../../shared/components/dialogs";
import { LoginPanelProps } from "./login-panel.props";

export function LoginPanel(props: LoginPanelProps): JSX.Element {
  //#region State -------------------------------------------------------------
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  //#endregion

  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function loginClick(): void {
    if (props.viewmodel.isValid) {
      void serviceContainer.sessionService.login(serviceContainer, props.viewmodel.dtoToSave)
        .then(
          (r: SessionDto) => {
            props.afterLogin(r);
            props.navigateTo("system");
          },
          noop
        );
    }
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <>
      <DialogBody className="first-time-view-panel-body">
        <LoginDialogBody
          viewmodelChanged={forceUpdate}
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
  //#endregion
}
