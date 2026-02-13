import { dialog, OpenDialogOptions, SaveDialogOptions } from "electron";
import { inject, injectable } from "tsyringe";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IDialogService, ILogService, IResultFactory, IWindowsService } from "../interface";

@injectable()
export class DialogService extends BaseService implements IDialogService {
  //#region Private fields ----------------------------------------------------
  private readonly windowsService: IWindowsService;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.WindowsService) windowsService: IWindowsService
  ) {
    super(logService, resultFactory);
    this.windowsService = windowsService;
  }
  //#endregion

  //#region IDialogService Members --------------------------------------------
  public async saveAs(purpose: string): Promise<IResult<string>> {
    let options: SaveDialogOptions;
    switch (purpose) {
      case "set-export": {
        options = {
          title: "Save export as",
          filters: [
            { extensions: ["pdf"], name: "Excel (*.xlsx)" },
            { extensions: ["*"], name: "All files (*.*)" }
          ]
        };
        break;
      }
      default: {
        options = {
          title: "Save as",
          filters: [{ extensions: ["*"], name: "All files (*.*)" }]
        };
      }
    }
    const saveAsResult = await dialog.showSaveDialog(this.windowsService.mainWindow, options);
    return saveAsResult.canceled
      ? this.resultFactory.createNoContentResult()
      : this.resultFactory.createSuccessResult(saveAsResult.filePath);
  }

  public async selectFile(purpose: string): Promise<IResult<string>> {
    let options: OpenDialogOptions;
    switch (purpose) {
      case "collection-import": {
        options = {
          title: "Import collection data from ",
          properties: ["openFile"],
          filters: [
            { extensions: ["xlsx"], name: "Excel (*.xlsx)" },
            { extensions: ["*"], name: "All files (*.*)" }
          ]
        };
        break;
      }
      default: {
        options = {
          title: "Open file",
          properties: ["openFile"],
          filters: [{ extensions: ["*"], name: "All files (*.*)" }]
        };
      }
    }
    const openFileResult = await dialog.showOpenDialog(this.windowsService.mainWindow, options);
    return openFileResult.canceled
      ? this.resultFactory.createNoContentResult()
      : this.resultFactory.createSuccessResult(openFileResult.filePaths[0]);
  }
  //#endregion
}
