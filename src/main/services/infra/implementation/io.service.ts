import { app, dialog } from "electron";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { dirname, join } from "path";
import { inject, injectable } from "tsyringe";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IIoService, ILogService, IResultFactory } from "../interface";

@injectable()
export class IoService extends BaseService implements IIoService {
  private systemSettingsFileFullPath!: string;
  private preferencesFileFullPath!: string;
  private _defaultCacheDirectory!: string;
  private _defaultDataDirectory!: string;
  private _defaultLogDirectory!: string;

  // #region Getters/Setters --------------------------------------------------
  public get defaultCacheDirectory(): string {
    return this._defaultCacheDirectory;
  }

  public get defaultDataDirectory(): string {
    return this._defaultDataDirectory;
  }

  public get defaultLogDirectory(): string {
    return this._defaultLogDirectory;
  }

  // #region Constructor ------------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(logService, resultFactory);
    this.setPaths();
  }
  // #endregion

  // #region IAssetService Members --------------------------------------------
  public createDirectoryIfNotExists(directory: string): void {
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
  }

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

  public readSystemSettings<T>(): T | null {
    if (existsSync(this.systemSettingsFileFullPath)) {
      return JSON.parse(readFileSync(this.systemSettingsFileFullPath, "utf-8")) as T;
    } else {
      return null;
    }
  }

  public readPreferences<T>(): T | null {
    if (existsSync(this.preferencesFileFullPath)) {
      return JSON.parse(readFileSync(this.preferencesFileFullPath, "utf-8")) as T;
    } else {
      return null;
    }
  }

  public saveSystemSettings<T>(configuration: T): void {
    this.createDirectoryIfNotExists(dirname(this.systemSettingsFileFullPath));
    writeFileSync(this.systemSettingsFileFullPath, JSON.stringify(configuration, null, 2));
  }

  public savePreferences<T>(preferences: T): void {
    this.createDirectoryIfNotExists(dirname(this.preferencesFileFullPath));
    writeFileSync(this.preferencesFileFullPath, JSON.stringify(preferences, null, 2));
  }

  public async selectDirectory(currentPath: string | null): Promise<IResult<string>> {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
      defaultPath: currentPath || undefined
    });
    return result.canceled
      ? this.resultFactory.createNoContentResult()
      : this.resultFactory.createSuccessResult(result.filePaths[0]);
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private setPaths(): void {
    const platform = process.platform;
    const appName = app.getName();
    const settingsFileName = "arcane_archive.settings.json";
    const preferencesFileName = "arcane_archive.preferences.json";
    if (platform === "win32") {
      // non-roaming data
      const userData = app.getPath("userData"); // this has been set to LOCALAPPDATA environment variable at startup
      this._defaultCacheDirectory = join(userData, ".cache");
      this._defaultLogDirectory = join(userData, ".logs");
      this.systemSettingsFileFullPath = join(userData, ".config", settingsFileName);
      // roaming data
      const appData = app.getPath("appData"); // this is the APPDATA environment variable
      this._defaultDataDirectory = join(appData, appName, "data");
      this.preferencesFileFullPath = join(appData, appName, ".config", preferencesFileName);
    } else if (platform === "darwin") {
      // macOS -> no roaming
      const home = homedir();
      const userData = app.getPath("userData"); // this is ~/Library/Application Support/Arcane Archive
      this._defaultCacheDirectory = join(home, "Library", "Caches", appName);
      this._defaultLogDirectory = join(home, "Library", "Logs", appName);
      this.systemSettingsFileFullPath = join(userData, ".config", settingsFileName);
      this._defaultDataDirectory = join(userData, "data");
      this.preferencesFileFullPath = join(userData, ".config", preferencesFileName);
    } else {
      // Linux -> there is no roaming
      const userData = app.getPath("userData"); // this is ~/.config/Arcane Archive
      this._defaultCacheDirectory = join(userData, ".cache");
      this._defaultLogDirectory = join(userData, ".logs");
      this.systemSettingsFileFullPath = join(userData, ".config", settingsFileName);
      this._defaultDataDirectory = join(userData, appName, "data");
      this.preferencesFileFullPath = join(userData, appName, ".config", preferencesFileName);
    }
    this.logService.debug("Main", "Default Cache Directory ->", this._defaultCacheDirectory);
    this.logService.debug("Main", "Default Log Directory ->", this._defaultLogDirectory);
    this.logService.debug("Main", "System settings file ->", this.systemSettingsFileFullPath);
    this.logService.debug("Main", "Default Data Directory ->", this._defaultDataDirectory);
    this.logService.debug("Main", "Preferences File ->", this.preferencesFileFullPath);
  }
  // #endregion
}
