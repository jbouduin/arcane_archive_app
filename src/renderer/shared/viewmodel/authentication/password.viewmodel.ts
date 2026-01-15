import zxcvbn, { ZXCVBNResult, ZXCVBNScore } from "zxcvbn";
import { stringHasMinimalLength } from "../../components/util";
import { PasswordDto } from "../../dto";
import { viewmodelMode } from "../base.viewmodel";
import { BaseViewmodelNew } from "../base.viewmodel-new";

export abstract class PasswordViewmodel<T extends PasswordDto> extends BaseViewmodelNew<T> {
  // #region Private fields ---------------------------------------------------
  private zXCVBNResult: ZXCVBNResult | undefined;
  private _passwordValidation: string | undefined;
  private readonly passwordDict: Array<string>;
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
  public constructor(dto: T, mode: viewmodelMode) {
    super(dto, mode);
    this.passwordDict = [
      "magic",
      "the",
      "gathering",
      "magic the gathering"
    ];
    this.registerValidation("passwordRepeat", () => this.validatePasswordRepeat());
    this.registerValidation("password", () => this.validatePassword());
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  private validatePasswordRepeat(): void {
    if (this._dto.password == this._dto.passwordRepeat) {
      this.setFieldValid("passwordRepeat");
    } else {
      this.setFieldInvalid(
        "passwordRepeat",
        { helperText: "Password and repeated password do not correspond", intent: "danger" }
      );
    }
  }

  private validatePassword(): void {
    if (stringHasMinimalLength(this._dto.password, 8)) {
      if ((this.isTouched("userName") && this._dto.password.toLocaleLowerCase().includes(this._dto.userName.toLocaleLowerCase())) ||
        (this.isTouched("email") && this._dto.password.toLocaleLowerCase().includes(this._dto.email.toLocaleLowerCase()))) {
        this.setFieldInvalid("password", null);
        this._passwordValidation = "Password cannot contain your username or email address";
        this.zXCVBNResult = undefined;
      } else {
        this._passwordValidation = undefined;
        this.zXCVBNResult = zxcvbn(this._dto.password, [this._dto.userName, this._dto.email, ...this.passwordDict]);
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
  // #endregion
}
