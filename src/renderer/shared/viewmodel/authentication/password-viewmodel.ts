import zxcvbn, { ZXCVBNResult, ZXCVBNScore } from "zxcvbn";
import { stringHasMinimalLength } from "../../components/util";
import { PasswordDto } from "../../dto";
import { BaseViewmodel, viewmodelMode } from "../base.viewmodel";

export type PasswordViewmodelField = "userName" | "passwordRepeat" | "email" | "password";

export abstract class PasswordViewmodel<T extends PasswordDto, Fn extends string> extends BaseViewmodel<T, Fn | PasswordViewmodelField> {
  // #region Private fields ---------------------------------------------------
  private zXCVBNResult: ZXCVBNResult | undefined;
  private _passwordValidation: string | undefined;
  private readonly passwordDict: Array<string>;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get userName(): string {
    return this._dto.userName;
  }

  public set userName(value: string) {
    this._dto.userName = value;
  }

  public get email(): string {
    return this._dto.email;
  }

  public set email(value: string) {
    this._dto.email = value;
  }

  public get password(): string {
    return this._dto.password;
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

  public set password(value: string) {
    this._dto.password = value;
    if (stringHasMinimalLength(this._dto.password, 8)) {
      if (this._dto.password.toLocaleLowerCase().includes(this._dto.userName) ||
        this._dto.password.toLocaleLowerCase().includes(this._dto.email)) {
        this.setFieldInvalid("password", null);
        this._passwordValidation = "Password cannot contain your username or email address";
        this.zXCVBNResult = undefined;
      } else {
        this._passwordValidation = undefined;
        this.zXCVBNResult = zxcvbn(value, [this.userName, this.email, ...this.passwordDict]);
        if (this.zXCVBNResult.score < 3) {
          this.setFieldInvalid("password", null);
        } else {
          this.setFieldValid("password");
        }
      }
    } else {
      this.zXCVBNResult = undefined;
      this._passwordValidation = undefined;
      this.setFieldInvalid("password", null);
    }
    if (this._dto.password != this._dto.passwordRepeat) {
      this.setFieldInvalid("passwordRepeat", null);
    }
  }

  public get passwordRepeat(): string {
    return this._dto.passwordRepeat;
  }

  public set passwordRepeat(value: string) {
    this._dto.passwordRepeat = value;
  }

  // #region Constructor ------------------------------------------------------
  public constructor(dto: T, mode: viewmodelMode) {
    super(dto, mode);
    this.passwordDict = [
      "magic",
      "the",
      "gathering",
      "magic the gathering"
    ];
    this.setFieldInvalid("password", null);
    this.setFieldInvalid("passwordRepeat", null);
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  public validatePasswordRepeat(): void {
    if (this._dto.password == this._dto.passwordRepeat) {
      this.setFieldValid("passwordRepeat");
    } else {
      this.setFieldInvalid(
        "passwordRepeat",
        { helperText: "Password and repeated password do not correspond", intent: "danger" }
      );
    }
  }
  // #endregion
}
