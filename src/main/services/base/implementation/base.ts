import { ILogService, IResultFactory } from "../../infra/interface";

export abstract class Base {
  //#region protected fields --------------------------------------------------
  protected readonly logService: ILogService;
  protected readonly resultFactory: IResultFactory;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(logService: ILogService, resultFactory: IResultFactory) {
    this.logService = logService;
    this.resultFactory = resultFactory;
  }
  //#endregion
}


