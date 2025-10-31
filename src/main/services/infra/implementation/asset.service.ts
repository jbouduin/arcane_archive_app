import { existsSync, readFileSync } from "fs";
import { IResult } from "../../base";
import { IAssetService } from "../interface/asset.service";
import { IResultFactory } from "../interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { inject, injectable } from "tsyringe";

@injectable()
export class AssetService implements IAssetService {
  // #region private fields ---------------------------------------------------
  private readonly resultFactory: IResultFactory;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    this.resultFactory = resultFactory;
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
