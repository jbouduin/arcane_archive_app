import { noop } from "lodash";
import { LoginRequestDto, SessionDto, PreferencesDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { ChangePasswordRequestDto, RecoverPasswordRequestDto, RegisterRequestDto, ResetPasswordRequestDto, UserDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { IArcaneArchiveProxy, IIpcProxy, IServiceContainer, ISessionService } from "../interface";
import { PreferencesLoadedListener, SessionChangeListener } from "../types";

export class SessionService implements ISessionService {
  //#region Private fields ----------------------------------------------------
  private _jwt: string | null;
  private preferencesLoadedListeners: Array<PreferencesLoadedListener>;
  private roles: Set<ApplicationRole>;
  private refreshTimeout: NodeJS.Timeout | null;
  private _refreshToken: string | null;
  private sessionChangeListeners: Array<SessionChangeListener>;
  private unsubscribeInvalidSession: (() => void) | null;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    this._jwt = null;
    this.preferencesLoadedListeners = Array<PreferencesLoadedListener>();
    this.roles = new Set<ApplicationRole>();
    this.refreshTimeout = null;
    this._refreshToken = null;
    this.sessionChangeListeners = new Array<SessionChangeListener>();
    this.unsubscribeInvalidSession = null;
  }
  //#endregion

  //#region ISessionService Members - Service methods -------------------------
  public async initialize(serviceContainer: IServiceContainer): Promise<void> {
    return serviceContainer.ipcProxy.getData<SessionDto>(IpcPaths.SESSION)
      .then(
        (r: SessionDto) => {
          if (r) {
            this.setSessionData(r, serviceContainer);
            this.broadcastPreferencesLoaded(r.profile.preferences);
          } else {
            document.title = "Arcane Archive";
          }
        },
        noop
      );
  }

  public initializeSubscriptions(arcaneArchiveProxy: IArcaneArchiveProxy, ipcProxy: IIpcProxy): void {
    if (this.unsubscribeInvalidSession == null) {
      this.unsubscribeInvalidSession = arcaneArchiveProxy.subscribeInvalidSessionListener(
        () => this.clearSessionData(ipcProxy)
      );
    }
  }

  public selectDirectory(ipcProxy: IIpcProxy, currentValue: string): Promise<string | undefined> {
    return ipcProxy.getData<string>(`${IpcPaths.IO_SELECT_DIRECTORY}/${encodeURIComponent(currentValue)}`);
  }

  public subscribePreferencesLoadedListener(listener: PreferencesLoadedListener): () => void {
    this.preferencesLoadedListeners.push(listener);
    return () => {
      this.preferencesLoadedListeners = this.preferencesLoadedListeners
        .filter((listener: PreferencesLoadedListener) => listener !== listener);
    };
  }

  public subscribeSessionChangeListener(listener: SessionChangeListener): () => void {
    this.sessionChangeListeners.push(listener);
    return () => {
      this.sessionChangeListeners = this.sessionChangeListeners.filter(l => l !== listener);
    };
  }
  //#endregion

  //#region ISessionService Members - Account - User --------------------------
  public changePassword(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    ipcProxy: IIpcProxy,
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

  public getNewUserName(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<string> {
    /* eslint-disable @typescript-eslint/no-wrapper-object-types */
    return arcaneArchiveProxy
      .getData<String>("authentication", "/public/account/new-user")
      .then((resp: String) => resp.valueOf());
    /* eslint-enable @typescript-eslint/no-wrapper-object-types */
  }

  public register(arcaneArchiveProxy: IArcaneArchiveProxy, registerDto: RegisterRequestDto): Promise<void> {
    return arcaneArchiveProxy
      .postData<RegisterRequestDto, never>("authentication", "/public/account", registerDto);
  }

  public recoverPassword(arcaneArchiveProxy: IArcaneArchiveProxy, dto: RecoverPasswordRequestDto): Promise<void> {
    return arcaneArchiveProxy.postData<RecoverPasswordRequestDto, never>(
      "authentication", "/public/account/password/recover", dto, { suppressSuccessMessage: false }
    );
  }

  public resetPassword(arcaneArchiveProxy: IArcaneArchiveProxy, dto: ResetPasswordRequestDto): Promise<void> {
    return arcaneArchiveProxy.postData<ResetPasswordRequestDto, never>(
      "authentication", "/public/account/password/reset", dto
    );
  }

  public saveSelf(arcaneArchiveProxy: IArcaneArchiveProxy, dto: UserDto): Promise<UserDto> {
    return arcaneArchiveProxy.putData<UserDto, UserDto>(
      "authentication", "/app/account", dto
    );
  }

  public saveUser(arcaneArchiveProxy: IArcaneArchiveProxy, dto: UserDto): Promise<UserDto> {
    return arcaneArchiveProxy.putData<UserDto, UserDto>(
      "authentication", "/admin/acount", dto
    );
  }

  public userExists(arcaneArchiveProxy: IArcaneArchiveProxy, userName: string, signal: AbortSignal): Promise<boolean> {
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

  public login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<SessionDto> {
    return serviceContainer.arcaneArchiveProxy
      .postData<LoginRequestDto, SessionDto>(
        "authentication", "/auth/login", loginRequest, { suppressSuccessMessage: true }
      ).then(
        (r: SessionDto) => {
          this.setSessionData(r, serviceContainer);
          this.broadcastPreferencesLoaded(r.profile.preferences);
          void serviceContainer.ipcProxy.postData<SessionDto, never>(IpcPaths.SESSION, r);

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
        () => this.clearSessionData(serviceContainer.ipcProxy) // swallow any reject
      );
  }

  //#endregion

  //#region ISessionService Members - Local Account storage -------------------
  public deleteSavedUser(ipcProxy: IIpcProxy, username: string): Promise<number> {
    return ipcProxy.deleteData(`${IpcPaths.CREDENTIAL}/${username}`);
  }

  public getSavedUserNames(ipcProxy: IIpcProxy): Promise<Array<string>> {
    return ipcProxy.getData<Array<string>>(IpcPaths.CREDENTIAL);
  }

  public getPassword(ipcProxy: IIpcProxy, username: string): Promise<string> {
    return ipcProxy.getData<string>(`${IpcPaths.CREDENTIAL}/${username}`);
  }

  public saveCredentials(ipcProxy: IIpcProxy, loginRequest: LoginRequestDto): Promise<void> {
    return ipcProxy.postData<LoginRequestDto, never>(IpcPaths.CREDENTIAL, loginRequest);
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  private broadcastPreferencesLoaded(preferences: PreferencesDto): void {
    this.preferencesLoadedListeners.forEach(
      (listener: PreferencesLoadedListener) => listener(preferences)
    );
  }

  private clearSessionData(ipcProxy: IIpcProxy): void {
    this._jwt = null;
    this._refreshToken = null;
    this.roles.clear();
    if (this.refreshTimeout != null) {
      clearTimeout(this.refreshTimeout);
    }
    void ipcProxy.deleteData(IpcPaths.SESSION);
    document.title = "Arcane Archive";
    this.sessionChangeListeners.forEach((l: SessionChangeListener) => l(null));
  }

  public refreshToken(serviceContainer: IServiceContainer): void {
    if (this._refreshToken != null) {
      void serviceContainer.arcaneArchiveProxy!
        .postData<never, SessionDto>("authentication", `/auth/refresh-token/${this._refreshToken}`, null)
        .then(
          (refreshData: SessionDto) => {
            this.setSessionData(refreshData, serviceContainer);
            this.broadcastPreferencesLoaded(refreshData.profile.preferences);
            void serviceContainer.ipcProxy.postData<SessionDto, never>(IpcPaths.SESSION, refreshData);
          },
          () => {
            this.clearSessionData(serviceContainer.ipcProxy);
          }
        );
    }
  }

  private setSessionData(data: SessionDto, serviceContainer: IServiceContainer): void {
    this._jwt = data.token;
    const payload = this._jwt.split(".")[1];
    const raw = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    this.roles = new Set<ApplicationRole>(raw["roles"]);
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
    document.title = `Arcane Archive - (logged in as ${data.userName}})`;
    this.sessionChangeListeners.forEach((l: SessionChangeListener) => l(data));
  }
  //#endregion
}
