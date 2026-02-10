import { PreferencesDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import { RecoverPasswordRequestDto, RegisterRequestDto, ResetPasswordRequestDto, UserDto } from "../../../dto";
import {
  ChangePasswordViewmodel, LoginViewmodel, ProfileViewmodel,
  RecoverPasswordViewmodel, RegisterViewmodel, ResetPasswordViewmodel
} from "../../authentication";
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

  public getInitialLoginViewmodel(
    showRegisterButton: boolean,
    knownUsers: Array<string> = new Array<string>()
  ): LoginViewmodel {
    return new LoginViewmodel(
      {
        user: "",
        password: ""
      },
      showRegisterButton,
      knownUsers
    );
  }

  public getLoginViewmodel(
    showRegisterButton: boolean,
    savedUserNames: Array<string>,
    passwordOfSingleUser: string | null
  ): LoginViewmodel {
    let result: LoginViewmodel;
    if (savedUserNames.length == 1) {
      // create an initial view model and set the properties, so that the modified flag is true
      result = this.getInitialLoginViewmodel(showRegisterButton, savedUserNames);
      result.dto["user"] = savedUserNames[0];
      result.dto["password"] = passwordOfSingleUser!;
      result.selectedExistingPassword = passwordOfSingleUser!;
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

  public async getRegisterViewmodel(
    showLoginButton: boolean,
    serviceContainer: IServiceContainer,
    preferences: PreferencesDto
  ): Promise<RegisterViewmodel> {
    const newUserName = await serviceContainer.sessionService.getNewUserName(serviceContainer.arcaneArchiveProxy);
    const registerDto: RegisterRequestDto = {
      userName: newUserName,
      password: "",
      passwordRepeat: "",
      email: "",
      emailRepeat: "",
      firstName: "",
      lastName: "",
      preferences: preferences
    };
    return new RegisterViewmodel(registerDto, showLoginButton, serviceContainer);
  }

  public getResetPasswordViewmodel(dto: ResetPasswordRequestDto): ResetPasswordViewmodel {
    return new ResetPasswordViewmodel(dto);
  }

  public getUserViewmodel(userDto: UserDto): ProfileViewmodel {
    return new ProfileViewmodel(userDto);
  }
  // #endregion
}
