import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../hooks/use-services";
import { LoginRequestDto, LoginResponseDto } from "../../../dto";
import { BaseDialogProps } from "../../base/base-dialog";

export function LoginDialogFooter(props: BaseDialogProps<LoginRequestDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    serviceContainer.collectionManagerProxy.postData<LoginRequestDto, LoginResponseDto>(
      "authentication", "/auth/login", props.viewmodel.dto, true
    ).then(
      (r: LoginResponseDto) => {
        serviceContainer.sessionService.setSessionData(r);
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
        key="dologin"
        disabled={props.viewmodel.hasChanges && props.viewmodel.isValid ? false : true}
        onClick={loginClick}
      >
        Login
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
