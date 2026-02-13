import { inject, injectable } from "tsyringe";
import { BaseRouter, IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IDialogService, ILogService, IResultFactory, IRouterService } from "../interface";
import { IpcPaths } from "../../../../common/ipc";

@injectable()
export class DialogRouter extends BaseRouter implements IRouter {
  //#region Private fields ----------------------------------------------------
  private readonly dialogService: IDialogService;
  //#region Constructor -------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.DialogService) dialogService: IDialogService
  ) {
    super(logService, resultFactory);
    this.dialogService = dialogService;
  }
  //#endregion

  //#region IRouter Members ---------------------------------------------------
  setRoutes(router: IRouterService): void {
    router.registerGetRoute(IpcPaths.SAVE_AS, this.saveAs.bind(this) as RouteCallback);
    router.registerGetRoute(IpcPaths.SELECT_FILE, this.selectFile.bind(this) as RouteCallback);
  }
  //#endregion

  //#region Routes ------------------------------------------------------------
  private saveAs(request: RoutedRequest<void>): Promise<IResult<string>> {
    return this.dialogService.saveAs(request.queryParams[IpcPaths.SAVE_AS_QUERY_PARAM_PURPOSE]);
  }

  private selectFile(request: RoutedRequest<void>): Promise<IResult<string>> {
    return this.dialogService.selectFile(request.queryParams[IpcPaths.SELECT_FILE_QUERY_PARAM_PURPOSE]);
  }
  //#endregion
}
