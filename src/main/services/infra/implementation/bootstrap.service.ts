import { app, dialog, ipcMain, IpcMainInvokeEvent, nativeTheme, protocol } from "electron";
import { homedir } from "os";
import { container, injectable } from "tsyringe";
// import { MigrationDi } from "../../../database/migrations/migrations.di";
// import { ICardRepository } from "../../../database/repo/interfaces";
import { IpcChannel, IpcPaths, IpcRequest } from "../../../../common/ipc";
import { IMtgCollectionClient } from "../../api/interface";
import { IRouter } from "../../base";
import { ICardImageService, ICardSymbolService } from "../../library/interface";
import { API, INFRASTRUCTURE, LIBRARY } from "../../service.tokens";
import { IBootstrapService, IConfigurationService, ILogService, IRouterService, IWindowsService } from "../interface";
import { ProgressCallback } from "../../../../common/ipc";

@injectable()
export class BootstrapService implements IBootstrapService {
  // #region IBootstrapService methods ----------------------------------------
  public async boot(): Promise<void> {
    const windowsService: IWindowsService = container.resolve(INFRASTRUCTURE.WindowsService);
    const configurationService: IConfigurationService = container.resolve(INFRASTRUCTURE.ConfigurationService);
    const logService: ILogService = container.resolve(INFRASTRUCTURE.LogService);

    // --- 1. create the splash window ---
    const splashWindow = windowsService.createSplashWindow();
    const callback: ProgressCallback = (label: string) => splashWindow.webContents.send("splash", label);
    // --- 2. run preboot ---
    await this.preboot(configurationService);
    splashWindow.on("ready-to-show", () => {
      splashWindow.show();
      callback("Running discovery");
      const apiClient = container.resolve<IMtgCollectionClient>(API.ApiClient);
      // --- 3. run discovery ---
      void configurationService.runDiscovery(() => apiClient.discover())
        .then(
          () => {
            if (configurationService.isFirstUsage) {
              // --- 4a. run first usage sequence ---
              splashWindow.webContents.send("splash", "Initializing first time window");
              const firsTimeWindow = windowsService.createFirstTimeWindow();
              firsTimeWindow.on("closed", () => {
                if (configurationService.isFirstUsage) {
                  app.quit();
                } else {
                  splashWindow.show();
                  void this.bootFunction(callback, configurationService, true)
                    .then(() => windowsService.createMainWindow())
                    .catch((reason: Error) => {
                      logService.error("Main", "Error in boot function: " + reason.message, reason);
                      splashWindow.hide();
                      dialog.showErrorBox(`Error:" ${reason.message}`, reason.stack || "");
                      app.exit();
                    });
                }
              });
            } else {
              // --- 4b. run normal sequence ---
              void this.bootFunction(callback, configurationService, false)
                .then(() => windowsService.createMainWindow())
                .catch((reason: Error) => {
                  logService.error("Main", "Error in boot function: " + reason.message, reason);
                  splashWindow.hide();
                  dialog.showErrorBox(`Error:" ${reason.message}`, reason.stack || "");
                  app.exit();
                });
            }
          },
          (reason: Error) => {
            logService.error("Main", "Discovery failed: " + reason.message, reason);
            // LATER we could open a real window (maybe even the main window and show a dialog with a retry capability)
            // same for the dialog.showErrorBox above
            dialog.showErrorBox(`Discovery failed: ${reason.message}`, reason.stack || "");
            app.exit();
          }
        );
    });

    return Promise.resolve();
  }

  public restart(): void {
    if (app.isPackaged) {
      // relaunch does not work when not packaged
      app.relaunch();
    }
    app.exit();
  }
  // #endregion

  // #region helper methods ---------------------------------------------------
  private async preboot(configurationService: IConfigurationService): Promise<void> {
    configurationService.initialize(app.getAppPath(), homedir(), nativeTheme.shouldUseDarkColors);
    const routerService: IRouterService = container.resolve(INFRASTRUCTURE.RouterService);
    container.resolveAll<IRouter>(INFRASTRUCTURE.Router).forEach((svc: IRouter) => svc.setRoutes(routerService));
    routerService.logRoutes();
    this.registerIpcChannel("DELETE", routerService);
    this.registerIpcChannel("GET", routerService);
    this.registerIpcChannel("PATCH", routerService);
    this.registerIpcChannel("POST", routerService);
    this.registerIpcChannel("PUT", routerService);
    protocol.handle(IpcPaths.CACHED_IMAGE, async (request: Request): Promise<Response> => {
      return container
        .resolve<ICardImageService>(LIBRARY.CardImageService)
        .getImage(new URL(request.url));
    });
  }

  private async bootFunction(callback: ProgressCallback, configurationService: IConfigurationService, firstUsage: boolean): Promise<void> {
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
    if (configurationService.preferences.refreshCacheAtStartup || firstUsage) {
      await this.refreshCache(callback);
    }
    callback("Loading main program");
  }

  private registerIpcChannel(channel: IpcChannel, routerService: IRouterService) {
    ipcMain.handle(
      channel,
      (event: IpcMainInvokeEvent, ...args: Array<unknown>) => routerService.routeRequest(channel, event.sender, args[0] as IpcRequest<unknown>)
    );
  }

  private async refreshCache(callback: (label: string) => void): Promise<void> {
    callback("Loading main program - Caching cardsymbols");
    await container.resolve<ICardSymbolService>(LIBRARY.CardSymbolService).cacheImages(callback);
  }
}
