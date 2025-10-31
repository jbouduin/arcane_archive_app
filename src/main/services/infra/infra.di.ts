import { Lifecycle, container } from "tsyringe";
import { IRouter } from "../base";
import { INFRASTRUCTURE } from "../service.tokens";
import { AssetService } from "./implementation/asset.service";
import { BootstrapService } from "./implementation/bootstrap.service";
import { ConfigurationService } from "./implementation/configuration.service";
import { LogService } from "./implementation/log.service";
import { ResultFactory } from "./implementation/result.factory";
import { RouterService } from "./implementation/router.service";
import { WindowsService } from "./implementation/windows.service";
import { IBootstrapService, IConfigurationService, ILogService, IResultFactory, IRouterService, IWindowsService } from "./interface";
import { IAssetService } from "./interface/asset.service";
import { AssetRouter, ConfigurationRouter } from "./routers";

export class InfraDi {
  public static register() {
    //#region Services --------------------------------------------------------
    container.register<IAssetService>(INFRASTRUCTURE.AssetService, { useClass: AssetService }, { lifecycle: Lifecycle.Singleton });
    container.register<IBootstrapService>(INFRASTRUCTURE.BootstrapService, { useClass: BootstrapService });
    container.register<IConfigurationService>(INFRASTRUCTURE.ConfigurationService, { useClass: ConfigurationService }, { lifecycle: Lifecycle.Singleton });
    container.register<ILogService>(INFRASTRUCTURE.LogService, { useClass: LogService }, { lifecycle: Lifecycle.Singleton });
    container.register<IResultFactory>(INFRASTRUCTURE.ResultFactory, { useClass: ResultFactory }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouterService>(INFRASTRUCTURE.RouterService, { useClass: RouterService }, { lifecycle: Lifecycle.Singleton });
    container.register<IWindowsService>(INFRASTRUCTURE.WindowsService, { useClass: WindowsService }, { lifecycle: Lifecycle.Singleton });
    //#endregion

    //#region Routers ---------------------------------------------------------
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: AssetRouter }, { lifecycle: Lifecycle.Singleton });
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: ConfigurationRouter }, { lifecycle: Lifecycle.Singleton });
    //#endregion
  }
}