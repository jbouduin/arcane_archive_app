import { IServiceContainer } from "../../../context";
import { UserDto } from "../../../dto";
import { LoginViewmodel, RegisterViewmodel, UserViewmodel } from "../../authentication";

export interface IAuthenticationViewmodelFactory {
  getInitialLoginViewmodel(showRegisterButton: boolean): LoginViewmodel;
  getLoginViewmodel(showRegisterButton: boolean, serviceContainer: IServiceContainer): Promise<LoginViewmodel>;
  getRegisterViewmodel(showLoginButton: boolean): RegisterViewmodel;
  getUserViewmodel(userDto: UserDto): UserViewmodel;
}
