import { LoginResponseDto } from "../../../../common/dto";
import { LoginRequestDto, RegisterRequestDto } from "../../dto";
import { ApplicationRole } from "../../types";
import { SessionChangeListener } from "../providers";
import { IConfigurationService } from "./configuration.service";
import { IIpcProxyService } from "./ipc-proxy.service";
import { IServiceContainer } from "./service-container";

export interface ISessionService {
  readonly jwt: string | null;
  readonly loggedIn: boolean;
  readonly userName: string | null;
  hasRole(role: ApplicationRole): boolean;
  hasAnyRole(...roles: Array<ApplicationRole>): boolean;
  initialize(ipcProxy: IIpcProxyService, configurationService: IConfigurationService): Promise<void>;
  setSessionData(data: LoginResponseDto | null): void;
  subscribe(listener: SessionChangeListener): () => void;
  login(serviceContainer: IServiceContainer, loginRequest: LoginRequestDto): Promise<LoginResponseDto>;
  logout(serviceContainer: IServiceContainer): Promise<void>;
  register(serviceContainer: IServiceContainer, registerDto: RegisterRequestDto): Promise<void>;
};
