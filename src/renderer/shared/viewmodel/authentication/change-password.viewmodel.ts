import { stringHasMinimalLength } from "../../components/util";
import { ChangePasswordRequestDto } from "../../dto";
import { PasswordViewmodel } from "./password-viewmodel";

export type ChangePasswordViewmodelField = "oldPassword";

export class ChangePasswordViewmodel extends PasswordViewmodel<ChangePasswordRequestDto, ChangePasswordViewmodelField> {
  // #region Getters/Setters --------------------------------------------------
  public get oldPassword(): string {
    return this._dto.oldPassword;
  }

  public set oldPassword(value: string) {
    this._dto.oldPassword = value;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: ChangePasswordRequestDto) {
    super(dto, "update");
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  public validateOldPassword(): void {
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
