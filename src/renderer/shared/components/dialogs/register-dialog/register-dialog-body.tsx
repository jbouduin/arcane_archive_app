import React from "react";
import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { H3 } from "@blueprintjs/core";

export function RegisterDialogBody(props: BaseDialogBodyProps<RegisterRequestDto>) {
  // #region State ------------------------------------------------------------
  const [_registrationData, _setRegistrationData] = React.useState<RegisterViewmodel>(props.viewmodel as RegisterViewmodel);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <H3>
      Register dialog Body
    </H3>
  );
  // #endregion
}
