import { Button, DialogBody, DialogFooter } from "@blueprintjs/core";
import { useReducer } from "react";
import { useServices, useSession } from "../../../hooks";
import { SystemSettingsDialogBody } from "../../../shared/components/dialogs/system-settings-dialog/system-settings-dialog-body";
import { SystemPanelProps } from "./system-panel.props";

export function SystemPanel(props: SystemPanelProps) {
  // #region State ------------------------------------------------------------
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const serviceContainer = useServices();
  // #endregion

  // #region Rendering --------------------------------------------------------
  async function backClick() {
    if (loggedIn) {
      await serviceContainer.sessionService.logout(serviceContainer);
      props.navigateTo("intro");
    } else {
      props.navigateTo("register");
    }
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      <DialogBody className="first-time-view-panel-body">
        <SystemSettingsDialogBody
          viewmodelChanged={forceUpdate}
          viewmodel={props.viewmodel!}
          isOpen={true}
          onValidationCompleted={forceUpdate}
        />
      </DialogBody>
      <DialogFooter>
        <div className="dialog-footer-button-bar">
          <Button onClick={backClick}>Back</Button>
          <Button
            disabled={!props.viewmodel!.isValid || props.viewmodel!.isValidationInProgress}
            onClick={() => props.navigateTo("preferences")}
          >
            Next
          </Button>
        </div>
      </DialogFooter>
    </>
  );
  // #endregion
}
