import React from "react";
import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogProps } from "../../base/base-dialog";

export function RegisterDialogFooter(props: BaseDialogProps<RegisterRequestDto>) {
  // #region State ------------------------------------------------------------
  const [_loginData, _setLoginDate] = React.useState<RegisterViewmodel>(props.viewmodel as RegisterViewmodel);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div>Register view</div>
  );
  // #endregion
}
