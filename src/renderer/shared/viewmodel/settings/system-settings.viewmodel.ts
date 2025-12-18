import { SystemSettingsDto } from "../../../../common/dto";
import { stringNotNullOrEmpty } from "../../components/util";
import { ValidationResult } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class SystemSettingsViewmodel extends BaseViewmodel<SystemSettingsDto> {
  // #region Private fields ---------------------------------------------------
  private readonly invalidUrlResult: ValidationResult;
  private readonly _firstTime: boolean;
  // #endregion

  // #region Getters/Setters apiConfiguration ---------------------------------
  public get discovery(): string {
    return this._dto.discovery;
  }

  public set discovery(value: string) {
    this._dto.discovery = value;
  }

  // public get libraryApiRoot(): string {
  //   return this._dto.apiConfiguration.libraryApiRoot;
  // }

  // public set libraryApiRoot(value: string) {
  //   this._dto.apiConfiguration.libraryApiRoot = value;
  // }

  // public get collectionApiRoot(): string {
  //   return this._dto.apiConfiguration.collectionApiRoot;
  // }

  // public set collectionApiRoot(value: string) {
  //   this._dto.apiConfiguration.collectionApiRoot = value;
  // }

  // public get deckApiRoot(): string {
  //   return this._dto.apiConfiguration.deckApiRoot;
  // }

  // public set deckApiRoot(value: string) {
  //   this._dto.apiConfiguration.deckApiRoot = value;
  // }

  // public get scryfallApiRoot(): string {
  //   return this._dto.apiConfiguration.scryfallApiRoot;
  // }

  // public set scryfallApiRoot(value: string) {
  //   this._dto.apiConfiguration.scryfallApiRoot = value;
  // }

  // public get scryfallCardBackRoot(): string {
  //   return this._dto.apiConfiguration.scryfallCardBackRoot;
  // }

  // public set scryfallCardBackRoot(value: string) {
  //   this._dto.apiConfiguration.scryfallCardBackRoot = value;
  // }

  // public get scryfallMinimumRequestTimeout(): number {
  //   return this._dto.apiConfiguration.scryfallMinimumRequestTimeout;
  // }

  // public set scryfallMinimumRequestTimeout(value: number) {
  //   this._dto.apiConfiguration.scryfallMinimumRequestTimeout = value;
  // }
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

  // #region Getters/Setters --------------------------------------------------
  public get firstTime(): boolean {
    return this._firstTime;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: SystemSettingsDto, firstTime: boolean) {
    super(dto);
    this.invalidUrlResult = { helperText: "Please enter a valid internet address", intent: "danger" };
    this._firstTime = firstTime;
  }
  // #endregion

  // #region Validations ------------------------------------------------------
  public validateRootDataDirectory(): ValidationResult {
    let result: ValidationResult;
    if (stringNotNullOrEmpty(this._dto.dataConfiguration.rootDataDirectory)) {
      this.setFieldValid("rootDataDirectory");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("rootDataDirectory");
      result = { helperText: "You must specify a directory", intent: "danger" };
    }
    return result;
  }

  public validateCacheDataDirectory(): ValidationResult {
    let result: ValidationResult;
    if (stringNotNullOrEmpty(this._dto.dataConfiguration.cacheDirectory)) {
      this.setFieldValid("cacheDirectory");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("cacheDirectory");
      result = { helperText: "You must specify a directory", intent: "danger" };
    }
    return result;
  }

  public validateDatabaseName(): ValidationResult {
    let result: ValidationResult;
    if (stringNotNullOrEmpty(this._dto.dataConfiguration.databaseName)) {
      this.setFieldValid("databaseName");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("databaseName");
      result = { helperText: "You must specify a database name", intent: "danger" };
    }
    return result;
  }

  public validateDiscovery(): ValidationResult {
    let result: ValidationResult;
    try {
      const url = new URL(this._dto.discovery);
      if (url.protocol == "http:" || url.protocol == "https:") {
        this.setFieldValid("discovery");
        result = this.validValidation;
      } else {
        this.setFieldInvalid("discovery");
        result = this.invalidUrlResult;
      }
    } catch {
      this.setFieldInvalid("discovery");
      result = this.invalidUrlResult;
    }

    return result;
  }

  // public validateLibraryApiRoot(): ValidationResult {
  //   let result: ValidationResult;
  //   try {
  //     const url = new URL(this._dto.apiConfiguration.libraryApiRoot);
  //     if (url.protocol == "http:" || url.protocol == "https:") {
  //       this.setFieldValid("libraryApiRoot");
  //       result = this.validValidation;
  //     } else {
  //       this.setFieldInvalid("libraryApiRoot");
  //       result = this.invalidUrlResult;
  //     }
  //   } catch {
  //     this.setFieldInvalid("libraryApiRoot");
  //     result = this.invalidUrlResult;
  //   }
  //   return result;
  // }

  // public validateCollectionApiRoot(): ValidationResult {
  //   let result: ValidationResult;
  //   try {
  //     const url = new URL(this._dto.apiConfiguration.collectionApiRoot);
  //     if (url.protocol == "http:" || url.protocol == "https:") {
  //       this.setFieldValid("collectionApiRoot");
  //       result = this.validValidation;
  //     } else {
  //       this.setFieldInvalid("collectionApiRoot");
  //       result = this.invalidUrlResult;
  //     }
  //   } catch {
  //     this.setFieldInvalid("collectionApiRoot");
  //     result = this.invalidUrlResult;
  //   }
  //   return result;
  // }

  // public validateDeckApiRoot(): ValidationResult {
  //   let result: ValidationResult;
  //   try {
  //     const url = new URL(this._dto.apiConfiguration.deckApiRoot);
  //     if (url.protocol == "http:" || url.protocol == "https:") {
  //       this.setFieldValid("deckApiRoot");
  //       result = this.validValidation;
  //     } else {
  //       this.setFieldInvalid("deckApiRoot");
  //       result = this.invalidUrlResult;
  //     }
  //   } catch {
  //     this.setFieldInvalid("deckApiRoot");
  //     result = this.invalidUrlResult;
  //   }
  //   return result;
  // }

  // public validateScryfallApiRoot(): ValidationResult {
  //   let result: ValidationResult;
  //   try {
  //     const url = new URL(this._dto.apiConfiguration.scryfallApiRoot);
  //     if (url.protocol == "http:" || url.protocol == "https:") {
  //       this.setFieldValid("scryfallApiRoot");
  //       result = this.validValidation;
  //     } else {
  //       this.setFieldInvalid("scryfallApiRoot");
  //       result = this.invalidUrlResult;
  //     }
  //   } catch {
  //     this.setFieldInvalid("scryfallApiRoot");
  //     result = this.invalidUrlResult;
  //   }
  //   return result;
  // }

  // public validateScryfallCardBackRoot(): ValidationResult {
  //   let result: ValidationResult;
  //   try {
  //     const url = new URL(this._dto.apiConfiguration.scryfallCardBackRoot);
  //     if (url.protocol == "http:" || url.protocol == "https:") {
  //       this.setFieldValid("scryfallCardBackRoot");
  //       result = this.validValidation;
  //     } else {
  //       this.setFieldInvalid("scryfallCardBackRoot");
  //       result = this.invalidUrlResult;
  //     }
  //   } catch {
  //     this.setFieldInvalid("scryfallCardBackRoot");
  //     result = this.invalidUrlResult;
  //   }
  //   return result;
  // }

  // public validateScryfallMinimumRequestTimeout(): ValidationResult {
  //   let result: ValidationResult;
  //   if (this._dto.apiConfiguration.scryfallMinimumRequestTimeout < 50) {
  //     this.setFieldInvalid("scryfallMinimumRequestTimeout");
  //     result = { helperText: "The time out should be greater than or equal to 50 milliseconds", intent: "danger" };
  //   } else if (this._dto.apiConfiguration.scryfallMinimumRequestTimeout < 60) {
  //     this.setFieldValid("scryfallMinimumRequestTimeout");
  //     result = { helperText: "A value less than 60 milliseconds could result in rejected requests", intent: "warning" };
  //   } else {
  //     this.setFieldValid("scryfallMinimumRequestTimeout");
  //     result = this.validValidation;
  //   }
  //   return result;
  // }
  // #endregion
}
