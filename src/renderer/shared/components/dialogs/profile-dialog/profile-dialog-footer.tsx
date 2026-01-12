import { noop } from "lodash";
import { useServices, useSession } from "../../../../hooks";
import { UserDto } from "../../../dto";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { ProfileDialogFooterProps } from "./profile-dialog.props";

export function ProfileDialogFooter(props: ProfileDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { userName } = useSession();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSaveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: UserDto): Promise<void> {
    let result: Promise<UserDto>;
    if (serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN") && userName == dto.account.accountName) {
      result = serviceContainer.sessionService.saveUser(serviceContainer.arcaneArchiveProxy, dto);
    } else {
      result = serviceContainer.sessionService.saveSelf(serviceContainer.arcaneArchiveProxy, dto);
    }
    return result.then(
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
    <SaveCancelResetFooter
      {...props}
      showResetButton={true}
      onCommitButtonClick={onSaveClick}
    />
  );
  // #endregion
}
