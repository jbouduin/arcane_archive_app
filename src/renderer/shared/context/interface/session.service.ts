import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { ChangePasswordRequestDto, RegisterRequestDto, UserDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { SessionChangeListener } from "../providers";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";
import { IServiceContainer } from "./service-container";

export interface ISessionService {
  readonly loggedIn: boolean;
  readonly userName: string | null;
  readonly email: string | null;

  changePassword(arcaneArchiveProxy: IArcaneArchiveProxyService, changePasswordRequest: ChangePasswordRequestDto): Promise<void>;
  getNewUserName(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<string>;
  hasRole(role: ApplicationRole): boolean;
  hasAnyRole(...roles: Array<ApplicationRole>): boolean;
  initialize(serviceContainer: IServiceContainer): Promise<void>;
  subscribeSessionChangeListener(listener: SessionChangeListener): () => void;
  login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<LoginResponseDto>;
  logout(serviceContainer: IServiceContainer): Promise<void>;
  register(serviceContainer: IServiceContainer, registerDto: RegisterRequestDto): Promise<void>;
  saveUser(serviceContainer: IServiceContainer, dto: UserDto): Promise<UserDto>;
  saveCredentials(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<void>;
  getSavedUserNames(serviceContainer: IServiceContainer): Promise<Array<string>>;
  getPassword(serviceContainer: IServiceContainer, username: string): Promise<string>;
  deleteSavedUser(serviceContainer: IServiceContainer, username: string): Promise<number>;
  userExists(serviceContainer: IServiceContainer, userName: string): Promise<boolean>;
};
