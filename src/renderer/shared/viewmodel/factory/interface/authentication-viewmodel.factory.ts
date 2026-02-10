import { PreferencesDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import { RecoverPasswordRequestDto, ResetPasswordRequestDto, UserDto } from "../../../dto";
import { ChangePasswordViewmodel, LoginViewmodel, ProfileViewmodel, RecoverPasswordViewmodel, RegisterViewmodel, ResetPasswordViewmodel } from "../../authentication";

export interface IAuthenticationViewmodelFactory {
  getChangePasswordViewmodel(userName: string, email: string): ChangePasswordViewmodel;
  getInitialLoginViewmodel(showRegisterButton: boolean): LoginViewmodel;
  getLoginViewmodel(
    showRegisterButton: boolean,
    savedUserNames: Array<string>,
    passwordOfSingleUser: string | null): LoginViewmodel;
  getRecoverPasswordViewmodel(dto: RecoverPasswordRequestDto): RecoverPasswordViewmodel;
  getRegisterViewmodel(
    showLoginButton: boolean,
    serviceContainer: IServiceContainer,
    preferences: PreferencesDto
  ): Promise<RegisterViewmodel>;
  getResetPasswordViewmodel(dto: ResetPasswordRequestDto): ResetPasswordViewmodel;
  getUserViewmodel(userDto: UserDto): ProfileViewmodel;
}
