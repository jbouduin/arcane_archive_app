import { LoginRequestDto } from "../../../../common/dto";
import { stringCouldBeEmail, stringHasMinimalLength } from "../../components/util";
import { BaseViewmodelNew } from "../base.viewmodel-new";

export class LoginViewmodel extends BaseViewmodelNew<LoginRequestDto> {
  // #region Private fields ---------------------------------------------------
  private _selectedExistingPassword: string | null;
  // #endregion

  // #region non Dto related properties ---------------------------------------
  public readonly showRegisterButton: boolean;
  public readonly savedUserNames: Set<string>;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public set selectedExistingPassword(value: string) {
    this._selectedExistingPassword = value;
  }

  public get modifiedPasswordOfExistingUser(): boolean {
    return this.savedUserNames.has(this._dto.user) && this._dto.password != this._selectedExistingPassword;
  }

  public get nonExistinguser(): boolean {
    return !this.savedUserNames.has(this._dto.user);
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: LoginRequestDto, showRegisterButton: boolean, savedUsernames: Array<string>) {
    super(dto);
    this.showRegisterButton = showRegisterButton;
    this.savedUserNames = new Set<string>(savedUsernames);
    this._selectedExistingPassword = null;
    this.registerValidation("password", () => this.validatePassword());
    this.registerValidation("user", () => this.validateUser());
  }
  // #endregion

  // #region Auxiliary Validation Methods -------------------------------------
  private validatePassword(): void {
    if (stringHasMinimalLength(this._dto.password, 8)) {
      this.setFieldValid("password");
    } else {
      this.setFieldInvalid(
        "password",
        { helperText: "Password length must be 8 or more", intent: "danger" }
      );
    }
  }

  private validateUser(): void {
    if (stringHasMinimalLength(this._dto.user, 8) || stringCouldBeEmail(this._dto.user)) {
      this.setFieldValid("user");
    } else {
      this.setFieldInvalid(
        "user",
        { helperText: "Please enter a valid user name or email address", intent: "danger" }
      );
    }
  }
  // #endregion
}
