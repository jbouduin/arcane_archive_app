import { PreferencesDto } from "../../../../../common/dto";
import { IArcaneArchiveProxyService, IServiceContainer } from "../../../context";
import { RecoverPasswordRequestDto, ResetPasswordRequestDto } from "../../../dto";
import { LoginViewmodel, RecoverPasswordViewmodel, RegisterViewmodel, ResetPasswordViewmodel, UserViewmodel } from "../../authentication";
import { ChangePasswordViewmodel } from "../../authentication/change-password.viewmodel";

export interface IAuthenticationViewmodelFactory {
  getChangePasswordViewmodel(userName: string, email: string): ChangePasswordViewmodel;
  getInitialLoginViewmodel(showRegisterButton: boolean): LoginViewmodel;
  getInitialRegisterViewmodel(showLoginButton: boolean, preferences: PreferencesDto): RegisterViewmodel;
  getLoginViewmodel(showRegisterButton: boolean, serviceContainer: IServiceContainer): Promise<LoginViewmodel>;
  getRecoverPasswordViewmodel(dto: RecoverPasswordRequestDto): RecoverPasswordViewmodel;
  getRegisterViewmodel(showLoginButton: boolean, serviceContainer: IServiceContainer): Promise<RegisterViewmodel>;
  getResetPasswordViewmodel(dto: ResetPasswordRequestDto): ResetPasswordViewmodel;
  getUserViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<UserViewmodel>;
}
