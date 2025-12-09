import { H1 } from "@blueprintjs/core";
import { LoginRequestDto } from "../../../dto";
import { BaseDialogBodyProps } from "../../base/base-dialog";

export function SettingsDialogBody(_props: BaseDialogBodyProps<LoginRequestDto>) {
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
