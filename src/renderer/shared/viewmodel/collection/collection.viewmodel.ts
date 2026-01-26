import { stringHasMinimalLength } from "../../components/util";
import { CollectionDto } from "../../dto";
import { CollectionType } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";

export class CollectionViewmodel extends BaseViewmodel<CollectionDto> {
  // #region Private fields ---------------------------------------------------
  private readonly _parentPath: Array<string>;
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

  public get type(): CollectionType {
    return this._dto.type;
  }

  public get parentPath(): Array<string> {
    return this._parentPath;
  }

  public get parentPathJoin(): string {
    return this._parentPath.join();
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: CollectionDto, parentPath: Array<string>, mode: ViewmodelMode) {
    super(dto, mode);
    this._parentPath = parentPath;
    if (mode == "update") {
      this.validateCode();
    }
    this.registerValidation("code", () => this.validateCode());
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private validateCode(): void {
    if (stringHasMinimalLength(this._dto.code, 3)) {
      this.setFieldValid("code");
    } else {
      this.setFieldInvalid(
        "code",
        { helperText: "Please enter minimal 3 characters", intent: "danger" }
      );
    }
  }
  // #endregion
}
