import { stringHasMinimalLength } from "../../components/util";
import { AccountDto } from "../../dto";
import { ApplicationRole, SelectOption } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";

export class AccountViewmodel extends BaseViewmodel<AccountDto> {
  //#region Public properties -------------------------------------------------
  public readonly allRoles: Array<SelectOption<ApplicationRole>>;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(dto: AccountDto, mode: ViewmodelMode) {
    super(dto, mode);
    this.allRoles = [
      { label: "User", value: "ROLE_USER" },
      { label: "Application Admin", value: "ROLE_APP_ADMIN" },
      { label: "System Administrator", value: "ROLE_SYS_ADMIN" }
    ];
    this.registerValidation("accountName", () => this.validateAccountName());
    this.registerValidation("roles", () => this.validateRoles());
  }
  //#endregion

  //#region Validation methods ------------------------------------------------
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

  private validateRoles(): void {
    if (this._dto.roles.length == 0) {
      this.setFieldInvalid(
        "roles",
        { intent: "danger", helperText: "You have to select at least one role" }
      );
    } else {
      this.setFieldValid("roles");
    }
  }
  //#endregion
}
