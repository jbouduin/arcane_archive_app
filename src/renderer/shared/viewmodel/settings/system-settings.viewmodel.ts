import { SystemSettingsDto } from "../../../../common/dto";
import { BaseViewmodel } from "../base.viewmodel";

export class SystemSettingsViewmodel extends BaseViewmodel<SystemSettingsDto> {
  // #region Getters/Setters apiConfiguration ---------------------------------
  public get scryfallApiRoot(): string {
    return this._dto.apiConfiguration.scryfallApiRoot;
  }

  public set scryfallApiRoot(value: string) {
    this._dto.apiConfiguration.scryfallApiRoot = value;
  }

  public get scryfallCardBackRoot(): string {
    return this._dto.apiConfiguration.scryfallCardBackRoot;
  }

  public set scryfallCardBackRoot(value: string) {
    this._dto.apiConfiguration.scryfallCardBackRoot = value;
  }

  public get scryfallMinimumRequestTimeout(): number {
    return this._dto.apiConfiguration.scryfallMinimumRequestTimeout;
  }

  public set scryfallMinimumRequestTimeout(value: number) {
    this._dto.apiConfiguration.scryfallMinimumRequestTimeout = value;
  }

  public get mtgCollectionApiRoot(): string {
    return this._dto.apiConfiguration.libraryApiRoot;
  }

  public set mtgCollectionApiRoot(value: string) {
    this._dto.apiConfiguration.libraryApiRoot = value;
  }

  public get authenticationApiRoot(): string {
    return this._dto.apiConfiguration.authenticationApiRoot;
  }

  public set authenticationApiRoot(value: string) {
    this._dto.apiConfiguration.libraryApiRoot = value;
  }
  // #endregion

  // #region Getters/Setters dataConfiguration --------------------------------
  public get rootDataDirectory(): string {
    return this._dto.dataConfiguration.rootDataDirectory;
  }

  public set rootDataDirectory(value: string) {
    this._dto.dataConfiguration.rootDataDirectory = value;
  }

  public get cacheDirectory(): string {
    return this._dto.dataConfiguration.cacheDirectory;
  }

  public set cacheDirectory(value: string) {
    this._dto.dataConfiguration.cacheDirectory = value;
  }

  public get databaseName(): string {
    return this._dto.dataConfiguration.databaseName;
  }

  public set databaseName(value: string) {
    this._dto.dataConfiguration.databaseName = value;
  }
  // #endregion
}
