import { SystemSettingsDto } from "../../../../../common/dto";
import { SystemSettingsViewmodel } from "../../../viewmodel/settings";
import { BaseDialogBodyProps } from "../../base/base-dialog";

export function SystemSettingsDialogBody(props: BaseDialogBodyProps<SystemSettingsDto>) {
  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <p>
        {(props.viewmodel as SystemSettingsViewmodel).rootDataDirectory}
      </p>
      <p>
        {(props.viewmodel as SystemSettingsViewmodel).cacheDirectory}
      </p>
      <p>
        {(props.viewmodel as SystemSettingsViewmodel).databaseName}
      </p>
    </div>
  );
  // #endregion
}
