import { stringHasMinimalLength } from "../../components/util";
import { ChangePasswordRequestDto } from "../../dto";
import { PasswordViewmodel } from "./password.viewmodel";

export class ChangePasswordViewmodel extends PasswordViewmodel<ChangePasswordRequestDto> {
  // #region Constructor ------------------------------------------------------
  public constructor(dto: ChangePasswordRequestDto) {
    super(dto, "update");
    this.registerValidation("oldPassword", () => this.validateOldPassword());
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  private validateOldPassword(): void {
    if (!stringHasMinimalLength(this._dto.oldPassword, 8) ||
      this._dto.oldPassword.toLocaleLowerCase().includes(this._dto.userName) ||
      this._dto.oldPassword.toLocaleLowerCase().includes(this._dto.email)) {
      this.setFieldInvalid(
        "oldPassword",
        { helperText: "Enter a valid password", intent: "danger" }
      );
    } else {
      this.setFieldValid("oldPassword");
    }
  }
  // #endregion
}
