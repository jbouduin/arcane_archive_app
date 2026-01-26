import { LoginRequestDto, SessionDto } from "../../../../common/dto";
import { IResult } from "../../base";

export interface ISessionService {
  deleteSessionData(): Promise<IResult<number>>;
  getSessionData(): Promise<IResult<SessionDto | null>>;
  setSessionData(data: SessionDto): Promise<IResult<void>>;
  getStoredUserNames(): Promise<IResult<Array<string>>>;
  getPassword(userName: string): Promise<IResult<string | null>>;
  deleteCredentials(userName: string): Promise<IResult<number>>;
  saveCredentials(credentials: LoginRequestDto): Promise<IResult<void>>;
}
