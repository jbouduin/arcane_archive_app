import { IArcaneArchiveProxyService, IServiceContainer } from "../../../context";
import { RecoverPasswordRequestDto, ResetPasswordRequestDto } from "../../../dto";
import { LoginViewmodel, RecoverPasswordViewmodel, ResetPasswordViewmodel, UserViewmodel } from "../../authentication";
import { ChangePasswordViewmodel } from "../../authentication";
import { RegisterViewmodel } from "../../authentication";

export interface IAuthenticationViewmodelFactory {
  getChangePasswordViewmodel(userName: string, email: string): ChangePasswordViewmodel;
  getInitialLoginViewmodel(showRegisterButton: boolean): LoginViewmodel;
  getLoginViewmodel(showRegisterButton: boolean, serviceContainer: IServiceContainer): Promise<LoginViewmodel>;
  getRecoverPasswordViewmodel(dto: RecoverPasswordRequestDto): RecoverPasswordViewmodel;
  getRegisterViewmodelNew(showLoginButton: boolean, serviceContainer: IServiceContainer): Promise<RegisterViewmodel>;
  getResetPasswordViewmodel(dto: ResetPasswordRequestDto): ResetPasswordViewmodel;
  getUserViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<UserViewmodel>;
}
