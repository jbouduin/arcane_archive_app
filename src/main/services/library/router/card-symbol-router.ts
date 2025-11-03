import { inject, singleton } from "tsyringe";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { ILogService, IResultFactory, IRouterService } from "../../infra/interface";
import { INFRASTRUCTURE, LIBRARY } from "../../service.tokens";
import { ICardSymbolService } from "../interface/card-symbol.service";

@singleton()
export class CardSymbolRouter extends BaseRouter implements IRouter {
  // #region private fields ---------------------------------------------------
  private readonly cardSymbolService: ICardSymbolService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(LIBRARY.CardSymbolService) cardSymbolService: ICardSymbolService
  ) {
    super(logService, resultFactory);
    this.cardSymbolService = cardSymbolService;
  }
  // #endregion

  // #region IRouteDestinationService methods ---------------------------------
  public setRoutes(router: IRouterService): void {
    router.registerGetRoute("/card-symbol/svg", this.getCardSymbolSvg.bind(this) as RouteCallback);
  }
  // #endregion

  // #region private methods --------------------------------------------------
  public getCardSymbolSvg(_request: RoutedRequest<void>): Promise<IResult<Map<string, string>>> {
    return this.cardSymbolService.getCardSymbolSvg();
  }
  // #endregion
}
