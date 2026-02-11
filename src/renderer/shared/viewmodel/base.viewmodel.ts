import { cloneDeep, isEqual } from "lodash";
import { SelectOption, ValidationResult } from "../types";

export type ViewmodelMode = "read-only" | "create" | "update";

export abstract class BaseViewmodel<Dto extends object> {
  //#region Private fields ----------------------------------------------------
  private validationFunctions: Map<keyof Dto, () => void>;
  private asyncValidationFunctions: Map<keyof Dto, (signal: AbortSignal) => Promise<void>>;
  private touchedFields: Set<keyof Dto>;
  private debounceTimers: Map<keyof Dto, NodeJS.Timeout>;
  private invalidFields: Array<keyof Dto>;
  /**
   * In case we later need async validations on field combinations `pendingValidations: number` would
   * have to become a `Map<keyof Dto, AbortSignal` so that async validations can abort whatever
   * is pending on any field of the combination.
   * Following methods must then be adapted:
   * - `getValidation(fieldName: keyof Dto): ValidationResult`
   * - `startValidation()` -> should get fieldName as input parameter
   * - `endValidation()` -> should get fieldName as input parameter
   */
  private pendingValidations: number;
  private validationResults: Map<keyof Dto, ValidationResult>;
  private _childViewmodels: Array<BaseViewmodel<object>>;
  private selectOptions: Map<keyof Dto, Array<SelectOption<unknown>>>;
  private readonly _mode: ViewmodelMode;
  //#endregion

  //#region Protected fields --------------------------------------------------
  protected readonly _org: Readonly<Dto>;
  protected _dto: Dto;
  protected readonly validValidation: ValidationResult;
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  /**
   * True if the list of invalid fields is empty and every child viewmodel is valid also.
   */
  public get isValid(): boolean {
    return this.invalidFields.length == 0 && this._childViewmodels.every((vm: BaseViewmodel<object>) => vm.isValid);
  }

  /**
   * The editable `Dto` of the view model
   */
  public get dto(): Dto {
    return this._dto;
  }

  /**
   * The `dto` that is passed to the commit button click event in the `DefaultDialogFooter`.
   *
   * Default _`this.\_dto`_
   *
   * Override this one if there are child viewmodels.
   */
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

  /**
   * Returns `true` if
   * * the viewmodel or any of the child viewmodels have changes
   * * the viewmodel and all child viewmodels ares valid
   * * no asynchronous validations are pending in the viewmodelor child viewmodels   *
   */
  public get canCommit(): boolean {
    return this.hasChanges && this.isValid && !this.isValidationInProgress;
  }

  /**
   * Returns `true` if any asynchronous validations is pending in the viewmodel or
   * any of the childviewmodels
   */
  public get isValidationInProgress(): boolean {
    return this.pendingValidations > 0 ||
      this._childViewmodels.some((vm: BaseViewmodel<object>) => vm.isValidationInProgress);
  }

