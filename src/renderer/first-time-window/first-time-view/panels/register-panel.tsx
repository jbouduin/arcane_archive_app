import { Button, ButtonGroup, DialogBody, DialogFooter } from "@blueprintjs/core";
import { noop } from "lodash";
import { useReducer } from "react";
import { useServices } from "../../../hooks";
import { RegisterDialogBody } from "../../../shared/components/dialogs";
import { RegisterPanelProps } from "./register-panel.props";

export function RegisterPanel(props: RegisterPanelProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  // #endregion

  // #region Event handling ---------------------------------------------------
  function registerClick() {
    return serviceContainer.sessionService
      .register(serviceContainer.arcaneArchiveProxy, props.viewmodel.dtoToSave)
      .then(
        () => props.navigateTo("login"),
        noop
      );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      <DialogBody className="first-time-view-panel-body">
        <RegisterDialogBody
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
            <Button onClick={() => props.navigateTo("login")}>Login Instead</Button>
            <Button
              disabled={!props.viewmodel.canCommit}
              onClick={registerClick}
            >
              Register
            </Button>
            <Button onClick={() => props.navigateTo("system")}>Continue without account</Button>
          </ButtonGroup>
        </div>
      </DialogFooter>
    </>
  );
  // #endregion
}
