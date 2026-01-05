import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { UserDto } from "../../../dto";
import { UserViewmodel } from "../../../viewmodel";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { ProfileDialogFooterProps } from "./profile-dialog.props";

export function ProfileDialogFooter(props: ProfileDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSaveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: UserDto): Promise<void> {
    return serviceContainer.sessionService
      .saveUser(serviceContainer, dto)
      .then(
        (_r: object) => {
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
    <SaveCancelResetFooter<UserDto, UserViewmodel>
      {...props}
      showResetButton={true}
      onCommitButtonClick={onSaveClick}
    />
  );
  // #endregion
}
