import { PreferencesDto } from "../../../../../common/dto";
import { IArcaneArchiveProxyService, IServiceContainer } from "../../../context";
import { LoginViewmodel, RegisterViewmodel, UserViewmodel } from "../../authentication";
import { ChangePasswordViewmodel } from "../../authentication/change-password.viewmodel";

export interface IAuthenticationViewmodelFactory {
  getChangePasswordViewmodel(userName: string, email: string): ChangePasswordViewmodel;
  getInitialLoginViewmodel(showRegisterButton: boolean): LoginViewmodel;
  getInitialRegisterViewmodel(showLoginButton: boolean, preferences: PreferencesDto): RegisterViewmodel;
  getLoginViewmodel(showRegisterButton: boolean, serviceContainer: IServiceContainer): Promise<LoginViewmodel>;
  getRegisterViewmodel(showLoginButton: boolean, serviceContainer: IServiceContainer): Promise<RegisterViewmodel>;
  getUserViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<UserViewmodel>;
}
