import { inject, singleton } from "tsyringe";
import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { DeleteRouteCallback, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IRouterService, ISessionService } from "../interface";

@singleton()
export class SessionRouter implements IRouter {
  // #region Private fields ---------------------------------------------------
  private readonly sessionService: ISessionService;
  // #endregion

  // #region Constructor & C° -------------------------------------------------
  public constructor(@inject(INFRASTRUCTURE.SessionService) sessionService: ISessionService) {
    this.sessionService = sessionService;
  }

  // #region IRouter Members --------------------------------------------------
  setRoutes(router: IRouterService): void {
    router.registerDeleteRoute(`${IpcPaths.CREDENTIAL}/:username`, this.deleteStoredCredential.bind(this) as DeleteRouteCallback);
    router.registerDeleteRoute(IpcPaths.SESSION, this.deleteSessionData.bind(this) as DeleteRouteCallback);
    router.registerGetRoute(IpcPaths.CREDENTIAL, this.getStoredUserNames.bind(this) as RouteCallback);
    router.registerGetRoute(`${IpcPaths.CREDENTIAL}/:username`, this.getPassword.bind(this) as RouteCallback);
    router.registerGetRoute(IpcPaths.SESSION, this.getSessionData.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.SESSION, this.setSessionData.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.CREDENTIAL, this.saveCredentials.bind(this) as RouteCallback);
  }
  // #endregion

  // #region Route Callbacks --------------------------------------------------
  private deleteSessionData(_request: RoutedRequest<void>): Promise<IResult<number>> {
    return this.sessionService.deleteSessionData();
  }

  private getSessionData(_request: RoutedRequest<void>): Promise<IResult<LoginResponseDto | null>> {
    return this.sessionService.getSessionData();
  }

  private setSessionData(request: RoutedRequest<LoginResponseDto>): Promise<IResult<void>> {
    return this.sessionService.setSessionData(request.data);
  }

  private saveCredentials(request: RoutedRequest<LoginRequestDto>): Promise<IResult<void>> {
    return this.sessionService.saveCredentials(request.data);
  }

  private getPassword(request: RoutedRequest<void>): Promise<IResult<string | null>> {
    const userName = request.params["username"];
    return this.sessionService.getPassword(userName);
  }

  private getStoredUserNames(_request: RoutedRequest<void>): Promise<IResult<Array<string>>> {
    return this.sessionService.getStoredUserNames();
  }

  private deleteStoredCredential(request: RoutedRequest<void>): Promise<IResult<number>> {
    const userName = request.params["username"];
    return this.sessionService.deleteCredentials(userName);
  }
  // #endregion
}
