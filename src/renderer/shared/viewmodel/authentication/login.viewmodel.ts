import { stringsNotNullOrEmpty } from "../../components/util";
import { LoginRequestDto } from "../../dto/login-request.dto";
import { BaseViewmodel } from "../base.viewmodel";

export class LoginViewmodel extends BaseViewmodel<LoginRequestDto> {
  // #region BaseViewmodel Members --------------------------------------------
  public get isValid(): boolean {
    return stringsNotNullOrEmpty(this._dto.user, this._dto.password);
  }
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get user(): string {
    return this._dto.user;
  }

  public set user(value: string) {
    this._dto.user = value;
  }

  public get password(): string {
    return this._dto.password;
  }

  public set password(value: string) {
    this._dto.password = value;
  }
  // #endregion
}
