import { random } from "lodash";
import { IServiceContainer } from "../../../context";
import { RegisterRequestDto, UserDto } from "../../../dto";
import { LoginViewmodel, RegisterViewmodel, UserViewmodel } from "../../authentication";
import { IAuthenticationViewmodelFactory } from "../interface";

export class AuthenticationViewmodelFactory implements IAuthenticationViewmodelFactory {
  // #region IAuthenticationViewmodelFactory Members --------------------------
  public getInitialLoginViewmodel(showRegisterButton: boolean, knownUsers: Array<string> = new Array<string>()): LoginViewmodel {
    return new LoginViewmodel(
      {
        user: "",
        password: ""
      },
      showRegisterButton,
      knownUsers
    );
  }

  public async getLoginViewmodel(showRegisterButton: boolean, serviceContainer: IServiceContainer): Promise<LoginViewmodel> {
    let result: LoginViewmodel;
    const savedUserNames = await serviceContainer.sessionService
      .getSavedUserNames(serviceContainer)
      .then(
        (userNames: Array<string>) => userNames,
        () => new Array<string>()
      );
    if (savedUserNames.length == 1) {
      // create an initial view model and set the properties, so that the modified flag is true
      const existingPwd = await serviceContainer.sessionService.getPassword(serviceContainer, savedUserNames[0]);
      result = this.getInitialLoginViewmodel(showRegisterButton, savedUserNames);
      result.user = savedUserNames[0];
      result.password = existingPwd;
      result.selectedExistingPassword = existingPwd;
    } else {
      result = new LoginViewmodel(
        {
          user: "",
          password: ""
        },
        showRegisterButton,
        savedUserNames
      );
    }
    return result;
  }

  public getRegisterViewmodel(showLoginButton: boolean): RegisterViewmodel {
    // TODO create empty register viewmodel, eventually go to server to generate a username
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
