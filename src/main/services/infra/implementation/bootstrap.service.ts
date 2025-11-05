import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent, nativeTheme, protocol } from "electron";
import { homedir } from "os";
import { container, injectable } from "tsyringe";
// import { IpcChannel } from "../../../../common/ipc";
// import { MigrationDi } from "../../../database/migrations/migrations.di";
// import { ICardRepository } from "../../../database/repo/interfaces";
import { IpcChannel, IpcRequest } from "../../../../common/ipc";
import { IRouter } from "../../base";
import { INFRASTRUCTURE, LIBRARY } from "../../service.tokens";
import { IBootstrapService, IConfigurationService, ILogService, IRouterService, IWindowsService } from "../interface";
import { ICardImageService, ICardSymbolService } from "../../library/interface";
import { DataConfigurationDto } from "../../../../common/dto";

@injectable()
export class BootstrapService implements IBootstrapService {
  // #region IBootstrapService methods ----------------------------------------
  public async boot(): Promise<void> {
    const windowsService: IWindowsService = container.resolve(INFRASTRUCTURE.WindowsService);
    const rootRouterService: IRouterService = container.resolve(INFRASTRUCTURE.RouterService);
    const configurationService: IConfigurationService = container.resolve(INFRASTRUCTURE.ConfigurationService);
    const logService: ILogService = container.resolve(INFRASTRUCTURE.LogService);

    ipcMain.handle("show-main-window", () => {
      windowsService.mainWindow.show();
      if (!splashWindow.isDestroyed()) {
        splashWindow.close();
      }
    });

    const splashWindow = windowsService.createSplashWindow();
    await this.preboot(configurationService, rootRouterService);
    splashWindow.on("show", () => {
      void this.bootFunction(splashWindow, configurationService.configuration.dataConfiguration)
        .then(() => windowsService.createMainWindow())
        .catch((reason: Error) => {
          logService.error("Main", "Error in boot function: " + reason.message, reason);
          splashWindow.hide();
          dialog.showErrorBox(`Error:" ${reason.message}`, reason.stack || "");
          app.exit();
        });
    });

    void splashWindow.on("ready-to-show", () => {
      if (configurationService.isFirstUsage) {
        const firsTimeWindow = windowsService.createFirstTimeWindow();
        firsTimeWindow.on("closed", () => {
          if (configurationService.isFirstUsage) {
            app.quit();
          } else {
            splashWindow.show();
          }
        });
      } else {
        splashWindow.show();
      }
    });
    return Promise.resolve();
  }
  // #endregion

  // #region helper methods ---------------------------------------------------
  private async preboot(configurationService: IConfigurationService, routerService: IRouterService): Promise<void> {
    configurationService.loadSettings(app.getAppPath(), homedir(), nativeTheme.shouldUseDarkColors);
    container.resolveAll<IRouter>(INFRASTRUCTURE.Router).forEach((svc: IRouter) => svc.setRoutes(routerService));
    routerService.logRoutes();
    this.registerIpcChannel("DELETE", routerService);
    this.registerIpcChannel("GET", routerService);
    this.registerIpcChannel("PATCH", routerService);
    this.registerIpcChannel("POST", routerService);
    this.registerIpcChannel("PUT", routerService);
    protocol.handle("cached-image", async (request: Request): Promise<Response> => {
      return container
        .resolve<ICardImageService>(LIBRARY.CardImageService)
        .getImage(new URL(request.url));
    });

    return Promise.resolve();
  }

  private async bootFunction(splashWindow: BrowserWindow, dataConfiguration: DataConfigurationDto): Promise<void> {
    const callback = (label: string) => splashWindow.webContents.send("splash", label);
    callback("Initializing");
    // const migrationContainer = MigrationDi.registerMigrations();
    // await container.resolve<IDatabaseService>(INFRASTRUCTURE.DatabaseService)
    //   .migrateToLatest(
    //     migrationContainer.resolve<MigrationProvider>(DATABASE.CustomMigrationProvider),
    //     (label: string) => splashWindow.webContents.send("splash", label)
    //   )
    //   .then((service: IDatabaseService) => service.connect())
    //   .then(() => migrationContainer.dispose())
    //   .then(() => {
    //     const configurationService = container.resolve<IConfigurationService>(INFRASTRUCTURE.ConfigurationService);
    //     const syncParam = configurationService.isFirstUsage
    //       ? this.firstUseSyncParam()
    //       : configurationService.configuration.syncAtStartupConfiguration;
    //     return container
    //       .resolve<IMtgSyncService>(MTG.SyncService)
    //       .synchronize(syncParam, splashWindow.webContents);
    //   })
    //   .then(() => splashWindow.webContents.send("splash", "loading main program"));
    if (dataConfiguration.refreshCacheAtStartup) {
      callback("Caching cardsymbols");
      await container.resolve<ICardSymbolService>(LIBRARY.CardSymbolService).cacheImages(callback);
    }
    callback("Loading main program");
  }

  private registerIpcChannel(channel: IpcChannel, routerService: IRouterService) {
    ipcMain.handle(
      channel,
      (event: IpcMainInvokeEvent, ...args: Array<unknown>) => routerService.routeRequest(channel, event.sender, args[0] as IpcRequest<unknown>)
    );
  }
}
