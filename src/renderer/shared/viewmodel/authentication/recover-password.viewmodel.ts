import { stringCouldBeEmail, stringHasMinimalLength } from "../../components/util";
import { RecoverPasswordRequestDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";

export class RecoverPasswordViewmodel extends BaseViewmodel<RecoverPasswordRequestDto> {
  // #region Constructor ------------------------------------------------------
  public constructor(dto: RecoverPasswordRequestDto) {
    super(dto, "update");
    this.setFieldInvalid("userNameOrEmail", null);
    this.registerValidation("userNameOrEmail", () => this.validateUserNameOrEmail());
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private validateUserNameOrEmail(): void {
    if (!stringHasMinimalLength(this._dto.userNameOrEmail, 8) &&
      !stringCouldBeEmail(this._dto.userNameOrEmail)) {
      this.setFieldInvalid(
        "userNameOrEmail",
        { helperText: "Please enter a valid user name or email address", intent: "danger" }
      );
    } else {
      this.setFieldValid("userNameOrEmail");
    }
  }
  // #endregion
}
