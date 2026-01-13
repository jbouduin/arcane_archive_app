import { cloneDeep, isEqual } from "lodash";
import { ValidationResult } from "../types";

export type viewmodelMode = "read-only" | "create" | "update";

export abstract class BaseViewmodel<Dto extends object, Fn extends string> {
  // #region Private fields ---------------------------------------------------
  private invalidFields: Array<Fn>;
  private pendingValidations: number;
  // TODO: private touchedFields: Array<Fn> ? We need some behavior that validates the last validated field not only on blur, but also when
  // entering, but without displaying an error before blur
  private validationResults: Map<Fn, ValidationResult>;
  private readonly _mode: viewmodelMode;
  // #endregion

  // #region protected fields -------------------------------------------------
  protected _dto: Dto;
  protected readonly _org: Dto;
  protected readonly validValidation: ValidationResult;
  // #endregion

  // #region Auxiliary getters ------------------------------------------------
  public get isValid(): boolean {
    return this.invalidFields.length == 0;
  }

  public get dto(): Readonly<Dto> {
    return this._dto;
  }

  public get hasChanges(): boolean {
    return !isEqual(this._dto, this._org);
  }

  public get canCommit(): boolean {
    return !isEqual(this._dto, this._org) && this.invalidFields.length == 0 && !this.isValidationInProgress;
  }

  public get isValidationInProgress(): boolean {
    return this.pendingValidations > 0;
  }

  public get mode(): viewmodelMode {
    return this._mode;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: Dto, mode?: viewmodelMode) {
    this._dto = dto;
    this._org = cloneDeep(dto);
    this._mode = mode || "read-only";
    this.invalidFields = new Array<Fn>();
    this.validValidation = { intent: "none" };
    this.pendingValidations = 0;
    this.validationResults = new Map<Fn, ValidationResult>();
  }
  // #endregion

  // #region Protected methods ------------------------------------------------
  protected setFieldInvalid(fieldName: Fn, validationResult: ValidationResult | null) {
    if (this.invalidFields.indexOf(fieldName) < 0) {
      this.invalidFields.push(fieldName);
    }
    if (validationResult != null) {
      this.validationResults.set(fieldName, validationResult);
    }
  }

  protected setFieldValid(fieldName: Fn) {
    this.invalidFields = this.invalidFields.filter((ivf: string) => ivf != fieldName);
    this.validationResults.delete(fieldName);
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public cancelChanges(): void {
    this._dto = cloneDeep(this._org);
    this.invalidFields.slice(0);
  }

  public startValidation(): void {
    this.pendingValidations++;
  }

  public endValidation(): void {
    this.pendingValidations = Math.max(0, this.pendingValidations - 1);
  }

  public getValidation(fieldName: Fn): ValidationResult {
    return this.validationResults.get(fieldName) ?? this.validValidation;
  }
  // #endregion
}
