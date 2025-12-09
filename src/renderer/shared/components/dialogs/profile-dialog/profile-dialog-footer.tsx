import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { UserDto } from "../../../dto";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";

export function ProfileDialogFooter(props: BaseDialogFooterProps<UserDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSaveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: UserDto): Promise<void> {
    const path = serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN") &&
      dto.account.accountName != serviceContainer.sessionService.userName
      ? "/admin/acount"
      : "/app/account";
    return serviceContainer.collectionManagerProxy.putData<UserDto, UserDto>(
      "authentication", path, dto, false
    ).then(
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
