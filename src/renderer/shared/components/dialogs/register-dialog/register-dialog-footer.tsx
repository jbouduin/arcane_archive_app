import { noop } from "lodash";
import React from "react";
import { useServices } from "../../../../hooks";
import { RegisterRequestDto } from "../../../dto";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";

export function RegisterDialogFooter(props: BaseDialogFooterProps<RegisterRequestDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function registerClick(e: React.SyntheticEvent<HTMLElement, Event>, dto: RegisterRequestDto) {
    return serviceContainer.collectionManagerProxy.postData<RegisterRequestDto, object>(
      "authentication", "/public/account", dto, false
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
    <SaveCancelResetFooter<RegisterRequestDto>
      {...props}
      showResetButton={true}
      commitButtonLabel="Register"
      commitButtonIcon="new-person"
      onCommitButtonClick={registerClick}
    />
  );
  // #endregion
}
