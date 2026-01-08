import { stringHasMinimalLength } from "../../components/util";
import { CollectionDto } from "../../dto";
import { ValidationResult } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class CollectionViewmodel extends BaseViewmodel<CollectionDto> {
  // #region Private fields ---------------------------------------------------
  private readonly parentCollection: CollectionDto | null;
  private readonly _parentPath: Array<string>;
  // #endregion

  // #region Getters/Setters - Parent -----------------------------------------
  public get hasParent(): boolean {
    return this.parentCollection != null;
  }

  public get parentCode(): string {
    return this.parentCollection?.code || "";
  }

  public get parentIsFolder(): boolean {
    return this.parentCollection?.folder || false;
  }
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get code(): string {
    return this._dto.code;
  }

  public set code(value: string) {
    this._dto.code = value;
  }

  public get description(): string {
    return this._dto.name["ENGLISH"] || "";
  }

  public set description(value: string) {
    if (value.trim().length == 0) {
      delete this._dto.name["ENGLISH"];
    } else {
      this._dto.name["ENGLISH"] = value;
    }
  }

  public get id(): string {
    if (this._dto.id < 0) {
      return "-";
    } else {
      return this._dto.id.toString();
    }
  }

  public get isFolder(): boolean {
    return this._dto.folder;
  }

  public get createdAtString(): string {
    return this._dto.createdAt != null
      ? new Date(this._dto.createdAt).toLocaleString()
      : "-";
  }

  public get createdBy(): string {
    return this._dto.createdBy || "-";
  }

  public get modifiedAtString(): string {
    return this._dto.modifiedAt != null
      ? new Date(this._dto.modifiedAt).toLocaleString()
      : "-";
  }

  public get modifiedBy(): string {
    return this._dto.modifiedBy || "-";
  }

  public get parentPath(): Array<string> {
    return this._parentPath;
  }

  public get parentPathJoin(): string {
    return this._parentPath.join();
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  constructor(dto: CollectionDto, parentDto: CollectionDto | null, parentPath: Array<string>) {
    super(dto);
    this.parentCollection = parentDto;
    this._parentPath = parentPath;
  }
  // #endregion

  public validateCode(): ValidationResult {
    let result: ValidationResult;
    if (stringHasMinimalLength(this._dto.code, 3)) {
      this.setFieldValid("code");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("code");
      result = { helperText: "Please enter minimal 3 characters", intent: "danger" };
    }
    return result;
  }
}
