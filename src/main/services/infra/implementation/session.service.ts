import * as keytar from "keytar";
import { inject, singleton } from "tsyringe";
import { LoginRequestDto, SessionDto } from "../../../../common/dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IApplicationService, ILogService, IResultFactory, ISessionService } from "../interface";

// const keytar = require("keytar");
@singleton()
export class SessionService extends BaseService implements ISessionService {
  // #region Private fields ---------------------------------------------------
  private applicationService: IApplicationService;
  private session: SessionDto | null;
  private appName: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.ApplicationService) applicationService: IApplicationService
  ) {
    super(logService, resultFactory);
    this.applicationService = applicationService;
    this.session = null;
    this.appName = applicationService.applicationName;
  }
  // #endregion

  // #region ISessionService Members ------------------------------------------
  public deleteSessionData(): Promise<IResult<number>> {
    return this.applicationService
      .deleteSessionCookie()
      .then(() => {
        this.session = null;
        return this.resultFactory.createSuccessResult(1);
      });
  }

  public getSessionData(): Promise<IResult<SessionDto | null>> {
    return this.applicationService
      .restoreSessionCookie()
      .then(() => this.resultFactory.createSuccessResultPromise(this.session));
  }

  public setSessionData(data: SessionDto): Promise<IResult<void>> {
    return this.applicationService
      .saveSessionCookie()
      .then(() => {
        this.session = data;
        return this.resultFactory.createNoContentResult();
      });
  }

  public async getStoredUserNames(): Promise<IResult<Array<string>>> {
    const userNames = await keytar
      .findCredentials(this.appName)
      .then(
        (credentials: Array<{ account: string; password: string; }>) =>
          credentials.map((credential: { account: string; password: string; }) => credential.account),
        () => new Array<string>()
      );
    return this.resultFactory.createSuccessResult(userNames);
  }

  public async getPassword(userName: string): Promise<IResult<string | null>> {
    const password = await keytar.getPassword(this.appName, userName);
    return this.resultFactory.createSuccessResult(password);
  }

  public deleteCredentials(userName: string): Promise<IResult<number>> {
    return keytar
      .deletePassword(this.appName, userName)
      .then(
        (success: boolean) => success
          ? this.resultFactory.createSuccessResult(1)
          : this.resultFactory.createErrorResult<number>("Could not delete credential"),
        () => this.resultFactory.createErrorResult<number>("Could not delete credential")
      );
  }

  public async saveCredentials(credentials: LoginRequestDto): Promise<IResult<void>> {
    return keytar
      .setPassword(this.appName, credentials.user, credentials.password)
      .then(
        () => this.resultFactory.createNoContentResult(),
        () => this.resultFactory.createErrorResult<void>("Could not save credentials")
      );
  }
  // #endregion
}
