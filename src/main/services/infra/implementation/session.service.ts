import * as keytar from "keytar";
import { inject, singleton } from "tsyringe";
import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IBootstrapService, ILogService, IResultFactory, ISessionService } from "../interface";

@singleton()
export class SessionService extends BaseService implements ISessionService {
  // #region Private fields ---------------------------------------------------
  private data: LoginResponseDto | null | null;
  private appName: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.BootstrapService) bootstrapService: IBootstrapService
  ) {
    super(logService, resultFactory);
    this.data = null;
    this.appName = bootstrapService.appName;
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
