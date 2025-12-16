import { inject, singleton } from "tsyringe";
import { LoginResponseDto } from "../../../../common/dto";
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
    router.registerDeleteRoute(IpcPaths.SESSION, this.deleteSessionData.bind(this) as DeleteRouteCallback);
    router.registerGetRoute(IpcPaths.SESSION, this.getSessionData.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.SESSION, this.setSessionData.bind(this) as RouteCallback);
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
  // #endregion
}
