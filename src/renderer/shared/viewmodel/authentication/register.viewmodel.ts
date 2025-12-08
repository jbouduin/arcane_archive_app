import { stringHasMinimalLength, stringsNotNullOrEmpty } from "../../components/util";
import { RegisterRequestDto } from "../../dto";
import { ValidationResult } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class RegisterViewmodel extends BaseViewmodel<RegisterRequestDto> {
  // #region BaseViewmodel Members --------------------------------------------
  public get isValid(): boolean {
    return stringsNotNullOrEmpty(this._dto.userName, this._dto.email, this._dto.emailRepeat, this._dto.password, this._dto.passwordRepeat) &&
      this._dto.email == this._dto.emailRepeat &&
      this._dto.password == this._dto.passwordRepeat;
  }
  // #endregion

  // #region Getters/Setters for Dto Fields -----------------------------------
  public get userName(): string {
    return this._dto.userName;
  }

  public set userName(value: string) {
    this._dto.userName = value;
  }

  public get password(): string {
    return this._dto.password;
  }

  public set password(value: string) {
    this._dto.password = value;
  }

  public get passwordRepeat(): string {
    return this._dto.passwordRepeat;
  }

  public set passwordRepeat(value: string) {
    this._dto.passwordRepeat = value;
  }

  public get email(): string {
    return this._dto.email;
  }

  public set email(value: string) {
    this._dto.email = value;
  }

  public get emailRepeat(): string {
    return this._dto.emailRepeat;
  }

  public set emailRepeat(value: string) {
    this._dto.emailRepeat = value;
  }

  public get firstName(): string {
    return this._dto.firstName;
  }

  public set firstName(value: string) {
    this._dto.firstName = value;
  }

  public get lastName(): string {
    return this._dto.lastName;
  }

  public set lastName(value: string) {
    this._dto.lastName = value;
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  public userNameValidation(): ValidationResult {
    return stringHasMinimalLength(this._dto.userName, 8)
      ? { helperText: undefined, intent: "none" }
      : { helperText: "Username length must be 8 or more", intent: "danger" };
  }

  public emailValidation(): ValidationResult {
    return this.couldBeEmail(this._dto.email)
      ? { helperText: undefined, intent: "none" }
      : { helperText: "Please enter a valid email address", intent: "danger" };
  }

  public emailRepeatValidation(): ValidationResult {
    return this._dto.email == this._dto.emailRepeat
      ? { helperText: undefined, intent: "none" }
      : { helperText: "Email and repeated email do not correspond", intent: "danger" };
  }

  public passwordValidation(): ValidationResult {
    return stringHasMinimalLength(this._dto.password, 8)
      ? { helperText: undefined, intent: "none" }
      : { helperText: "Password length must be 8 or more", intent: "danger" };
  }

  public passwordRepeatValidation(): ValidationResult {
    return this._dto.password == this._dto.passwordRepeat
      ? { helperText: undefined, intent: "none" }
      : { helperText: "Password and repeated password do not correspond", intent: "danger" };
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private couldBeEmail(input: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  }
  // #endregion
}
