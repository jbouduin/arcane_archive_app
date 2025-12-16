import { LoginResponseDto } from "../../../../common/dto";
import { IResult } from "../../base";

export interface ISessionService {
  deleteSessionData(): Promise<IResult<number>>;
  getSessionData(): Promise<IResult<LoginResponseDto | null>>;
  setSessionData(data: LoginResponseDto): Promise<IResult<void>>;
}
