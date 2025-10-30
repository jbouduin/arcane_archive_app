import { ILogService, IResultFactory } from "../../infra/interface";
import { IResult } from "../interface";
import { Base } from "./base";

export abstract class BaseRouter extends Base {
  //#region Constructor & C° --------------------------------------------------
  public constructor(logService: ILogService, resultFactory: IResultFactory) {
    super(logService, resultFactory);
  }
  //#endregion

  //#region protected methods -------------------------------------------------
  protected parseIntegerUrlParameter(id: string, parameterName: string): IResult<number> {
    const number = Number.parseInt(id);
    return isNaN(number)
      ? this.resultFactory.createBadRequestResult(`Invalid ${parameterName} '${id}'`)
      : this.resultFactory.createSuccessResult(number);
  }
  //#endregion
}