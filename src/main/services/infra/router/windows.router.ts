import { inject, singleton } from "tsyringe";
import { IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IRouterService, IWindowsService } from "../interface";
import { IpcPaths } from "../../../../common/ipc";

@singleton()
export class WindowsRouter implements IRouter {
  // #region Private fields ---------------------------------------------------
  private readonly windowsService: IWindowsService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(@inject(INFRASTRUCTURE.WindowsService) windowsService: IWindowsService) {
    this.windowsService = windowsService;
  }
  // #endregion

  // #region IRouter Members --------------------------------------------------
  setRoutes(router: IRouterService): void {
    router.registerPostRoute(IpcPaths.MAIN_WINDOW_SHOW, this.showMainWindow.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.SPLASH_WINDOW_HIDE, this.hideSplashWindow.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.SPLASH_WINDOW_SHOW, this.showSplashWindow.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.FIRST_TIME_WINDOW_SHOW, this.showFirstTimeWindow.bind(this) as RouteCallback);
  }
  // #endregion

  // #region Route Callbacks --------------------------------------------------
  private showMainWindow(_request: RoutedRequest<void>): Promise<IResult<void>> {
    return this.windowsService.showMainWindow();
  }

  private showSplashWindow(_request: RoutedRequest<void>): Promise<IResult<void>> {
    return this.windowsService.showSplashWindow();
  }

  private showFirstTimeWindow(_request: RoutedRequest<void>): Promise<IResult<void>> {
    return this.windowsService.showFirstTimeWindow();
  }

  private hideSplashWindow(_request: RoutedRequest<void>): Promise<IResult<void>> {
    return this.windowsService.hideSplashWindow();
  }
  // #endregion
}
