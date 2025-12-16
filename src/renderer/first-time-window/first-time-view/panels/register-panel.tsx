import { Button, ButtonGroup, DialogBody, DialogFooter } from "@blueprintjs/core";
import { cloneDeep, noop } from "lodash";
import { useServices } from "../../../hooks";
import { RegisterDialogBody } from "../../../shared/components/dialogs/register-dialog/register-dialog-body";
import { RegisterRequestDto } from "../../../shared/dto";
import { RegisterViewmodel } from "../../../shared/viewmodel";
import { BaseViewmodel } from "../../../shared/viewmodel/base.viewmodel";
import { RegisterPanelProps } from "./register-panel.props";

export function RegisterPanel(props: RegisterPanelProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function registerClick() {
    return serviceContainer.sessionService.register(serviceContainer, props.viewmodel.dto)
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
          viewmodelChanged={(v: BaseViewmodel<RegisterRequestDto>) => props.viewmodelChanged(cloneDeep(v as RegisterViewmodel))}
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
            <Button onClick={registerClick}>Register</Button>
            <Button onClick={() => props.navigateTo("system")}>Continue without account</Button>
          </ButtonGroup>
        </div>
      </DialogFooter>
    </>
  );
  // #endregion
}
