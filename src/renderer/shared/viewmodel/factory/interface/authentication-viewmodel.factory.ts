import { UserDto } from "../../../dto";
import { LoginViewmodel, RegisterViewmodel, UserViewmodel } from "../../authentication";

export interface IAuthenticationViewmodelFactory {
  getLoginViewmodel(showRegisterButton: boolean): LoginViewmodel;
  getRegisterViewmodel(showLoginButton: boolean): RegisterViewmodel;
  getUserViewmodel(userDto: UserDto): UserViewmodel;
}
