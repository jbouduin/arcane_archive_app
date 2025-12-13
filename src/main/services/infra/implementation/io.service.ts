import { existsSync, readFileSync } from "fs";
import { BaseService, IResult } from "../../base";
import { IIoService } from "../interface/io.service";
import { ILogService, IResultFactory } from "../interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { inject, injectable } from "tsyringe";
import { dialog } from "electron";

@injectable()
export class IoService extends BaseService implements IIoService {
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

  public async selectDirectory(currentPath: string | null): Promise<IResult<string>> {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
      defaultPath: currentPath || undefined,

    });
    return result.canceled
      ? this.resultFactory.createNoContentResult()
      : this.resultFactory.createSuccessResult(result.filePaths[0]);
  }
  // #endregion
}
