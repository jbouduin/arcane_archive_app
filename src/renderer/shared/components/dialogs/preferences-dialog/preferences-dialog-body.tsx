import { H4 } from "@blueprintjs/core";
import { PreferencesViewmodel } from "../../../viewmodel/settings";
import { BaseDialogBodyProps } from "../../base/base-dialog";

// eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
export function PreferencesDialogBody(props: BaseDialogBodyProps<String>) {
  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <H4>
        {(props.viewmodel as PreferencesViewmodel).value}
      </H4>
    </div>
  );
  // #endregion
}
