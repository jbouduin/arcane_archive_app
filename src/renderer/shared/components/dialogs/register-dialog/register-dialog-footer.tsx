import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import React from "react";
import { useServices } from "../../../../hooks";
import { RegisterRequestDto } from "../../../dto";
import { BaseDialogProps } from "../../base/base-dialog";

export function RegisterDialogFooter(props: BaseDialogProps<RegisterRequestDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function registerClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    serviceContainer.collectionManagerProxy.postData<RegisterRequestDto, object>(
      "authentication", "/public/account", props.viewmodel.dto, false
    ).then(
      (_r: object) => {
        if (props.onClose) {
          props.onClose(e);
        }
      },
      noop
    );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      <Button
        key="doregister"
        disabled={props.viewmodel.hasChanges && props.viewmodel.isValid ? false : true}
        onClick={registerClick}
      >
        Register
      </Button>
      <Button
        key="cancellogin"
        icon="cross"
        onClick={props.onClose}
      >
        Cancel
      </Button>
    </>
  );
  // #endregion
}
