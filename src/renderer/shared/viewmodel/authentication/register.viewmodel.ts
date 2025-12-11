import { stringCouldBeEmail, stringHasMinimalLength, stringNotNullOrEmpty } from "../../components/util";
import { RegisterRequestDto } from "../../dto";
import { ValidationResult } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class RegisterViewmodel extends BaseViewmodel<RegisterRequestDto> {
  // #region non Dto related properties ---------------------------------------
  public readonly showLoginButton: boolean;
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
    return this._dto.firstName || "";
  }

  public set firstName(value: string) {
    this._dto.firstName = stringNotNullOrEmpty(value) ? value : null;
  }

  public get lastName(): string {
    return this._dto.lastName || "";
  }

  public set lastName(value: string) {
    this._dto.lastName = stringNotNullOrEmpty(value) ? value : null;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: RegisterRequestDto, showLoginButton: boolean) {
    super(dto);
    this.showLoginButton = showLoginButton;
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  public validateUserName(): ValidationResult {
    let result: ValidationResult;
    if (stringHasMinimalLength(this._dto.userName, 8)) {
      this.setFieldValid("userName");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("userName");
      result = { helperText: "Username length must be 8 or more", intent: "danger" };
    }
    return result;
  }

  public validateEmail(): ValidationResult {
    let result: ValidationResult;
    if (stringCouldBeEmail(this._dto.email)) {
      this.setFieldValid("email");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("email");
      result = { helperText: "Please enter a valid email address", intent: "danger" };
    }
    return result;
  }

  public validateEmailRepeat(): ValidationResult {
    let result: ValidationResult;
    if (this._dto.email == this._dto.emailRepeat) {
      this.setFieldValid("emailRepeat");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("emailRepeat");
      result = { helperText: "Email and repeated email do not correspond", intent: "danger" };
    }
    return result;
  }

  public validatePassword(): ValidationResult {
    let result: ValidationResult;
    if (stringHasMinimalLength(this._dto.password, 8)) {
      this.setFieldValid("password");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("password");
      result = { helperText: "Password length must be 8 or more", intent: "danger" };
    }
    return result;
  }

  public validatePasswordRepeat(): ValidationResult {
    let result: ValidationResult;
    if (this._dto.password == this._dto.passwordRepeat) {
      this.setFieldValid("passwordRepeat");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("passwordRepeat");
      result = { helperText: "Password and repeated password do not correspond", intent: "danger" };
    }
    return result;
  }
  // #endregion
}
