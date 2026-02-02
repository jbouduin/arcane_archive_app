import { ResultDto } from "../../../../common/dto";
import { ArcaneArchiveServer } from "../../../../common/types";
import { DiscoveryDto } from "../../../dto";

export interface IArcaneArchiveClient {
  getData<Res extends object>(server: ArcaneArchiveServer, path: string): Promise<ResultDto<Res>>;
  postData<Req extends object, Res extends object>(
    server: ArcaneArchiveServer, path: string, data: Req
  ): Promise<ResultDto<Res>>;
  postMultiPart<Res extends object>(
    server: ArcaneArchiveServer, serverPath: string, filePath: string
  ): Promise<ResultDto<Res>>;
  discover(): Promise<ResultDto<DiscoveryDto>>;
};
