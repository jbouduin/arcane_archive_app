import { stringCouldBeEmail, stringHasMinimalLength } from "../../components/util";
import { LoginRequestDto } from "../../dto/login-request.dto";
import { ValidationResult } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class LoginViewmodel extends BaseViewmodel<LoginRequestDto> {
  // #region non Dto related properties ---------------------------------------
  public readonly showRegisterButton: boolean;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get user(): string {
    return this._dto.user;
  }

  public set user(value: string) {
    this._dto.user = value;
  }

  public get password(): string {
    return this._dto.password;
  }

  public set password(value: string) {
    this._dto.password = value;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: LoginRequestDto, showRegisterButton: boolean) {
    super(dto);
    this.showRegisterButton = showRegisterButton;
  }
  // #endregion

  // #region Auxiliary Validation Methods -------------------------------------
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

  public validateUser(): ValidationResult {
    let result: ValidationResult;
    if (stringHasMinimalLength(this._dto.user, 8) || stringCouldBeEmail(this._dto.user)) {
      this.setFieldValid("user");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("user");
      result = { helperText: "Please enter a valid user name or email address", intent: "danger" };
    }
    return result;
  }
  // #endregion
}
