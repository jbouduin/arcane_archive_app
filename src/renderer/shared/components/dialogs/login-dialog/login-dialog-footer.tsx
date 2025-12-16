import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { useServices } from "../../../../hooks/use-services";
import { LoginRequestDto } from "../../../dto";
import { LoginViewmodel } from "../../../viewmodel";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";
import { showRegisterDialog } from "../factory";
import { LoginResponseDto } from "../../../../../common/dto";

export function LoginDialogFooter(props: BaseDialogFooterProps<LoginRequestDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: LoginRequestDto): Promise<void> {
    return serviceContainer.sessionService.login(serviceContainer, dto)
      .then(
        (_resp: LoginResponseDto) => {
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }

  function registerClick(): void {
    showRegisterDialog(serviceContainer, false);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter<LoginRequestDto>
      additionalLeftButtons={additionalLeftButtons()}
      {...props}
      showResetButton={false}
      commitButtonLabel="Log in"
      commitButtonIcon="log-in"
      onCommitButtonClick={loginClick}
    />
  );

  function additionalLeftButtons(): ReactNode {
    return (
      (props.viewmodel as LoginViewmodel).showRegisterButton &&
      (
        <Button
          key="register"
          icon="new-person"
          onClick={registerClick}
        >
          Register
        </Button>
      )
    );
  }
  // #endregion
}
