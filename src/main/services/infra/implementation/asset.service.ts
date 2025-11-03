import { existsSync, readFileSync } from "fs";
import { BaseService, IResult } from "../../base";
import { IAssetService } from "../interface/asset.service";
import { ILogService, IResultFactory } from "../interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { inject, injectable } from "tsyringe";

@injectable()
export class AssetService extends BaseService implements IAssetService {
  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(logService, resultFactory);
  }
  // #endregion

  // #region IAssetService Members --------------------------------------------
  public async getAsset(path: string): Promise<IResult<string>> {
    if (existsSync(path)) {
      try {
        return this.resultFactory.createSuccessResultPromise<string>(readFileSync(path, { encoding: "utf-8" }));
      } catch (err) {
        return this.resultFactory.createExceptionResultPromise<string>(err);
      }
    } else {
      return this.resultFactory.createNotFoundResultPromise<string>(path);
    }
  }
  // #endregion
}
