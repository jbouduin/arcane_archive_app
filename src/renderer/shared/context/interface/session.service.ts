import { LoginResponseDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { SessionChangeListener } from "../providers";

export interface ISessionService {
  readonly jwt: string | null;
  readonly loggedIn: boolean;
  readonly userName: string | null;
  hasRole(role: ApplicationRole): boolean;
  hasAnyRole(...roles: Array<ApplicationRole>): boolean;
  setSessionData(data: LoginResponseDto | null): void;
  subscribe(listener: SessionChangeListener): () => void;
};
