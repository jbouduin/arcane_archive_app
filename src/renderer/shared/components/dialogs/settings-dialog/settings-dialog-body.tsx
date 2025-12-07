import { H1 } from "@blueprintjs/core";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { LoginRequestDto } from "../../../dto";

export function SettingsDialogBody(_props: BaseDialogBodyProps<LoginRequestDto>) {
  // #region State ------------------------------------------------------------
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <H1>
        Settings dialog Body
      </H1>
    </div>
  );
  // #endregion
}
