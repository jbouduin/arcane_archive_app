import { inject, injectable } from "tsyringe";
import { ImportCollectionRequest } from "../../../../common/dto";
import { IArcaneArchiveClient } from "../../api/interface";
import { BaseService, IResult } from "../../base";
import { ILogService, IResultFactory } from "../../infra/interface";
import { API, INFRASTRUCTURE } from "../../service.tokens";
import { ICollectionService } from "../interface";

@injectable()
export class CollectionService extends BaseService implements ICollectionService {
  //#region Private fields ----------------------------------------------------
  private readonly arcaneArchiveClient: IArcaneArchiveClient;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(API.ArcaneArchiveClient) arcaneArchiveClient: IArcaneArchiveClient
  ) {
    super(logService, resultFactory);
    this.arcaneArchiveClient = arcaneArchiveClient;
  }
  //#endregion

  //#region ICollectionService Members ----------------------------------------
  public async importCollectionData(importCollectionRequest: ImportCollectionRequest): Promise<IResult<object>> {
    const postResult = await this.arcaneArchiveClient.postMultiPart(
      "collection", "/auth/collection/import", importCollectionRequest.fileName
    );
    return this.resultFactory.createSuccessResult(postResult.data);
  }
  //#endregion
}
