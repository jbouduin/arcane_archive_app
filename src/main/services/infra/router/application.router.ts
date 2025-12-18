import { inject, singleton } from "tsyringe";
import { IpcPaths } from "../../../../common/ipc";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IBootstrapService, ILogService, IResultFactory, IRouterService } from "../interface";

@singleton()
export class ApplicationRouter extends BaseRouter implements IRouter {
  // #region private fields ---------------------------------------------------
  private readonly bootstrapService: IBootstrapService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.BootstrapService) bootstrapService: IBootstrapService
  ) {
    super(logService, resultFactory);
    this.bootstrapService = bootstrapService;
  }
  // #endregion

  // #region IRouteDestinationService methods ---------------------------------
  public setRoutes(router: IRouterService): void {
    router.registerPostRoute(IpcPaths.RESTART, this.restart.bind(this) as RouteCallback);
  }
  // #endregion

  // #region private methods --------------------------------------------------
  public restart(_request: RoutedRequest<void>): Promise<IResult<void>> {
    this.bootstrapService.restart();
    return this.resultFactory.createNoContentResultPromise();
  }
  // #endregion
}
