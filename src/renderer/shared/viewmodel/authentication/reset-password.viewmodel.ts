import { stringHasMinimalLength } from "../../components/util";
import { ResetPasswordRequestDto } from "../../dto";
import { PasswordViewmodel } from "./password-viewmodel";

export type ResetPasswordViewmodelField = "resetToken";

export class ResetPasswordViewmodel extends PasswordViewmodel<ResetPasswordRequestDto, ResetPasswordViewmodelField> {
  // #region Getters/Setters --------------------------------------------------
  public get resetToken(): string {
    return this._dto.resetToken;
  }

  public set resetToken(value: string) {
    this._dto.resetToken = value;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: ResetPasswordRequestDto) {
    super(dto, "update");
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  public validateResetToken(): void {
    if (!stringHasMinimalLength(this._dto.resetToken, 16)) {
      this.setFieldInvalid(
        "resetToken",
        { helperText: "The token is invalid.", intent: "danger" }
      );
    } else {
      const decoded = atob(this._dto.resetToken).split(String.fromCharCode(7));
      if (decoded.length < 4) {
        this.setFieldInvalid(
          "resetToken",
          { helperText: "The token is invalid.", intent: "danger" }
        );
      } else {
        const expiry = Date.parse(decoded[3]);
        if (expiry < Date.now()) {
          this.setFieldInvalid(
            "resetToken",
            { helperText: "The token has expired.", intent: "danger" }
          );
        } else {
          this._dto.userName = decoded[0];
          this._dto.email = decoded[1];
          this.setFieldValid("resetToken");
        }
      }
    }
  }
  // #endregion
}
