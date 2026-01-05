import { IArcaneArchiveProxyService, IServiceContainer } from "../../../context";
import { LoginViewmodel, RegisterViewmodel, UserViewmodel } from "../../authentication";

export interface IAuthenticationViewmodelFactory {
  getInitialLoginViewmodel(showRegisterButton: boolean): LoginViewmodel;
  getInitialRegisterViewmodel(showLoginButton: boolean): RegisterViewmodel;
  getLoginViewmodel(showRegisterButton: boolean, serviceContainer: IServiceContainer): Promise<LoginViewmodel>;
  getRegisterViewmodel(showLoginButton: boolean, serviceContainer: IServiceContainer): Promise<RegisterViewmodel>;
  getUserViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<UserViewmodel>;
}
