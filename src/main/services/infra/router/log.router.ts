import { inject, singleton } from "tsyringe";
import { LogRequestDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { ILogService, IResultFactory, IRouterService } from "../interface";

@singleton()
export class LogRouter extends BaseRouter implements IRouter {
  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(logService, resultFactory);
  }
  // #endregion

  // #region IRouter Members --------------------------------------------------
  public setRoutes(router: IRouterService): void {
    router.registerPostRoute(IpcPaths.LOG_INFO, this.info.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.LOG_ERROR, this.error.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.LOG_WARNING, this.warning.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.LOG_DEGUG, this.debug.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.LOG_TRACE, this.trace.bind(this) as RouteCallback);
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private info(request: RoutedRequest<LogRequestDto>): Promise<IResult<void>> {
    this.logService.info("Renderer", request.data.message, request.data.args);
    return this.resultFactory.createNoContentResultPromise();
  }

  private error(request: RoutedRequest<LogRequestDto>): Promise<IResult<void>> {
    this.logService.error("Renderer", request.data.message, request.data.args);
    return this.resultFactory.createNoContentResultPromise();
  }

  private warning(request: RoutedRequest<LogRequestDto>): Promise<IResult<void>> {
    this.logService.warning("Renderer", request.data.message, request.data.args);
    return this.resultFactory.createNoContentResultPromise();
  }

  private debug(request: RoutedRequest<LogRequestDto>): Promise<IResult<void>> {
    this.logService.debug("Renderer", request.data.message, request.data.args);
    return this.resultFactory.createNoContentResultPromise();
  }

  private trace(request: RoutedRequest<LogRequestDto>): Promise<IResult<void>> {
    this.logService.info("Renderer", request.data.message, request.data.args);
    return this.resultFactory.createNoContentResultPromise();
  }
  // #endregion
}
