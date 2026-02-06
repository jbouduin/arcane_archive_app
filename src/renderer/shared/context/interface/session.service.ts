import { LoginRequestDto, SessionDto } from "../../../../common/dto";
import { ChangePasswordRequestDto, RecoverPasswordRequestDto, RegisterRequestDto, ResetPasswordRequestDto, UserDto } from "../../dto";
import { PreferencesLoadedListener, SessionChangeListener } from "../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";
import { IIpcProxy } from "./ipc-proxy";
import { IServiceContainer } from "./service-container";

export interface ISessionService {
  //#region Service methods ---------------------------------------------------
  initialize(serviceContainer: IServiceContainer): Promise<void>;
  initializeSubscriptions(arcaneArchiveProxy: IArcaneArchiveProxy, ipcProxy: IIpcProxy): void;
  subscribePreferencesLoadedListener(listener: PreferencesLoadedListener): () => void;
  subscribeSessionChangeListener(listener: SessionChangeListener): () => void;
  //#endregion

  //#region Account - User ----------------------------------------------------
  changePassword(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    ipcProxy: IIpcProxy,
    changePasswordRequest: ChangePasswordRequestDto): Promise<void>;
  getNewUserName(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<string>;
  register(arcaneArchiveProxy: IArcaneArchiveProxy, registerDto: RegisterRequestDto): Promise<void>;
  recoverPassword(arcaneArchiveProxy: IArcaneArchiveProxy, dto: RecoverPasswordRequestDto): Promise<void>;
  resetPassword(arcaneArchiveProxy: IArcaneArchiveProxy, dto: ResetPasswordRequestDto): Promise<void>;
  saveSelf(arcaneArchiveProxy: IArcaneArchiveProxy, dto: UserDto): Promise<UserDto>;
  saveUser(arcaneArchiveProxy: IArcaneArchiveProxy, dto: UserDto): Promise<UserDto>;
  userExists(arcaneArchiveProxy: IArcaneArchiveProxy, userName: string, signal: AbortSignal): Promise<boolean>;
  //#endregion

  //#region Session -----------------------------------------------------------
  login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<SessionDto>;
  logout(serviceContainer: IServiceContainer): Promise<void>;
  //#endregion

  //#region Local account storage ---------------------------------------------
  deleteSavedUser(ipcProxy: IIpcProxy, username: string): Promise<number>;
  getSavedUserNames(ipcProxy: IIpcProxy): Promise<Array<string>>;
  getPassword(ipcProxy: IIpcProxy, username: string): Promise<string>;
  saveCredentials(ipcProxy: IIpcProxy, loginRequest: LoginRequestDto): Promise<void>;
  //#endregion
};
