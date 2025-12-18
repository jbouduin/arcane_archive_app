import { Lifecycle, container } from "tsyringe";
import { IRouter } from "../base";
import { INFRASTRUCTURE } from "../service.tokens";
import { BootstrapService } from "./implementation/bootstrap.service";
import { ConfigurationService } from "./implementation/configuration.service";
import { IoService } from "./implementation/io.service";
import { LogService } from "./implementation/log.service";
import { ResultFactory } from "./implementation/result.factory";
import { RouterService } from "./implementation/router.service";
import { SessionService } from "./implementation/session.service";
import { WindowsService } from "./implementation/windows.service";
import {
  IBootstrapService, IConfigurationService, IIoService, ILogService, IResultFactory, IRouterService,
  ISessionService, IWindowsService
} from "./interface";
import { ApplicationRouter, ConfigurationRouter, IoRouter, SessionRouter, WindowsRouter } from "./router";

export class InfraDi {
  public static register(): void {
    // #region Services -------------------------------------------------------
    container.register<IIoService>(INFRASTRUCTURE.IoService, { useClass: IoService }, { lifecycle: Lifecycle.Singleton });
    container.register<IBootstrapService>(INFRASTRUCTURE.BootstrapService, { useClass: BootstrapService });
    container.register<IConfigurationService>(INFRASTRUCTURE.ConfigurationService, { useClass: ConfigurationService }, { lifecycle: Lifecycle.Singleton });
    container.register<ILogService>(INFRASTRUCTURE.LogService, { useClass: LogService }, { lifecycle: Lifecycle.Singleton });
    container.register<IResultFactory>(INFRASTRUCTURE.ResultFactory, { useClass: ResultFactory }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouterService>(INFRASTRUCTURE.RouterService, { useClass: RouterService }, { lifecycle: Lifecycle.Singleton });
    container.register<ISessionService>(INFRASTRUCTURE.SessionService, { useClass: SessionService }, { lifecycle: Lifecycle.Singleton });
    container.register<IWindowsService>(INFRASTRUCTURE.WindowsService, { useClass: WindowsService }, { lifecycle: Lifecycle.Singleton });
    // #endregion

    // #region Routers --------------------------------------------------------
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: ApplicationRouter }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: IoRouter }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: ConfigurationRouter }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: SessionRouter }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: WindowsRouter }, { lifecycle: Lifecycle.Singleton });
    // #endregion
  }
}
