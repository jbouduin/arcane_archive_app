import { DataConfigurationDto } from "../../../../common/dto";
import { stringNotNullOrEmpty } from "../../components/util";
import { viewmodelMode } from "../base.viewmodel";
import { BaseViewmodelNew } from "../base.viewmodel-new";

export type DirectoryTarget = "data" | "cache" | "log";

export class DataConfigurationViewmodel extends BaseViewmodelNew<DataConfigurationDto> {
  // #region Constructor ------------------------------------------------------
  public constructor(dto: DataConfigurationDto, mode: viewmodelMode) {
    super(dto, mode);
    this.registerValidation("rootDataDirectory", () => this.validateRootDataDirectory());
    this.registerValidation("cacheDirectory", () => this.validateCacheDataDirectory());
    this.registerValidation("logDirectory", () => this.validateLogDirectory());
    this.registerValidation("databaseName", () => this.validateDatabaseName());
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public getCurrentDirectoryValue(target: DirectoryTarget): string {
    let current: string;
    switch (target) {
      case "data":
        current = this._dto.rootDataDirectory;
        break;
      case "cache":
        current = this._dto.cacheDirectory;
        break;
      case "log":
        current = this._dto.logDirectory;
        break;
      default:
        throw (new Error("invalid target"));
    }
    return current;
  }

  public setCurrentDirectoryValue(target: DirectoryTarget, value: string): void {
    switch (target) {
      case "data":
        this._dto.rootDataDirectory = value;
        break;
      case "cache":
        this._dto.cacheDirectory = value;
        break;
      case "log":
        this._dto.logDirectory = value;
        break;
    }
  }
  // #endregion

  // #region Validations ------------------------------------------------------
  private validateRootDataDirectory(): void {
    if (stringNotNullOrEmpty(this._dto.rootDataDirectory)) {
      this.setFieldValid("rootDataDirectory");
    } else {
      this.setFieldInvalid(
        "rootDataDirectory",
        { helperText: "You must specify a directory", intent: "danger" }
      );
    }
  }

  private validateCacheDataDirectory(): void {
    if (stringNotNullOrEmpty(this._dto.cacheDirectory)) {
      this.setFieldValid("cacheDirectory");
    } else {
      this.setFieldInvalid(
        "cacheDirectory",
        { helperText: "You must specify a directory", intent: "danger" }
      );
    }
  }

  private validateLogDirectory(): void {
    if (stringNotNullOrEmpty(this._dto.logDirectory)) {
      this.setFieldValid("logDirectory");
    } else {
      this.setFieldInvalid(
        "logDirectory",
        { helperText: "You must specify a directory", intent: "danger" }
      );
    }
  }

  private validateDatabaseName(): void {
    if (stringNotNullOrEmpty(this._dto.databaseName)) {
      this.setFieldValid("databaseName");
    } else {
      this.setFieldInvalid(
        "databaseName",
        { helperText: "You must specify a database name", intent: "danger" }
      );
    }
  }
  // #endregion
}
