import { ILogService, IResultFactory } from "../../infra/interface";
import { Base } from "./base";

export abstract class BaseService extends Base {
  //#region Constructor & C° --------------------------------------------------
  public constructor(logService: ILogService, resultFactory: IResultFactory) {
    super(logService, resultFactory);
  }
  //#endregion
}