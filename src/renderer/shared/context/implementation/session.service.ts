import { noop } from "lodash";
import { LoginResponseDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { LoginRequestDto, ProfileDto, RegisterRequestDto, UserDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { IConfigurationService, IServiceContainer } from "../interface";
import { ISessionService } from "../interface/session.service";
import { SessionChangeListener } from "../providers";
import { IpcProxyService } from "./ipc-proxy.service";

export class SessionService implements ISessionService {
  // #region Private fields ---------------------------------------------------
  private _jwt: string | null;
  private roles: Set<ApplicationRole>;
  private _userName: string | null;
  private listeners: Array<SessionChangeListener>;
  private _profile: ProfileDto | null;
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

  public get profile(): ProfileDto | null {
    return this._profile;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._jwt = null;
    this._userName = null;
    this._profile = null;
    this.roles = new Set<ApplicationRole>();
    this.listeners = new Array<SessionChangeListener>();
  }
  // #endregion

  // #region ISessionService Members ------------------------------------------
  public hasRole(role: ApplicationRole): boolean {
    return this.roles.has(role);
  }

  public hasAnyRole(...roles: Array<ApplicationRole>): boolean {
    return roles.some((role: ApplicationRole) => this.roles.has(role));
  }

  public async initialize(ipcProxy: IpcProxyService, configurationService: IConfigurationService): Promise<void> {
    return ipcProxy.getData<LoginResponseDto>(IpcPaths.SESSION)
      .then(
        (r: LoginResponseDto) => {
          if (r) {
            this.setSessionData(r);
            configurationService.preferences = r.profile.preferences;
          }
        }, noop);
  }

  public setSessionData(data: LoginResponseDto | null): void {
    if (data != null) {
      this._jwt = data.token;
      const payload = this._jwt.split(".")[1];
      const raw = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
      this.roles = new Set<ApplicationRole>(raw["roles"]);
      this._userName = raw["sub"];
      this._profile = data.profile;
    } else {
      this._jwt = null;
      this._userName = null;
      this._profile = null;
      this.roles.clear();
    }
    this.listeners.forEach((l: SessionChangeListener) => l(data));
  }

  public subscribe(listener: SessionChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    return serviceContainer.collectionManagerProxy
      .postData<LoginRequestDto, LoginResponseDto>(
        "authentication", "/auth/login", loginRequest, true
      ).then(
        (r: LoginResponseDto) => {
          this.setSessionData(r);
          serviceContainer.configurationService.preferences = r.profile.preferences;
          serviceContainer.ipcProxy.postData<LoginResponseDto, never>(IpcPaths.SESSION, r);
          return r;
        }
      );
  }

  public logout(serviceContainer: IServiceContainer): Promise<void> {
    return serviceContainer.collectionManagerProxy
      .postData<never, never>("authentication", "/auth/logout", null, false)
      .then(
        (_r: never) => {
          this.setSessionData(null);
          serviceContainer.ipcProxy.deleteData(IpcPaths.SESSION);
        }
      );
  }

  public register(serviceContainer: IServiceContainer, registerDto: RegisterRequestDto): Promise<void> {
    return serviceContainer.collectionManagerProxy
      .postData<RegisterRequestDto, never>("authentication", "/public/account", registerDto, false);
  }

  public saveUser(serviceContainer: IServiceContainer, dto: UserDto): Promise<UserDto> {
    const path = serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN") &&
      dto.account.accountName != serviceContainer.sessionService.userName
      ? "/admin/acount"
      : "/app/account";
    return serviceContainer.collectionManagerProxy.putData<UserDto, UserDto>(
      "authentication", path, dto, false
    );
  }
  // #endregion
}
