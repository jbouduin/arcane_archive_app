import { RegisterRequestDto, UserDto } from "../../../dto";
import { LoginViewmodel, RegisterViewmodel, UserViewmodel } from "../../authentication";
import { IAuthenticationViewmodelFactory } from "../interface";

export class AuthenticationViewmodelFactory implements IAuthenticationViewmodelFactory {
  // #region IAuthenticationViewmodelFactory Members --------------------------
  public getLoginViewmodel(showRegisterButton: boolean): LoginViewmodel {
    // LATER: allow user to locally save username (and password if we can encrypt-decrypt it in some form)
    return new LoginViewmodel(
      {
        user: "sys_admi",
        password: "sys_admin"
      },
      showRegisterButton
    );
  }

  public getRegisterViewmodel(showLoginButton: boolean): RegisterViewmodel {
    const registerDto: RegisterRequestDto = {
      userName: "",
      password: "",
      passwordRepeat: "",
      email: "",
      emailRepeat: "",
      firstName: "",
      lastName: ""
    };
    return new RegisterViewmodel(registerDto, showLoginButton);
  }

  public getUserViewmodel(userDto: UserDto): UserViewmodel {
    return new UserViewmodel(userDto);
  }
  // #endregion
}
