import zxcvbn, { ZXCVBNResult, ZXCVBNScore } from "zxcvbn";
import { stringCouldBeEmail, stringHasMinimalLength, stringNotNullOrEmpty } from "../../components/util";
import { IServiceContainer } from "../../context";
import { RegisterRequestDto } from "../../dto";
import { ValidationResult } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class RegisterViewmodel extends BaseViewmodel<RegisterRequestDto> {
  // #region Private fields ---------------------------------------------------
  private zXCVBNResult: ZXCVBNResult | undefined;
  private _passwordValidation: string | undefined;
  private readonly passwordDict: Array<string>;
  // #endregion

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
    if (stringHasMinimalLength(this._dto.password, 1)) {
      if (this._dto.password.toLocaleLowerCase().includes(this._dto.userName) ||
        this._dto.password.toLocaleLowerCase().includes(this._dto.email)) {
        this.setFieldInvalid("password");
        this._passwordValidation = "Password cannot contain your username or email address";
        this.zXCVBNResult = undefined;
      } else {
        this._passwordValidation = undefined;
        this.zXCVBNResult = zxcvbn(value, [this.userName, this.email, ...this.passwordDict]);
        if (this.zXCVBNResult.score < 3) {
          this.setFieldInvalid("password");
        } else {
          this.setFieldValid("password");
        }
      }
    } else {
      this.zXCVBNResult = undefined;
      this._passwordValidation = undefined;
      this.setFieldInvalid("password");
    }
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

  // #region Getters - password security --------------------------------------
  public get score(): ZXCVBNScore | undefined {
    return this.zXCVBNResult?.score;
  }

  public get guessesLog10(): number | undefined {
    return this.zXCVBNResult?.guesses_log10;
  }

  public get warning(): string {
    return this._passwordValidation ?? this.zXCVBNResult?.feedback.warning ?? "";
  }

  public get suggestions(): Array<string> {
    return this.zXCVBNResult?.feedback.suggestions ?? new Array<string>();
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: RegisterRequestDto, showLoginButton: boolean) {
    super(dto);
    this.showLoginButton = showLoginButton;
    this.passwordDict = [
      "magic",
      "the",
      "gathering",
      "magic the gathering"
    ];
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  public async validateUserName(serviceContainer: IServiceContainer): Promise<ValidationResult> {
    let result: ValidationResult;
    if (!stringHasMinimalLength(this._dto.userName, 8)) {
      this.setFieldInvalid("userName");
      result = { helperText: "Username length must be 8 or more", intent: "danger" };
    } else if (stringCouldBeEmail(this._dto.userName)) {
      this.setFieldInvalid("userName");
      result = { helperText: "Username may not be an email address", intent: "danger" };
    } else {
      const userExists = await serviceContainer.sessionService.userExists(serviceContainer, this._dto.userName);
      if (userExists) {
        result = { helperText: "Username already in use", intent: "danger" };
        this.setFieldInvalid("userName");
      } else {
        result = this.validValidation;
        this.setFieldValid("userName");
      }
    }

    return Promise.resolve(result);
  }

  public validateEmail(): ValidationResult {
    // we do not immediately go to server to check if email already in use, as this would unnecessary expose email addresses
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
