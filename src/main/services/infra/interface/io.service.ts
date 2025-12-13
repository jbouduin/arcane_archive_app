import { IResult } from "../../base";

export interface IIoService {
  getAsset(path: string): Promise<IResult<string>>;
  selectDirectory(currentDirectory: string | null): Promise<IResult<string>>;
}
