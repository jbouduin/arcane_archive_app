import { noop } from "lodash";
import { useServices, useSession } from "../../../../hooks";
import { ProfileDto, UserDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { ProfileDialogFooterProps } from "./profile-dialog.props";

export function ProfileDialogFooter(props: ProfileDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const { arcaneArchiveProxy, sessionService } = useServices();
  const { userName, isSysAdmin } = useSession();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSaveClick(event: React.SyntheticEvent<HTMLElement, Event>): Promise<void> {
    let result: Promise<UserDto>;
    const userDto: UserDto = {
      account: props.viewmodel.accountViewmodel.dto,
      profile: props.viewmodel.dto
    };
    if (isSysAdmin && userName == userDto.account.accountName) {
      result = sessionService.saveUser(arcaneArchiveProxy, userDto);
    } else {
      result = sessionService.saveSelf(arcaneArchiveProxy, userDto);
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
    <DefaultDialogFooter
      {...props}
      showResetButton={true}
      onCommitButtonClick={
        (event: React.SyntheticEvent<HTMLElement, Event>, _dto: ProfileDto) => onSaveClick(event)
      }
    />
  );
  // #endregion
}
