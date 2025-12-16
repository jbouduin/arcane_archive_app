import { random } from "lodash";
import { RegisterRequestDto, UserDto } from "../../../dto";
import { LoginViewmodel, RegisterViewmodel, UserViewmodel } from "../../authentication";
import { IAuthenticationViewmodelFactory } from "../interface";

export class AuthenticationViewmodelFactory implements IAuthenticationViewmodelFactory {
  // TODO create empty view models, eventually go to server to generate a username
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
    const nr = random(100000, 999999);
    const registerDto: RegisterRequestDto = {
      userName: "usr_" + nr.toString(),
      password: "usr_" + nr.toString(),
      passwordRepeat: "usr_" + nr.toString(),
      email: "usr_" + nr.toString() + "@b.com",
      emailRepeat: "usr_" + nr.toString() + "@b.com",
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
