import { IResult } from "../../base";

export interface IDialogService {
  /**
   * Opens the save-as dialog.
   */
  saveAs(purpose: string): Promise<IResult<string>>;
  /**
   * Opens the open-file dialog
   */
  selectFile(purpose: string): Promise<IResult<string>>;
}
