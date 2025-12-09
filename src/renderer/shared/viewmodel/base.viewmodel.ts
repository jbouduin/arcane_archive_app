import { cloneDeep, isEqual } from "lodash";
import { ValidationResult } from "../types";

export abstract class BaseViewmodel<T extends object> {
  // #region Private fields ---------------------------------------------------
  private invalidFields: Array<string>;
  // #endregion

  // #region protected fields -------------------------------------------------
  protected _dto: T;
  protected readonly _org: T;
  protected readonly validValidation: ValidationResult;
  // #endregion

  // #region Abstract Members -------------------------------------------------
  public get isValid(): boolean {
    return this.invalidFields.length == 0;
  }
  // #endregion

  // #region Auxiliary getters ------------------------------------------------
  public get dto(): Readonly<T> {
    return this._dto;
  }

  public get hasChanges(): boolean {
    return !isEqual(this._dto, this._org);
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: T) {
    this._dto = dto;
    this._org = cloneDeep(dto);
    this.invalidFields = new Array<string>();
    this.validValidation = { helperText: undefined, intent: "none" };
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public cancelChanges(): void {
    this._dto = cloneDeep(this._org);
    this.invalidFields.slice(0);
  }

  public setFieldInvalid(fieldName: string) {
    if (this.invalidFields.indexOf(fieldName) < 0) {
      this.invalidFields.push(fieldName);
    }
  }

  public setFieldValid(fieldName: string) {
    const idx = this.invalidFields.indexOf(fieldName);
    if (idx >= 0) {
      this.invalidFields.splice(idx, 1);
    }
  }
  // #endregion
}
