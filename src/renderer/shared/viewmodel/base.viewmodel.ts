import { cloneDeep, isEqual } from "lodash";
import { SelectOption, ValidationResult } from "../types";

export type ViewmodelMode = "read-only" | "create" | "update";

// TODO: when mode is update: validate all (at least the synchronous ones) and mark as touched ?
export abstract class BaseViewmodel<Dto extends object> {
  //#region Private fields ----------------------------------------------------
  private validationFunctions: Map<keyof Dto, () => void>;
  private asyncValidationFunctions: Map<keyof Dto, (signal: AbortSignal) => Promise<void>>;
  private touchedFields: Set<keyof Dto>;
  private debounceTimers: Map<keyof Dto, NodeJS.Timeout>;
  private invalidFields: Array<keyof Dto>;
  private pendingValidations: number;
  private validationResults: Map<keyof Dto, ValidationResult>;
  private _childViewmodels: Array<BaseViewmodel<object>>;
  private selectOptions: Map<keyof Dto, Array<SelectOption<unknown>>>;
  private readonly _mode: ViewmodelMode;
  //#endregion

  //#region Protected fields --------------------------------------------------
  protected _dto: Dto;
  protected readonly _org: Dto;
  protected readonly validValidation: ValidationResult;
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get isValid(): boolean {
    return this.invalidFields.length == 0 && this._childViewmodels.every((vm: BaseViewmodel<object>) => vm.isValid);
  }

  public get dto(): Dto {
    return this._dto;
  }

  /** Override this one if there are child viewmodels */
  public get dtoToSave(): Dto {
    return this._dto;
  }

  public get hasChanges(): boolean {
    let result = !isEqual(this._dto, this._org);
    if (this._childViewmodels.length > 0) {
      result = result || this._childViewmodels.some((vm: BaseViewmodel<object>) => vm.hasChanges);
    }
    return result;
  }

  public get canCommit(): boolean {
    return this.hasChanges && this.isValid && !this.isValidationInProgress;
  }

  public get isValidationInProgress(): boolean {
    return this.pendingValidations > 0 ||
      this._childViewmodels.some((vm: BaseViewmodel<object>) => vm.isValidationInProgress);
  }

  public get mode(): Readonly<ViewmodelMode> {
    return this._mode;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(dto: Dto, mode?: ViewmodelMode) {
    this._dto = dto;
    this._org = cloneDeep(dto);
    this._mode = mode || "read-only";
    this.invalidFields = new Array<keyof Dto>();
    this.validValidation = { intent: "none" };
    this.pendingValidations = 0;
    this.debounceTimers = new Map<keyof Dto, NodeJS.Timeout>();
    this.validationResults = new Map<keyof Dto, ValidationResult>();
    this.validationFunctions = this.validationFunctions = new Map<keyof Dto, () => void>();
    this.asyncValidationFunctions = new Map<keyof Dto, (signal: AbortSignal) => Promise<void>>();
    this.touchedFields = new Set<keyof Dto>();
    this._childViewmodels = new Array<BaseViewmodel<object>>();
    this.selectOptions = new Map<keyof Dto, Array<SelectOption<unknown>>>();
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  protected setFieldInvalid(fieldName: keyof Dto, validationResult: ValidationResult | null): void {
    if (this.invalidFields.indexOf(fieldName) < 0) {
      this.invalidFields.push(fieldName);
    }
    if (validationResult != null) {
      this.validationResults.set(fieldName, validationResult);
    }
  }

  protected setFieldValid(fieldName: keyof Dto): void {
    this.invalidFields = this.invalidFields.filter((ivf: keyof Dto) => ivf != fieldName);
    this.validationResults.delete(fieldName);
  }

  protected registerValidation(fieldName: keyof Dto, validation: () => void): void {
    this.validationFunctions.set(fieldName, validation);
  }

  protected registerAsyncValidation(fieldName: keyof Dto, validation: (signal: AbortSignal) => Promise<void>): void {
    this.asyncValidationFunctions.set(fieldName, validation);
  }

  protected registerChildViewmodel<T extends object>(viewmodel: BaseViewmodel<T>): void {
    this._childViewmodels.push(viewmodel as unknown as BaseViewmodel<object>);
  }

  protected registerSelectOptions(fieldName: keyof Dto, options: Array<SelectOption<unknown>>): void {
    this.selectOptions.set(fieldName, options);
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  public markTouched(fieldName: keyof Dto): void {
    this.touchedFields.add(fieldName);
  }

  public isTouched(fieldName: keyof Dto): boolean {
    return this.touchedFields.has(fieldName);
  }

  public cancelChanges(): void {
    this._dto = cloneDeep(this._org);
    this._childViewmodels.forEach((cvm: BaseViewmodel<object>) => cvm.cancelChanges());
    this.invalidFields.slice(0);
  }

  public startValidation(): void {
    this.pendingValidations++;
  }

  public endValidation(): void {
    this.pendingValidations = Math.max(0, this.pendingValidations - 1);
  }

  public getValidation(fieldName: keyof Dto): ValidationResult {
    return this.touchedFields.has(fieldName) && this.validationResults.has(fieldName)
      ? this.validationResults.get(fieldName)!
      : this.validValidation;
  }

  public getSelectOptions<D>(fieldName: keyof Dto): Array<SelectOption<D>> {
    return this.selectOptions.get(fieldName) as Array<SelectOption<D>> || new Array<SelectOption<D>>();
  }

  public validate(fieldName: keyof Dto, debounce = 0): void {
    const method = this.validationFunctions.get(fieldName);
    if (method) {
      if (debounce) {
        const currentTimeOut = this.debounceTimers.get(fieldName);
        if (currentTimeOut) {
          clearTimeout(currentTimeOut);
        }
        this.debounceTimers.set(
          fieldName,
          setTimeout(
            () => {
              this.startValidation();
              try {
                method();
              } finally {
                this.endValidation();
              }
            },
            debounce
          )
        );
      } else {
        method();
      }
    } else {
      throw new Error(`No synchronous validation found for ${String(fieldName)}`);
    }
  }

  public validateAsync(fieldName: keyof Dto, signal: AbortSignal): Promise<void> {
    const method = this.asyncValidationFunctions.get(fieldName);
    if (method) {
      return method(signal)
        .catch((err) => {
          if (err.name !== "AbortError") {
            this.setFieldInvalid(fieldName, { helperText: "Validation failed", intent: "danger" });
          }
        });
    } else {
      return Promise.reject(new Error(`No asynchronous validation found for ${String(fieldName)}`));
    }
  }
  //#endregion
}
