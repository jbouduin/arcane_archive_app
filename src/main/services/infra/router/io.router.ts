import { inject, singleton } from "tsyringe";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { ILogService, IResultFactory, IRouterService } from "../interface";
import { IIoService } from "../interface/io.service";

@singleton()
export class IoRouter extends BaseRouter implements IRouter {
  // #region private fields ---------------------------------------------------
  private readonly ioService: IIoService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.IoService) ioService: IIoService
  ) {
    super(logService, resultFactory);
    this.ioService = ioService;
  }
  // #endregion

  // #region IRouteDestinationService methods ---------------------------------
  public setRoutes(router: IRouterService): void {
    router.registerGetRoute("/asset", this.asset.bind(this) as RouteCallback);
    router.registerGetRoute("/select-directory", this.selectDirectory.bind(this) as RouteCallback);
    router.registerGetRoute("/select-directory/:current", this.selectDirectory.bind(this) as RouteCallback);
  }
  // #endregion

  // #region private methods --------------------------------------------------
  public asset(request: RoutedRequest<void>): Promise<IResult<string>> {
    return this.ioService.getAsset(request.queryParams["path"]);
  }

  public selectDirectory(request: RoutedRequest<void>): Promise<IResult<string>> {
    const currentPath = request.params["current"] ? decodeURIComponent(request.params["current"]) : null;
    return this.ioService.selectDirectory(currentPath);
  }
  // #endregion
}
