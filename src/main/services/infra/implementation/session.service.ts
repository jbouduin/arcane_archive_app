import { inject, singleton } from "tsyringe";
import { LoginResponseDto } from "../../../../common/dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { ILogService, IResultFactory, ISessionService } from "../interface";

@singleton()
export class SessionService extends BaseService implements ISessionService {
  // #region Private fields ---------------------------------------------------
  private data: LoginResponseDto | null | null;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(logService, resultFactory);
    this.data = null;
  }
  // #endregion

  // #region ISessionService Members ------------------------------------------
  public deleteSessionData(): Promise<IResult<number>> {
    this.data = null;
    return this.resultFactory.createSuccessResultPromise(1);
  }

  public getSessionData(): Promise<IResult<LoginResponseDto | null>> {
    return this.resultFactory.createSuccessResultPromise(this.data);
  }

  public setSessionData(data: LoginResponseDto): Promise<IResult<void>> {
    this.data = data;
    return this.resultFactory.createNoContentResultPromise();
  }
  // #endregion
}
