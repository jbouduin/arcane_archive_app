import { addSelectOption, clearSelection, removeSelectOption, stringHasMinimalLength } from "../../components/util";
import { AccountDto } from "../../dto";
import { ApplicationRole, ROLES_SELECT_OPTIONS, SelectOption } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";

export class AccountViewmodel extends BaseViewmodel<AccountDto> {
  // #region Private fields ---------------------------------------------------
  private _selectedRoles: Array<SelectOption<ApplicationRole>>;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get selectedRoles(): Array<SelectOption<ApplicationRole>> {
    return this._selectedRoles;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: AccountDto, mode: ViewmodelMode) {
    super(dto, mode);
    this._selectedRoles = new Array<SelectOption<ApplicationRole>>();
    ROLES_SELECT_OPTIONS.forEach((option: SelectOption<ApplicationRole>) => {
      if (dto.roles.includes(option.value)) {
        this._selectedRoles.push(option);
      }
    });
    this.registerValidation("accountName", () => this.validateAccountName());
  }
  // #endregion

  // #region Add remove role --------------------------------------------------
  public addRole(role: SelectOption<string>): void {
    addSelectOption(this._dto.roles, this._selectedRoles, role);
  }

  public removeRole(role: SelectOption<string>): void {
    removeSelectOption(this._dto.roles, this._selectedRoles, role);
  }

  public clearSelectedRoles(): void {
    clearSelection(this._dto.roles, this._selectedRoles);
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  private validateAccountName(): void {
    // LATER must become async as in register (currently no issue, as the field is readonly)
    if (stringHasMinimalLength(this._dto.accountName, 8)) {
      this.setFieldValid("accountName");
    } else {
      this.setFieldInvalid(
        "accountName",
        { helperText: "Username length must be 8 or more", intent: "danger" }
      );
    }
  }
  // #endregion
}
