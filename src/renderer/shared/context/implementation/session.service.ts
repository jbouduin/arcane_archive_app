import { noop } from "lodash";
import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { mergeWithChangeDetails } from "../../../../common/util";
import { ChangePasswordRequestDto, RecoverPasswordRequestDto, RegisterRequestDto, ResetPasswordRequestDto, UserDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { IArcaneArchiveProxyService, IIpcProxyService, IServiceContainer, ISessionService } from "../interface";
import { SessionChangeListener } from "../types";

export class SessionService implements ISessionService {
  //#region Private fields ----------------------------------------------------
  private _jwt: string | null;
  private roles: Set<ApplicationRole>;
  private _userName: string | null;
  private sessionChangeListeners: Array<SessionChangeListener>;
  private refreshTimeout: NodeJS.Timeout | null;
  private _refreshToken: string | null;
  private unsubscribeInvalidSession: (() => void) | null;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    this._jwt = null;
    this._userName = null;
    this.roles = new Set<ApplicationRole>();
    this.sessionChangeListeners = new Array<SessionChangeListener>();
    this.refreshTimeout = null;
    this._refreshToken = null;
    this.unsubscribeInvalidSession = null;
  }
  //#endregion

  //#region ISessionService Members - Other -----------------------------------
  public async initialize(serviceContainer: IServiceContainer): Promise<void> {
    if (this.unsubscribeInvalidSession == null) {
      this.unsubscribeInvalidSession = serviceContainer.arcaneArchiveProxy.subscribeInvalidSessionListener(
        () => this.clearSessionData(serviceContainer.ipcProxy)
      );
    }
    return serviceContainer.ipcProxy.getData<LoginResponseDto>(IpcPaths.SESSION)
      .then(
        (r: LoginResponseDto) => {
          if (r) {
            this.setSessionData(r, serviceContainer);
            serviceContainer.configurationService.preferences = r.profile.preferences;
          } else {
            document.title = "Arcane Archive";
          }
        },
        noop
      );
  }

  public selectDirectory(ipcProxy: IIpcProxyService, currentValue: string): Promise<string | undefined> {
    return ipcProxy.getData<string>(`${IpcPaths.IO_SELECT_DIRECTORY}/${encodeURIComponent(currentValue)}`);
  }
  //#endregion

  //#region ISessionService Members - Account - User --------------------------
  public changePassword(
    arcaneArchiveProxy: IArcaneArchiveProxyService,
    ipcProxy: IIpcProxyService,
    changePasswordRequest: ChangePasswordRequestDto): Promise<void> {
    return arcaneArchiveProxy
      .postData<ChangePasswordRequestDto, never>(
        "authentication",
        "/app/account/password",
        changePasswordRequest,
        { suppressSuccessMessage: false }
      )
      .then(
        () => this.clearSessionData(ipcProxy)
      );
  }

  public getNewUserName(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<string> {
    /* eslint-disable @typescript-eslint/no-wrapper-object-types */
    return arcaneArchiveProxy
      .getData<String>("authentication", "/public/account/new-user")
      .then((resp: String) => resp.valueOf());
    /* eslint-enable @typescript-eslint/no-wrapper-object-types */
  }

  public register(arcaneArchiveProxy: IArcaneArchiveProxyService, registerDto: RegisterRequestDto): Promise<void> {
    return arcaneArchiveProxy
      .postData<RegisterRequestDto, never>("authentication", "/public/account", registerDto);
  }

  public recoverPassword(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: RecoverPasswordRequestDto): Promise<void> {
    return arcaneArchiveProxy.postData<RecoverPasswordRequestDto, never>(
      "authentication", "/public/account/password/recover", dto, { suppressSuccessMessage: false }
    );
  }

  public resetPassword(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: ResetPasswordRequestDto): Promise<void> {
    return arcaneArchiveProxy.postData<ResetPasswordRequestDto, never>(
      "authentication", "/public/account/password/reset", dto
    );
  }

  public saveSelf(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: UserDto): Promise<UserDto> {
    return arcaneArchiveProxy.putData<UserDto, UserDto>(
      "authentication", "/app/account", dto
    );
  }

  public saveUser(arcaneArchiveProxy: IArcaneArchiveProxyService, dto: UserDto): Promise<UserDto> {
    return arcaneArchiveProxy.putData<UserDto, UserDto>(
      "authentication", "/admin/acount", dto
    );
  }

  public userExists(arcaneArchiveProxy: IArcaneArchiveProxyService, userName: string, signal: AbortSignal): Promise<boolean> {
    /* eslint-disable @typescript-eslint/no-wrapper-object-types */
    return arcaneArchiveProxy
      .getData<Boolean>("authentication", `/public/account/user-exist?user=${userName}`, { signal: signal })
      .then((resp: Boolean) => resp.valueOf());
    /* eslint-enable @typescript-eslint/no-wrapper-object-types */
  }
  //#endregion

  //#region ISessionService Members - Session ---------------------------------
  public hasRole(role: ApplicationRole): boolean {
    return this.roles.has(role);
  }

  public hasAnyRole(...roles: Array<ApplicationRole>): boolean {
    return roles.some((role: ApplicationRole) => this.roles.has(role));
  }

  public login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    return serviceContainer.arcaneArchiveProxy
      .postData<LoginRequestDto, LoginResponseDto>(
        "authentication", "/auth/login", loginRequest, { suppressSuccessMessage: true }
      ).then(
        async (r: LoginResponseDto) => {
          const mergePreferencesResult = mergeWithChangeDetails(
            serviceContainer.configurationService.preferences,
            r.profile.preferences ?? {}
          );
          this.setSessionData(r, serviceContainer);
          if (mergePreferencesResult.changed) {
            await serviceContainer.configurationService.savePreferences(
              serviceContainer.arcaneArchiveProxy,
              mergePreferencesResult.merged,
              true);
          } else {
            serviceContainer.configurationService.preferences = mergePreferencesResult.merged;
          }
          await serviceContainer.ipcProxy.postData<LoginResponseDto, never>(IpcPaths.SESSION, r);
          return r;
        }
      );
  }

  public logout(serviceContainer: IServiceContainer): Promise<void> {
    return serviceContainer.arcaneArchiveProxy
      .postData<never, never>(
        "authentication",
        "/auth/logout",
        null,
        { suppressSuccessMessage: false, suppressErrorMessage: false, suppressInvalidSessionHandling: true }
      )
      .then(
        () => this.clearSessionData(serviceContainer.ipcProxy),
        () => this.clearSessionData(serviceContainer.ipcProxy)
      );
  }

  public subscribeSessionChangeListener(listener: SessionChangeListener): () => void {
    this.sessionChangeListeners.push(listener);
    return () => {
      this.sessionChangeListeners = this.sessionChangeListeners.filter(l => l !== listener);
    };
  }
  //#endregion

  //#region ISessionService Members - Local Account storage -------------------
  public deleteSavedUser(ipcProxy: IIpcProxyService, username: string): Promise<number> {
    return ipcProxy.deleteData(`${IpcPaths.CREDENTIAL}/${username}`);
  }

  public getSavedUserNames(ipcProxy: IIpcProxyService): Promise<Array<string>> {
    return ipcProxy.getData<Array<string>>(IpcPaths.CREDENTIAL);
  }

  public getPassword(ipcProxy: IIpcProxyService, username: string): Promise<string> {
    return ipcProxy.getData<string>(`${IpcPaths.CREDENTIAL}/${username}`);
  }

  public saveCredentials(ipcProxy: IIpcProxyService, loginRequest: LoginRequestDto): Promise<void> {
    return ipcProxy.postData<LoginRequestDto, never>(IpcPaths.CREDENTIAL, loginRequest);
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  private clearSessionData(ipcProxy: IIpcProxyService): void {
    this._jwt = null;
    this._userName = null;
    this._refreshToken = null;
    this.roles.clear();
    if (this.refreshTimeout != null) {
      clearTimeout(this.refreshTimeout);
    }
    ipcProxy.deleteData(IpcPaths.SESSION);
    document.title = "Arcane Archive";
    this.sessionChangeListeners.forEach((l: SessionChangeListener) => l(null, null));
  }

  public refreshToken(serviceContainer: IServiceContainer): void {
    if (this._refreshToken != null) {
      void serviceContainer.arcaneArchiveProxy!
        .postData<never, LoginResponseDto>("authentication", `/auth/refresh-token/${this._refreshToken}`, null)
        .then(
          (refreshData: LoginResponseDto) => {
            this.setSessionData(refreshData, serviceContainer);
            serviceContainer.configurationService.preferences = refreshData.profile.preferences;
            serviceContainer.ipcProxy.postData<LoginResponseDto, never>(IpcPaths.SESSION, refreshData);
          },
          () => {
            this.clearSessionData(serviceContainer.ipcProxy);
          }
        );
    }
  }

  private setSessionData(data: LoginResponseDto, serviceContainer: IServiceContainer): void {
    this._jwt = data.token;
    const payload = this._jwt.split(".")[1];
    const raw = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    this.roles = new Set<ApplicationRole>(raw["roles"]);
    this._userName = raw["sub"];
    this._refreshToken = data.refreshToken;
    const expiry = (raw["exp"] as number) * 1000;
    const now = Date.now();
    if (this.refreshTimeout != null) {
      clearTimeout(this.refreshTimeout);
    }
    if (data.refreshToken != null) {
      this.refreshTimeout = setTimeout(
        () => this.refreshToken(serviceContainer),
        Math.max(0, expiry - now) * 0.9 //  Max -> Just in case token has expired, but session not
      );
    }
    document.title = `Arcane Archive - (logged in as ${this._userName}})`;
    this.sessionChangeListeners.forEach((l: SessionChangeListener) => l(data, this._userName));
  }
  //#endregion
}
