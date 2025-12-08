import { Button, H4, Props } from "@blueprintjs/core";
import { useServices } from "../../../hooks";
import { LoginRequestDto, RegisterRequestDto } from "../../dto";
import { LoginViewmodel, RegisterViewmodel } from "../../viewmodel";
import { BaseDialogBodyProps, BaseDialogProps } from "../base/base-dialog";
import { LoginDialogBody } from "../dialogs/login-view/login-dialog-body";
import { LoginDialogFooter } from "../dialogs/login-view/login-dialog-footer";
import { RegisterDialogBody } from "../dialogs/register-dialog/register-dialog-body";
import { RegisterDialogFooter } from "../dialogs/register-dialog/register-dialog-footer";

export function NotLoggedInView(_props: Props) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(): void {
    const loginDialogProps: BaseDialogProps<LoginRequestDto> = {
      isOpen: true,
      isCloseButtonShown: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: false,
      title: "Login",
      viewmodel: new LoginViewmodel(
        {
          user: "sys_admi",
          password: "sys_admin"
        }
      ),
      bodyRenderer: (bodyProps: BaseDialogBodyProps<LoginRequestDto>) => {
        return (<LoginDialogBody key="body" {...bodyProps} />);
      },
      footerRenderer: (footerProps: BaseDialogProps<LoginRequestDto>) => {
        return (<LoginDialogFooter key="footer" {...footerProps} />);
      }
    };
    serviceContainer.dialogService.openDialog(loginDialogProps);
  }

  function registerClick(): void {
    const registerDto: RegisterRequestDto = {
      userName: "",
      password: "",
      passwordRepeat: "",
      email: "",
      emailRepeat: "",
      firstName: "",
      lastName: ""
    };
    const loginDialogProps: BaseDialogProps<RegisterRequestDto> = {
      isOpen: true,
      isCloseButtonShown: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: false,
      title: "Register",
      viewmodel: new RegisterViewmodel(registerDto),
      bodyRenderer: (bodyProps: BaseDialogBodyProps<RegisterRequestDto>) => {
        return (<RegisterDialogBody key="body" {...bodyProps} />);
      },
      footerRenderer: (footerProps: BaseDialogProps<RegisterRequestDto>) => {
        return (<RegisterDialogFooter key="footer" {...footerProps} />);
      }
    };
    serviceContainer.dialogService.openDialog(loginDialogProps);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="not-logged-in-wrapper">
      <H4>You are not logged in</H4>
      <p>Please login or register in order to continue.</p>
      <p>
        <Button onClick={loginClick}>Login</Button>
        <Button onClick={registerClick}> Register</Button>
      </p>
    </div>
  );
  // #endregion
}
