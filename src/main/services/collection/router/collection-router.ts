import { inject, singleton } from "tsyringe";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { ILogService, IResultFactory, IRouterService } from "../../infra/interface";
import { ICollectionService } from "../interface";
import { COLLECTION, INFRASTRUCTURE } from "../../service.tokens";
import { IpcPaths } from "../../../../common/ipc";
import { ImportCollectionDataDto } from "../../../../common/dto/collection";

@singleton()
export class CollectionRouter extends BaseRouter implements IRouter {
  //#region Private fields ----------------------------------------------------
  private readonly collectionService: ICollectionService;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(COLLECTION.CollectionService) collectionService: ICollectionService
  ) {
    super(logService, resultFactory);
    this.collectionService = collectionService;
  }
  //#endregion

  //#region IRouter Members ---------------------------------------------------
  public setRoutes(router: IRouterService): void {
    router.registerPostRoute(IpcPaths.IMPORT_COLLECTION_DATA, this.importCollectionData.bind(this) as RouteCallback);
  }
  //#endregion

  //#region Routing methods ---------------------------------------------------
  private importCollectionData(request: RoutedRequest<ImportCollectionDataDto>): Promise<IResult<object>> {
    return this.collectionService.importCollectionData(request.data);
  }
  //#endregion
}
