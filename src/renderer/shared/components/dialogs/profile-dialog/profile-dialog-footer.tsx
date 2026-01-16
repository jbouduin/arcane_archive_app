import { noop } from "lodash";
import { useServices, useSession } from "../../../../hooks";
import { ProfileDto, UserDto } from "../../../dto";
import { SaveCancelResetFooterNew } from "../../base/base-dialog";
import { ProfileDialogFooterProps } from "./profile-dialog.props";

export function ProfileDialogFooter(props: ProfileDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { userName } = useSession();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSaveClick(event: React.SyntheticEvent<HTMLElement, Event>): Promise<void> {
    let result: Promise<UserDto>;
    const userDto: UserDto = {
      account: props.viewmodel.accountViewmodel.dto,
      profile: props.viewmodel.dto
    };
    if (serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN") && userName == userDto.account.accountName) {
      result = serviceContainer.sessionService.saveUser(serviceContainer.arcaneArchiveProxy, userDto);
    } else {
      result = serviceContainer.sessionService.saveSelf(serviceContainer.arcaneArchiveProxy, userDto);
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
    <SaveCancelResetFooterNew
      {...props}
      showResetButton={true}
      onCommitButtonClick={
        (event: React.SyntheticEvent<HTMLElement, Event>, _dto: ProfileDto) => onSaveClick(event)
      }
    />
  );
  // #endregion
}
