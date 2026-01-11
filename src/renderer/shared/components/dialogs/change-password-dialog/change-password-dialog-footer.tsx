import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { ChangePasswordRequestDto } from "../../../dto";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { ChangePasswordDialogFooterProps } from "./change-password-dialog.props";

export function ChangePasswordDialogFooter(props: ChangePasswordDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function changeClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: ChangePasswordRequestDto): Promise<void> {
    return serviceContainer.sessionService.changePassword(serviceContainer.arcaneArchiveProxy, dto)
      .then(
        () => {
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter
      {...props}
      showResetButton={false}
      commitButtonLabel="Change password"
      onCommitButtonClick={changeClick}
    />
  );
  // #endregion
}
