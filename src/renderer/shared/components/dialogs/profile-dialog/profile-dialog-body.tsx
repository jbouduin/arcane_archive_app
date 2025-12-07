import { H3 } from "@blueprintjs/core";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { LoginRequestDto } from "../../../dto";

export function ProfileDialogBody(_props: BaseDialogBodyProps<LoginRequestDto>) {
  // #region State ------------------------------------------------------------
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <H3>
        Profile dialog Body
      </H3>
    </div>
  );
  // #endregion
}
