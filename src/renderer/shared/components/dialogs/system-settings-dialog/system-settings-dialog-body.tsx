import { H4 } from "@blueprintjs/core";
import { SystemSettingsViewmodel } from "../../../viewmodel/settings";
import { BaseDialogBodyProps } from "../../base/base-dialog";

// eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
export function SystemSettingsDialogBody(props: BaseDialogBodyProps<String>) {
  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <H4>
        {(props.viewmodel as SystemSettingsViewmodel).value}
      </H4>
    </div>
  );
  // #endregion
}
