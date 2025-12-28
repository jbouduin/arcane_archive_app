import { inject, singleton } from "tsyringe";
import { IpcPaths } from "../../../../common/ipc";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { ILogService, IResultFactory, IRouterService } from "../../infra/interface";
import { INFRASTRUCTURE, LIBRARY } from "../../service.tokens";
import { ICardSymbolService } from "../interface";

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
    router.registerGetRoute(IpcPaths.CARD_SYMBOL_SVG, this.getCardSymbolSvg.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.CARD_SYMBOL_REFRESH, this.refreshCardSymbols.bind(this) as RouteCallback);
  }
  // #endregion

  // #region private methods --------------------------------------------------
  private getCardSymbolSvg(_request: RoutedRequest<void>): Promise<IResult<Map<string, string>>> {
    return this.cardSymbolService.getCardSymbolSvg();
  }

  private async refreshCardSymbols(_request: RoutedRequest<void>): Promise<IResult<void>> {
    const callBack = (s: string) => _request.sender.send("splash", s);
    await this.cardSymbolService.cacheImages(callBack);
    return this.resultFactory.createNoContentResultPromise();
  }
  // #endregion
}