  /**
   * The {@link ViewmodelMode}
   */
  public get mode(): Readonly<ViewmodelMode> {
    return this._mode;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  /**
   * Currently {@link ViewmodelMode} `"read-only"` has no effect.
   *
   * When registering a validation for a field and {@link ViewmodelMode} is `"update"`,
   * the field will be marked as as _touched_ and the validation will be invoked.
   *
   * @param dto the `Dto`
   * @param mode {@link ViewmodelMode}, default: _`"read-only"`_.
   */
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

  //#region Protected methods -------------------------------------------------
  /**
   * Mark a field as invalid by storing the fieldname and the {@link ValidationResult}.
   * That result can be queried using `getValidation(fieldName: keyof Dto)`
   *
   * @param fieldName the fieldname - `keyof Dto`
   * @param validationResult the {@link ValidationResult}
   */
  protected setFieldInvalid(fieldName: keyof Dto, validationResult: ValidationResult | null): void {
    if (this.invalidFields.indexOf(fieldName) < 0) {
      this.invalidFields.push(fieldName);
    }
    if (validationResult != null) {
      this.validationResults.set(fieldName, validationResult);
    }
  }

  /**
   * Mark a field as valid by removing it from the list of invalid fields and the validation result map
   *
   * @param fieldName the fieldname - `keyof Dto`
   */
  protected setFieldValid(fieldName: keyof Dto): void {
    this.invalidFields = this.invalidFields.filter((ivf: keyof Dto) => ivf != fieldName);
    this.validationResults.delete(fieldName);
  }

  /**
   * Register a synchronous validation method for a field. If the viewmodel has {@link ViewmodelMode} _`"update"`_
   *
   * @param fieldName the fieldname - `keyof Dto`
   * @param validation the validation method
   */
  protected registerValidation(fieldName: keyof Dto, validation: () => void): void {
    this.validationFunctions.set(fieldName, validation);
    // --- when updating: immediately run the validation ---
    if (this.mode == "update") {
      this.markTouched(fieldName);
      validation();
    }
  }

  /**
   * Register an asynchronous validation method for a field.
   * @param fieldName the fieldname - `keyof Dto`
   * @param validation the asynchronous validation method
   */
  protected registerAsyncValidation(fieldName: keyof Dto, validation: (signal: AbortSignal) => Promise<void>): void {
    this.asyncValidationFunctions.set(fieldName, validation);
    // --- when updating: immediately run the validation ---
    if (this.mode == "update") {
      this.markTouched(fieldName);
      // this way the abort signal is useless, but required.
      void validation(new AbortController().signal);
    }
  }

  /**
   * Register a child viewmodel.
   *
   * Child viewmodels are taken into consideration when calling `hasChanges`, `canCommit`, `isValidationInProgress`,
   * and `cancelChanges`.
   *
   * @param viewmodel a
   */
  protected registerChildViewmodel<T extends object>(viewmodel: BaseViewmodel<T>): void {
    this._childViewmodels.push(viewmodel as unknown as BaseViewmodel<object>);
  }

  /**
   * Register the select options for a field.
   *
   * @param fieldName the fieldname - `keyof Dto`
   * @param options an array of {@link SelectOption}
   */
  protected registerSelectOptions(fieldName: keyof Dto, options: Array<SelectOption<unknown>>): void {
    this.selectOptions.set(fieldName, options);
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  /**
   * Mark a field as touched.
   *
   * Fields have to marked as touch to get a {@link ValidationResult} different from `Valid`.
   *
   * @param fieldName the fieldname - `keyof Dto`
   */
  public markTouched(fieldName: keyof Dto): void {
    this.touchedFields.add(fieldName);
  }

  /**
   * @param fieldName the fieldname - `keyof Dto`
   * @returns `true` if the given field has been marked as touched.
   */
  public isTouched(fieldName: keyof Dto): boolean {
    return this.touchedFields.has(fieldName);
  }

  /**
   * Undo all changes in the viewmodel and all child viewmodels.
   */
  public cancelChanges(): void {
    this._dto = cloneDeep(this._org);
    this._childViewmodels.forEach((cvm: BaseViewmodel<object>) => cvm.cancelChanges());
    this.invalidFields.slice(0);
  }

  /**
   * Increase the counter of pending asynchronous validations
   */
  public startAsyncValidation(): void {
    this.pendingValidations++;
  }

  /**
   * Decrease the counter of pending asynchronous validations
   */
  public endAsyncValidation(): void {
    this.pendingValidations = Math.max(0, this.pendingValidations - 1);
  }

  /**
   * Get the validation result for the given fieldname. If the field has not been marked as touched,
   * or there is no validation error for the field, `{ intent: "none" }` is returned.
   *
   *
   * @param fieldName the fieldname - `keyof Dto`
   * @returns {@link ValidationResult}
   */
  public getValidation(fieldName: keyof Dto): ValidationResult {
    return this.touchedFields.has(fieldName) && this.validationResults.has(fieldName)
      ? this.validationResults.get(fieldName)!
      : this.validValidation;
  }

  /**
   * Get the Array of {@link SelectOption} for the given field.
   *
   * @param fieldName the fieldname - `keyof Dto`
   * @returns the registered options, or an empty array if no options have been registered.
   */
  public getSelectOptions<D>(fieldName: keyof Dto): Array<SelectOption<D>> {
    return this.selectOptions.get(fieldName) as Array<SelectOption<D>> || new Array<SelectOption<D>>();
  }

  /**
   * Invoke the validation for the given field.
   *
   * @param fieldName the fieldname - `keyof Dto`
   * @param debounce  an optional debounce for the validation. Use this for __heavy__ validation algorithms.
   * @throws if no validation has been registered for the field.
   */
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
              this.startAsyncValidation();
              try {
                method();
              } finally {
                this.endAsyncValidation();
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

  /**
   * Launch an asynchronous validation for the field.
   *
   * Remarks:
   * - debounding has to be handled by the caller
   * - caller should call `startValidation()` and `endValidation()`
   *
   * @param fieldName the fieldname - `keyof Dto`
   * @param signal    an {@link AbortSignal} that will be passed to the registered validation.
   * @returns a Promise. The method `rejects`if no validation has been registered for the field.
   */
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
