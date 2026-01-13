import { Button, DialogBody, DialogFooter } from "@blueprintjs/core";
import { useReducer } from "react";
import { useServices, useSession } from "../../../hooks";
import { PreferencesDialogBody } from "../../../shared/components/dialogs/preferences-dialog/preferences-dialog-body";
import { PreferencePanelProps } from "./preferences-panel.props";

export function PreferencesPanel(props: PreferencePanelProps) {
  // #region State ------------------------------------------------------------
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
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
        <PreferencesDialogBody
          viewmodelChanged={forceUpdate}
          viewmodel={props.viewmodel}
          onValidationCompleted={forceUpdate}
          isOpen={true}
        />
      </DialogBody>
      <DialogFooter>
        <div className="dialog-footer-button-bar">
          <Button onClick={backClick}>Back</Button>
          <Button
            disabled={!props.viewmodel.isValid || props.viewmodel.isValidationInProgress}
            onClick={props.onGo}
          >
            Take me to the Arcane Archive
          </Button>
        </div>
      </DialogFooter>
    </>
  );
  // #endregion
}
