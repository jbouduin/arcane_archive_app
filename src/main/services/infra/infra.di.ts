import { Lifecycle, container } from "tsyringe";
import { BootstrapService } from "./implementation/bootstrap.service";
import { IBootstrapService, IConfigurationService, ILogService, IResultFactory, IRouterService, IWindowsService } from "./interface";
import { INFRASTRUCTURE } from "../service.tokens";
import { LogService } from "./implementation/log.service";
import { WindowsService } from "./implementation/windows.service";
import { ConfigurationRouter } from "./routers/configuration.router";
import { IRouter } from "../base";
import { ResultFactory } from "./implementation/result.factory";
import { RouterService } from "./implementation/router.service";
import { ConfigurationService } from "./implementation/configuration.service";

export class InfraDi {
  public static register() {    
    container.register<IBootstrapService>(INFRASTRUCTURE.BootstrapService, {useClass: BootstrapService});
    container.register<IConfigurationService>(INFRASTRUCTURE.ConfigurationService, {useClass: ConfigurationService}, {lifecycle: Lifecycle.Singleton});
    container.register<ILogService>(INFRASTRUCTURE.LogService, { useClass: LogService }, { lifecycle: Lifecycle.Singleton });
    container.register<IResultFactory>(INFRASTRUCTURE.ResultFactory, { useClass: ResultFactory }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouterService>(INFRASTRUCTURE.RouterService, { useClass: RouterService }, { lifecycle: Lifecycle.Singleton });
    container.register<IWindowsService>(INFRASTRUCTURE.WindowsService, { useClass: WindowsService }, { lifecycle: Lifecycle.Singleton });

    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: ConfigurationRouter }, { lifecycle: Lifecycle.Singleton });
  }
}