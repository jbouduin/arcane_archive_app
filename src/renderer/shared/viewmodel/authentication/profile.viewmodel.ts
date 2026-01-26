import { stringCouldBeEmail } from "../../components/util";
import { ProfileDto, UserDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";
import { AccountViewmodel } from "./account.viewmodel";

export class ProfileViewmodel extends BaseViewmodel<ProfileDto> {
  // #region Private fields ---------------------------------------------------
  private _accountViewmodel: AccountViewmodel;
  // #endregion

  // #region Getters/Setters: account -----------------------------------------
  public get accountViewmodel(): AccountViewmodel {
    return this._accountViewmodel;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(userDto: UserDto) {
    super(userDto.profile, "update");
    this._accountViewmodel = new AccountViewmodel(userDto.account, "update");
    this.registerChildViewmodel(this._accountViewmodel);
    this.registerValidation("email", () => this.validateEmail());
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  private validateEmail(): void {
    if (stringCouldBeEmail(this._dto.email)) {
      this.setFieldValid("email");
    } else {
      this.setFieldInvalid(
        "email",
        { helperText: "Please enter a valid email address", intent: "danger" }
      );
    }
  }
  // #endregion
}
