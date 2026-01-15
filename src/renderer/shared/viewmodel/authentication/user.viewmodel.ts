import { addSelectOption, clearSelection, removeSelectOption, stringCouldBeEmail, stringHasMinimalLength, stringNotNullOrEmpty } from "../../components/util";
import { UserDto } from "../../dto";
import { ApplicationRole, ROLES_SELECT_OPTIONS, SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export type UserViewmodelField = "accountName" | "email";

export class UserViewmodel extends BaseViewmodel<UserDto, UserViewmodelField> {
  // #region Private fields ---------------------------------------------------
  private _selectedRoles: Array<SelectOption<ApplicationRole>>;
  // #endregion

  // #region Getters/Setters: profile -----------------------------------------
  public get idAsString(): string {
    if (this._dto.account.id) {
      return this._dto.account.id.toString();
    } else {
      return "-";
    }
  }

  public get email(): string {
    return this._dto.profile.email;
  }

  public set email(value: string) {
    this._dto.profile.email = value;
  }

  public get firstName(): string {
    return this._dto.profile.firstname || "";
  }

  public set firstName(value: string) {
    this._dto.profile.firstname = stringNotNullOrEmpty(value) ? value : null;
  }

  public get lastName(): string {
    return this._dto.profile.lastName || "";
  }

  public set lastName(value: string) {
    this._dto.profile.lastName = stringNotNullOrEmpty(value) ? value : null;
  }
  // #endregion

  // #region Getters/Setters: account -----------------------------------------
  public get accountName(): string {
    return this._dto.account.accountName;
  }

  public set accountName(value: string) {
    this._dto.account.accountName = value;
  }

  public get accountActive(): boolean {
    return this._dto.account.accountActive;
  }

  public set accountActive(value: boolean) {
    this._dto.account.accountActive = value;
  }

  public get accountLocked(): boolean {
    return this._dto.account.accountLocked;
  }

  public set accountLocked(value: boolean) {
    this._dto.account.accountLocked = value;
  }

  public get accountExpired(): boolean {
    return this._dto.account.accountExpired;
  }

  public set accountExpired(value: boolean) {
    this._dto.account.accountExpired = value;
  }

  public get passwordExpired(): boolean {
    return this._dto.account.passwordExpired;
  }

  public get createdBy(): string {
    return this._dto.profile.createdBy || "-";
  }

  public get createdAtString(): string {
    return this._dto.profile.createdAt != null
      ? new Date(this._dto.profile.createdAt).toLocaleString()
      : "-";
  }

  public get modifiedBy(): string {
    return this._dto.profile.modifiedBy || "-";
  }

  public get modifiedAtString(): string {
    return this._dto.profile.modifiedAt != null
      ? new Date(this._dto.profile.modifiedAt).toLocaleString()
      : "-";
  }

  public get selectedRoles(): Array<SelectOption<ApplicationRole>> {
    return this._selectedRoles;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(userDto: UserDto) {
    super(userDto, "update");
    this._selectedRoles = new Array<SelectOption<ApplicationRole>>();
    ROLES_SELECT_OPTIONS.forEach((option: SelectOption<ApplicationRole>) => {
      if (userDto.account.roles.includes(option.value)) {
        this._selectedRoles.push(option);
      }
    });
    this.validateEmail();
  }

  // #region Add remove role --------------------------------------------------
  public addRole(role: SelectOption<string>): void {
    addSelectOption(this._dto.account.roles, this._selectedRoles, role);
  }

  public removeRole(role: SelectOption<string>): void {
    removeSelectOption(this._dto.account.roles, this._selectedRoles, role);
  }

  public clearSelectedRoles(): void {
    clearSelection(this._dto.account.roles, this._selectedRoles);
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  public validateAccountName(): void {
    if (stringHasMinimalLength(this._dto.account.accountName, 8)) {
      this.setFieldValid("accountName");
    } else {
      this.setFieldInvalid(
        "accountName",
        { helperText: "Username length must be 8 or more", intent: "danger" }
      );
    }
  }

  public validateEmail(): void {
    if (stringCouldBeEmail(this._dto.profile.email)) {
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
