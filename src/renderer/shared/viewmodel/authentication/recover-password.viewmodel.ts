import { stringCouldBeEmail, stringHasMinimalLength } from "../../components/util";
import { RecoverPasswordRequestDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";

export type RecoverPasswordViewmodelField = "userNameOrEmail";

export class RecoverPasswordViewmodel extends BaseViewmodel<RecoverPasswordRequestDto, RecoverPasswordViewmodelField> {
  // #region Getters/Setters --------------------------------------------------
  public get userNameOrEmail(): string {
    return this._dto.userNameOrEmail;
  }

  public set userNameOrEmail(value: string) {
    this._dto.userNameOrEmail = value;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: RecoverPasswordRequestDto) {
    super(dto, "update");
    this.setFieldInvalid("userNameOrEmail", null);
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  public validateUserNameOrEmail(): void {
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
