import { noop } from "lodash";
import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { mergeWithChangeDetails } from "../../../../common/util";
import { RegisterRequestDto, UserDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { IArcaneArchiveProxyService, IServiceContainer } from "../interface";
import { ISessionService } from "../interface/session.service";
import { SessionChangeListener } from "../providers";

export class SessionService implements ISessionService {
  // #region Private fields ---------------------------------------------------
  private _jwt: string | null;
  private roles: Set<ApplicationRole>;
  private _userName: string | null;
  private listeners: Array<SessionChangeListener>;
  private refreshTimeout: NodeJS.Timeout | null;
  private _refreshToken: string | null;
  // #endregion

  // #region ISessionService Members (getters) --------------------------------
  public get loggedIn(): boolean {
    return this._jwt != null;
  }

  public get jwt(): string | null {
    return this._jwt;
  }

  public get userName(): string | null {
    return this._userName;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._jwt = null;
    this._userName = null;
    this.roles = new Set<ApplicationRole>();
    this.listeners = new Array<SessionChangeListener>();
    this.refreshTimeout = null;
    this._refreshToken = null;
  }
  // #endregion

  // #region ISessionService Members ------------------------------------------
  public getNewUserName(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<string> {
    /* eslint-disable @typescript-eslint/no-wrapper-object-types */
    return arcaneArchiveProxy
      .getData<String>("authentication", "/public/account/new-user")
      .then((resp: String) => resp.valueOf());
    /* eslint-enable @typescript-eslint/no-wrapper-object-types */
  }

  public hasRole(role: ApplicationRole): boolean {
    return this.roles.has(role);
  }

  public hasAnyRole(...roles: Array<ApplicationRole>): boolean {
    return roles.some((role: ApplicationRole) => this.roles.has(role));
  }

  public async initialize(serviceContainer: IServiceContainer): Promise<void> {
    return serviceContainer.ipcProxy.getData<LoginResponseDto>(IpcPaths.SESSION)
      .then(
        (r: LoginResponseDto) => {
          if (r) {
            this.setSessionData(r, serviceContainer);
            serviceContainer.configurationService.preferences = r.profile.preferences;
          }
        },
        noop
      );
  }

  public subscribe(listener: SessionChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    return serviceContainer.arcaneArchiveProxy
      .postData<LoginRequestDto, LoginResponseDto>(
        "authentication", "/auth/login", loginRequest, true
      ).then(
        async (r: LoginResponseDto) => {
          const mergePreferencesResult = mergeWithChangeDetails(
            serviceContainer.configurationService.preferences,
            r.profile.preferences ?? {}
          );
          this.setSessionData(r, serviceContainer);
          if (mergePreferencesResult.changed) {
            await serviceContainer.configurationService.savePreferences(serviceContainer, mergePreferencesResult.merged);
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
      .postData<never, never>("authentication", "/auth/logout", null, false)
      .then(
        (_r: never) => {
          this.setSessionData(null, null);
          serviceContainer.ipcProxy.deleteData(IpcPaths.SESSION);
        }
      );
  }

  public register(serviceContainer: IServiceContainer, registerDto: RegisterRequestDto): Promise<void> {
    return serviceContainer.arcaneArchiveProxy
      .postData<RegisterRequestDto, never>("authentication", "/public/account", registerDto, false);
  }

  public saveUser(serviceContainer: IServiceContainer, dto: UserDto): Promise<UserDto> {
    const path = serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN") &&
      dto.account.accountName != serviceContainer.sessionService.userName
      ? "/admin/acount"
      : "/app/account";
    return serviceContainer.arcaneArchiveProxy.putData<UserDto, UserDto>(
      "authentication", path, dto, false
    );
  }

  public saveCredentials(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<void> {
    return serviceContainer.ipcProxy.postData<LoginRequestDto, never>(IpcPaths.CREDENTIAL, loginRequest);
  }

  public getSavedUserNames(serviceContainer: IServiceContainer): Promise<Array<string>> {
    return serviceContainer.ipcProxy.getData<Array<string>>(IpcPaths.CREDENTIAL);
  }

  public getPassword(serviceContainer: IServiceContainer, username: string): Promise<string> {
    return serviceContainer.ipcProxy.getData<string>(`${IpcPaths.CREDENTIAL}/${username}`);
  }

  public deleteSavedUser(serviceContainer: IServiceContainer, username: string): Promise<number> {
    return serviceContainer.ipcProxy.deleteData(`${IpcPaths.CREDENTIAL}/${username}`);
  }

  public userExists(serviceContainer: IServiceContainer, userName: string): Promise<boolean> {
    /* eslint-disable @typescript-eslint/no-wrapper-object-types */
    return serviceContainer.arcaneArchiveProxy
      .getData<Boolean>("authentication", `/public/account/user-exist?user=${userName}`)
      .then((resp: Boolean) => resp.valueOf());
    /* eslint-enable @typescript-eslint/no-wrapper-object-types */
  }

  public refreshToken(serviceContainer: IServiceContainer): void {
    if (this._refreshToken != null) {
      void serviceContainer.arcaneArchiveProxy!
        .postData<never, LoginResponseDto>("authentication", `/auth/refresh-token/${this._refreshToken}`, null, true)
        .then(
          (refreshData: LoginResponseDto) => {
            this.setSessionData(refreshData, serviceContainer);
            serviceContainer.configurationService.preferences = refreshData.profile.preferences;
            serviceContainer.ipcProxy.postData<LoginResponseDto, never>(IpcPaths.SESSION, refreshData);
          },
          () => {
            this.setSessionData(null, null);
            serviceContainer.ipcProxy.deleteData(IpcPaths.SESSION);
          }
        );
    }
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private setSessionData(data: LoginResponseDto | null, serviceContainer: IServiceContainer | null): void {
    if (data != null && serviceContainer != null) {
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
    } else {
      this._jwt = null;
      this._userName = null;
      // this._profile = null;
      this._refreshToken = null;
      this.roles.clear();
      if (this.refreshTimeout != null) {
        clearTimeout(this.refreshTimeout);
      }
    }
    this.listeners.forEach((l: SessionChangeListener) => l(data));
  }
  // #endregion
}
