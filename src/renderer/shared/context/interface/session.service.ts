import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { ChangePasswordRequestDto, RecoverPasswordRequestDto, RegisterRequestDto, ResetPasswordRequestDto, UserDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { SessionChangeListener } from "../types";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";
import { IIpcProxyService } from "./ipc-proxy.service";
import { IServiceContainer } from "./service-container";

export interface ISessionService {
  // #region Other ------------------------------------------------------------
  initialize(serviceContainer: IServiceContainer): Promise<void>;
  selectDirectory(ipcProxy: IIpcProxyService, currentValue: string): Promise<string | undefined>;
  // #endregion

  // #region Account - User ---------------------------------------------------
  changePassword(
    arcaneArchiveProxy: IArcaneArchiveProxyService,
    ipcProxy: IIpcProxyService,
    changePasswordRequest: ChangePasswordRequestDto): Promise<void>;
  getNewUserName(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<string>;
  register(arcaneArchiveProxy: IArcaneArchiveProxyService, registerDto: RegisterRequestDto): Promise<void>;
  recoverPassword(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: RecoverPasswordRequestDto): Promise<void>;
  resetPassword(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: ResetPasswordRequestDto): Promise<void>;
  saveSelf(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: UserDto): Promise<UserDto>;
  saveUser(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: UserDto): Promise<UserDto>;
  userExists(arcaneArchiveProxy: IArcaneArchiveProxyService, userName: string, signal: AbortSignal): Promise<boolean>;
  // #endregion

  // #region Session ----------------------------------------------------------
  hasAnyRole(...roles: Array<ApplicationRole>): boolean;
  hasRole(role: ApplicationRole): boolean;
  login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<LoginResponseDto>;
  logout(serviceContainer: IServiceContainer): Promise<void>;
  subscribeSessionChangeListener(listener: SessionChangeListener): () => void;
  // #endregion

  // #region Local account storage --------------------------------------------
  deleteSavedUser(ipcProxy: IIpcProxyService, username: string): Promise<number>;
  getSavedUserNames(ipcProxy: IIpcProxyService): Promise<Array<string>>;
  getPassword(ipcProxy: IIpcProxyService, username: string): Promise<string>;
  saveCredentials(ipcProxy: IIpcProxyService, loginRequest: LoginRequestDto): Promise<void>;
  // #endregion
};
