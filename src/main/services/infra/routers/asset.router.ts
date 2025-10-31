import { inject, singleton } from "tsyringe";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { ILogService, IResultFactory, IRouterService } from "../interface";
import { IAssetService } from "../interface/asset.service";

@singleton()
export class AssetRouter extends BaseRouter implements IRouter {
  // #region private fields ---------------------------------------------------
  private readonly assetService: IAssetService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.AssetService) assetService: IAssetService
  ) {
    super(logService, resultFactory);
    this.assetService = assetService;
  }
  // #endregion

  // #region IRouteDestinationService methods ---------------------------------
  public setRoutes(router: IRouterService): void {
    router.registerGetRoute("/asset", this.asset.bind(this) as RouteCallback);
  }
  // #endregion

  // #region private methods --------------------------------------------------
  public asset(request: RoutedRequest<void>): Promise<IResult<string>> {
    return this.assetService.getAsset(request.queryParams["path"]);
  }
  // #endregion
}
