import * as keytar from "keytar";
import { inject, singleton } from "tsyringe";
import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IApplicationService, ILogService, IResultFactory, ISessionService } from "../interface";

// const keytar = require("keytar");
@singleton()
export class SessionService extends BaseService implements ISessionService {
  // #region Private fields ---------------------------------------------------
  private applicationService: IApplicationService;
  private data: LoginResponseDto | null | null;
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
    this.data = null;
    this.appName = applicationService.applicationName;
  }
  // #endregion

  // #region ISessionService Members ------------------------------------------
  public deleteSessionData(): Promise<IResult<number>> {
    return this.applicationService
      .deleteSessionCookie()
      .then(() => {
        this.data = null;
        return this.resultFactory.createSuccessResult(1);
      });
  }

  public getSessionData(): Promise<IResult<LoginResponseDto | null>> {
    return this.applicationService
      .restoreSessionCookie()
      .then(() => this.resultFactory.createSuccessResultPromise(this.data));
  }

  public setSessionData(data: LoginResponseDto): Promise<IResult<void>> {
    return this.applicationService
      .saveSessionCookie()
      .then(() => {
        this.data = data;
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
