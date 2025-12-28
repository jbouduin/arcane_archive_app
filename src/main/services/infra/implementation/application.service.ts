import { app, dialog, ipcMain, IpcMainInvokeEvent, nativeTheme, protocol } from "electron";
import { MigrationProvider } from "kysely";
import { container, injectable } from "tsyringe";
import { IpcChannel, IpcPaths, IpcRequest, ProgressCallback } from "../../../../common/ipc";
import { IMtgCollectionClient } from "../../api/interface";
import { IRouter } from "../../base";
import { IDatabaseService } from "../../database/interface";
import { MigrationDi } from "../../database/migration/migration.di";
import { ICardImageService, ICardSymbolService } from "../../library/interface";
import { API, DATABASE, INFRASTRUCTURE, LIBRARY } from "../../service.tokens";
import { IApplicationService, IConfigurationService, ILogService, IRouterService, IWindowsService } from "../interface";

@injectable()
export class ApplicationService implements IApplicationService {
  // #region IBootstrapService methods ----------------------------------------
  public get applicationName(): string {
    return app.getName();
  }

  /**
   * Boot sequence:
   * - create splash window
   * - run pre-boot sequence
   * - run discovery
   * - if applicable: run first usage sequence. After closing first usage window, calls the boot sequence.
   * - otherwise: run boot sequence
   */
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
                  void this.bootFunction(callback, true)
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
              // --- 4b. run boot sequnce sequence ---
              void this.bootFunction(callback, configurationService.preferences.refreshCacheAtStartup)
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
  /**
   * Preboot sequence:
   * - read configuration and preferences from the application directory. If not found, the first usage flag remains set.
   * - register the IPC channels
   * - set handler for cached images
   * @param configurationService the configuration service
   */
  private async preboot(configurationService: IConfigurationService): Promise<void> {
    configurationService.initialize(nativeTheme.shouldUseDarkColors);
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

  /**
   *
   * @param callback the callback function, which will set the contents of the splash screen
   * @param configurationService the, already initialized, configuration service
   * @param firstUsage
   */
  private async bootFunction(callback: ProgressCallback, refreshCache: boolean): Promise<void> {
    callback("Initializing");

    const migrationContainer = MigrationDi.registerMigrations();
    await container.resolve<IDatabaseService>(DATABASE.DatabaseService)
      .migrateToLatest(
        migrationContainer.resolve<MigrationProvider>(DATABASE.CustomMigrationProvider),
        callback
      )
      .then((service: IDatabaseService) => service.connect())
      .then(() => migrationContainer.dispose());

    if (refreshCache) {
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
