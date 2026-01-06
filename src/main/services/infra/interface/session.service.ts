import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { IResult } from "../../base";

export interface ISessionService {
  deleteSessionData(): Promise<IResult<number>>;
  getSessionData(): Promise<IResult<LoginResponseDto | null>>;
  setSessionData(data: LoginResponseDto): Promise<IResult<void>>;
  getStoredUserNames(): Promise<IResult<Array<string>>>;
  getPassword(userName: string): Promise<IResult<string | null>>;
  deleteCredentials(userName: string): Promise<IResult<number>>;
  saveCredentials(credentials: LoginRequestDto): Promise<IResult<void>>;
}
