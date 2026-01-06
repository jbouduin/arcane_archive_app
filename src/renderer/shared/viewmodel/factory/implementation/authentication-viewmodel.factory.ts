import { PreferencesDto } from "../../../../../common/dto";
import { IArcaneArchiveProxyService, IServiceContainer } from "../../../context";
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

  public getInitialRegisterViewmodel(showLoginButton: boolean, preferences: PreferencesDto): RegisterViewmodel {
    const registerDto: RegisterRequestDto = {
      userName: "",
      password: "",
      passwordRepeat: "",
      email: "",
      emailRepeat: "",
      firstName: "",
      lastName: "",
      preferences: preferences
    };
    return new RegisterViewmodel(registerDto, showLoginButton);
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

  public async getRegisterViewmodel(showLoginButton: boolean, serviceContainer: IServiceContainer): Promise<RegisterViewmodel> {
    const newUserName = await serviceContainer.sessionService.getNewUserName(serviceContainer.arcaneArchiveProxy);
    const registerDto: RegisterRequestDto = {
      userName: newUserName.valueOf(),
      password: "",
      passwordRepeat: "",
      email: "",
      emailRepeat: "",
      firstName: "",
      lastName: "",
      preferences: serviceContainer.configurationService.preferences
    };
    return new RegisterViewmodel(registerDto, showLoginButton);
  }

  public getUserViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<UserViewmodel> {
    return arcaneArchiveProxy
      .getData<UserDto>("authentication", "/app/account")
      .then((userDto: UserDto) => new UserViewmodel(userDto));
  }
  // #endregion
}
