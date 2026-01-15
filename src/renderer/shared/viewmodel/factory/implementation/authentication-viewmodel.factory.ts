import { IArcaneArchiveProxyService, IServiceContainer } from "../../../context";
import { RecoverPasswordRequestDto, RegisterRequestDto, ResetPasswordRequestDto, UserDto } from "../../../dto";
import { ChangePasswordViewmodel, LoginViewmodel, RecoverPasswordViewmodel, RegisterViewmodel, ResetPasswordViewmodel, UserViewmodel } from "../../authentication";
import { IAuthenticationViewmodelFactory } from "../interface";

export class AuthenticationViewmodelFactory implements IAuthenticationViewmodelFactory {
  // #region IAuthenticationViewmodelFactory Members --------------------------
  public getChangePasswordViewmodel(userName: string, email: string): ChangePasswordViewmodel {
    return new ChangePasswordViewmodel({
      userName: userName,
      email: email,
      oldPassword: "",
      password: "",
      passwordRepeat: ""
    });
  }

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
      .getSavedUserNames(serviceContainer.ipcProxy)
      .then(
        (userNames: Array<string>) => userNames,
        () => new Array<string>()
      );
    if (savedUserNames.length == 1) {
      // create an initial view model and set the properties, so that the modified flag is true
      const existingPwd = await serviceContainer.sessionService.getPassword(serviceContainer.ipcProxy, savedUserNames[0]);
      result = this.getInitialLoginViewmodel(showRegisterButton, savedUserNames);
      result.dto["user"] = savedUserNames[0];
      result.dto["password"] = existingPwd;
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

  public getRecoverPasswordViewmodel(dto: RecoverPasswordRequestDto): RecoverPasswordViewmodel {
    return new RecoverPasswordViewmodel(dto);
  }

  public async getRegisterViewmodelNew(showLoginButton: boolean, serviceContainer: IServiceContainer): Promise<RegisterViewmodel> {
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
    return new RegisterViewmodel(registerDto, showLoginButton, serviceContainer);
  }

  public getResetPasswordViewmodel(dto: ResetPasswordRequestDto): ResetPasswordViewmodel {
    return new ResetPasswordViewmodel(dto);
  }

  public getUserViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<UserViewmodel> {
    return arcaneArchiveProxy
      .getData<UserDto>("authentication", "/app/account")
      .then((userDto: UserDto) => new UserViewmodel(userDto));
  }
  // #endregion
}
