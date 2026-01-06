import { Button, DialogBody, DialogFooter } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import { SystemSettingsDto } from "../../../../common/dto";
import { useServices, useSession } from "../../../hooks";
import { SystemSettingsDialogBody } from "../../../shared/components/dialogs/system-settings-dialog/system-settings-dialog-body";
import { BaseViewmodel } from "../../../shared/viewmodel/base.viewmodel";
import { SystemSettingsViewmodel } from "../../../shared/viewmodel/settings";
import { SystemPanelProps } from "./system-panel.props";

export function SystemPanel(props: SystemPanelProps) {
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
          viewmodelChanged={(v: BaseViewmodel<SystemSettingsDto>) => {
            props.viewmodelChanged(cloneDeep(v as SystemSettingsViewmodel));
          }}
          viewmodel={props.viewmodel}
          isOpen={true}
        />
      </DialogBody>
      <DialogFooter>
        <div className="dialog-footer-button-bar">
          <Button onClick={backClick}>Back</Button>
          <Button onClick={() => props.navigateTo("preferences")}>Next</Button>
        </div>
      </DialogFooter>
    </>
  );
  // #endregion
}
