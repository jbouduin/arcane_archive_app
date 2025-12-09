import { noop } from "lodash";
import { useServices } from "../../../../hooks/use-services";
import { LoginRequestDto, LoginResponseDto } from "../../../dto";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";

export function LoginDialogFooter(props: BaseDialogFooterProps<LoginRequestDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  // function loginClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
  function loginClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: LoginRequestDto): Promise<void> {
    return serviceContainer.collectionManagerProxy.postData<LoginRequestDto, LoginResponseDto>(
      "authentication", "/auth/login", dto, true
    ).then(
      (r: LoginResponseDto) => {
        serviceContainer.sessionService.setSessionData(r);
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
      commitButtonLabel="Log in"
      commitButtonIcon="log-in"
      onCommitButtonClick={loginClick}
    />
  );
  // #endregion
}
