import { stringHasMinimalLength } from "../../components/util";
import { CollectionDto } from "../../dto";
import { CollectionType } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";

/**
 * The viewmodle for a collection. This viewmodel does not contain getter/setter for the field `code`,
 * as that value is maintained by the back-end. The translatabel field `name` is also not used.
 */
export class CollectionViewmodel extends BaseViewmodel<CollectionDto> {
  // #region Private fields ---------------------------------------------------
  private readonly _parentPath: Array<string>;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get collectionName(): string {
    return this._dto.collectionName;
  }

  public set collectionName(value: string) {
    this._dto.collectionName = value;
  }

  public get description(): string {
    return this._dto.description || "";
  }

  public set description(value: string) {
    if (value.trim().length == 0) {
      this._dto.description = null;
    } else {
      this._dto.description = value;
    }
  }

  public get type(): CollectionType {
    return this._dto.type;
  }

  public get parentPath(): Array<string> {
    return this._parentPath;
  }

  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: CollectionDto, parentCode: string, mode: ViewmodelMode) {
    super(dto, mode);
    this._parentPath = parentCode.split("/").filter((p: string) => p != "");
    if (mode == "update") {
      this.validateCollectionName();
    }
    this.registerValidation("collectionName", () => this.validateCollectionName());
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private validateCollectionName(): void {
    if (stringHasMinimalLength(this._dto.collectionName, 3)) {
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
