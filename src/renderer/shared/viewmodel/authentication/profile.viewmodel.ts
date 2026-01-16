import { stringCouldBeEmail } from "../../components/util";
import { ProfileDto, UserDto } from "../../dto";
import { BaseViewmodelNew } from "../base.viewmodel-new";
import { AccountViewmodel } from "./account.viewmodel";

export class ProfileViewmodel extends BaseViewmodelNew<ProfileDto> {
  // #region Private fields ---------------------------------------------------
  // private _selectedRoles: Array<SelectOption<ApplicationRole>>;
  private _accountViewmodel: AccountViewmodel;
  // #endregion

  // #region Getters/Setters: profile -----------------------------------------
  // public get idAsString(): string {
  //   if (this._dto.account.id) {
  //     return this._dto.account.id.toString();
  //   } else {
  //     return "-";
  //   }
  // }

  // public get email(): string {
  //   return this._dto.profile.email;
  // }

  // public set email(value: string) {
  //   this._dto.profile.email = value;
  // }

  // public get firstName(): string {
  //   return this._dto.profile.firstname || "";
  // }

  // public set firstName(value: string) {
  //   this._dto.profile.firstname = stringNotNullOrEmpty(value) ? value : null;
  // }

  // public get lastName(): string {
  //   return this._dto.profile.lastName || "";
  // }

  // public set lastName(value: string) {
  //   this._dto.profile.lastName = stringNotNullOrEmpty(value) ? value : null;
  // }
  // #endregion

  // #region Getters/Setters: account -----------------------------------------
  public get accountViewmodel(): AccountViewmodel {
    return this._accountViewmodel;
  }

  // public get accountName(): string {
  //   return this._dto.account.accountName;
  // }

  // public set accountName(value: string) {
  //   this._dto.account.accountName = value;
  // }

  // public get accountActive(): boolean {
  //   return this._dto.account.accountActive;
  // }

  // public set accountActive(value: boolean) {
  //   this._dto.account.accountActive = value;
  // }

  // public get accountLocked(): boolean {
  //   return this._dto.account.accountLocked;
  // }

  // public set accountLocked(value: boolean) {
  //   this._dto.account.accountLocked = value;
  // }

  // public get accountExpired(): boolean {
  //   return this._dto.account.accountExpired;
  // }

  // public set accountExpired(value: boolean) {
  //   this._dto.account.accountExpired = value;
  // }

  // public get passwordExpired(): boolean {
  //   return this._dto.account.passwordExpired;
  // }

  // public get createdBy(): string {
  //   return this._dto.profile.createdBy || "-";
  // }

  // public get createdAtString(): string {
  //   return this._dto.profile.createdAt != null
  //     ? new Date(this._dto.profile.createdAt).toLocaleString()
  //     : "-";
  // }

  // public get modifiedBy(): string {
  //   return this._dto.profile.modifiedBy || "-";
  // }

  // public get modifiedAtString(): string {
  //   return this._dto.profile.modifiedAt != null
  //     ? new Date(this._dto.profile.modifiedAt).toLocaleString()
  //     : "-";
  // }

  // public get selectedRoles(): Array<SelectOption<ApplicationRole>> {
  //   return this._selectedRoles;
  // }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(userDto: UserDto) {
    super(userDto.profile, "update");
    this._accountViewmodel = new AccountViewmodel(userDto.account, "update");
    this.registerChildViewmodel(this._accountViewmodel);
    // this._selectedRoles = new Array<SelectOption<ApplicationRole>>();
    // ROLES_SELECT_OPTIONS.forEach((option: SelectOption<ApplicationRole>) => {
    //   if (userDto.account.roles.includes(option.value)) {
    //     this._selectedRoles.push(option);
    //   }
    // });
    this.registerValidation("email", () => this.validateEmail());
    // TODO: maybe when updating validate all (at least the synchronous ones) and mark as touched
  }

  // // #region Add remove role --------------------------------------------------
  // public addRole(role: SelectOption<string>): void {
  //   addSelectOption(this._dto.account.roles, this._selectedRoles, role);
  // }

  // public removeRole(role: SelectOption<string>): void {
  //   removeSelectOption(this._dto.account.roles, this._selectedRoles, role);
  // }

  // public clearSelectedRoles(): void {
  //   clearSelection(this._dto.account.roles, this._selectedRoles);
  // }
  // // #endregion

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
