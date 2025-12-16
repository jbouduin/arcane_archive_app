import { Button, DialogBody, DialogFooter } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import { PreferencesDto } from "../../../../common/dto";
import { useServices, useSession } from "../../../hooks";
import { PreferencesDialogBody } from "../../../shared/components/dialogs/preferences-dialog/preferences-dialog-body";
import { BaseViewmodel } from "../../../shared/viewmodel/base.viewmodel";
import { PreferencesViewmodel } from "../../../shared/viewmodel/settings";
import { PreferencePanelProps } from "./preferences-panel.props";

export function PreferencesPanel(props: PreferencePanelProps) {
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
          viewmodelChanged={(v: BaseViewmodel<PreferencesDto>) => {
            props.viewmodelChanged(cloneDeep(v as PreferencesViewmodel));
          }}
          viewmodel={props.viewmodel}
          isOpen={true}
        />
      </DialogBody>
      <DialogFooter>
        <div className="dialog-footer-button-bar">
          <Button onClick={backClick}>Back</Button>
          <Button onClick={props.onGo}>Take me to the Arcane Archive</Button>
        </div>
      </DialogFooter>
    </>
  );
  // #endregion
}
