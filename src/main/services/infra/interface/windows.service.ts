import { BrowserWindow } from "electron";
import { IResult } from "../../base";

export interface IWindowsService {
  readonly mainWindow: BrowserWindow;
  createFirstTimeWindow(): BrowserWindow;
  createMainWindow(): BrowserWindow;
  createSplashWindow(): BrowserWindow;
  getDeckWindow(deckId: number): void;
  showMainWindow(): Promise<IResult<void>>;
  hideSplashWindow(): Promise<IResult<void>>;
  showSplashWindow(): Promise<IResult<void>>;
  showFirstTimeWindow(): Promise<IResult<void>>;
}
