import { LoginResponseDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { ISessionService } from "../interface/session.service";
import { SessionChangeListener } from "../session-change-listener";

export class SessionService implements ISessionService {
  // #region Private fields ---------------------------------------------------
  private _jwt: string | null;
  private roles: Set<ApplicationRole>;
  private _userName: string | null;
  private listeners: Array<SessionChangeListener>;
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
  }
  // #endregion

  // #region ISessionService Members ------------------------------------------
  public hasRole(role: ApplicationRole): boolean {
    return this.roles.has(role);
  }

  public hasAnyRole(...roles: Array<ApplicationRole>): boolean {
    return roles.some((role: ApplicationRole) => this.roles.has(role));
  }

  public setSessionData(data: LoginResponseDto | null): void {
    if (data != null) {
      this._jwt = data.token;
      const payload = this._jwt.split(".")[1];
      const raw = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
      this.roles = raw["roles"];
      this._userName = raw["sub"];
    } else {
      this._jwt = null;
      this._userName = null;
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
  // #endregion
}
