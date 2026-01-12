import { stringCouldBeEmail, stringHasMinimalLength, stringNotNullOrEmpty } from "../../components/util";
import { IServiceContainer } from "../../context";
import { RegisterRequestDto } from "../../dto";
import { PasswordViewmodel } from "./password-viewmodel";

export type RegisterViewmodelField = "emailRepeat";

// BUG when changing password after repeat password has been entered -> no error on non matching pwd's
// Check if this is also case in change password dialog
export class RegisterViewmodel extends PasswordViewmodel<RegisterRequestDto, RegisterViewmodelField> {
  // #region non Dto related properties ---------------------------------------
  public readonly showLoginButton: boolean;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get emailRepeat(): string {
    return this._dto.emailRepeat;
  }

  public set emailRepeat(value: string) {
    this._dto.emailRepeat = value;
  }

  public get firstName(): string {
    return this._dto.firstName || "";
  }

  public set firstName(value: string) {
    this._dto.firstName = stringNotNullOrEmpty(value) ? value : null;
  }

  public get lastName(): string {
    return this._dto.lastName || "";
  }

  public set lastName(value: string) {
    this._dto.lastName = stringNotNullOrEmpty(value) ? value : null;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: RegisterRequestDto, showLoginButton: boolean) {
    super(dto, "create");
    this.showLoginButton = showLoginButton;
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  public async validateUserName(serviceContainer: IServiceContainer): Promise<void> {
    if (!stringHasMinimalLength(this._dto.userName, 8)) {
      this.setFieldInvalid(
        "userName",
        { helperText: "Username length must be 8 or more", intent: "danger" }
      );
    } else if (stringCouldBeEmail(this._dto.userName)) {
      this.setFieldInvalid(
        "userName",
        { helperText: "Username may not be an email address", intent: "danger" }
      );
    } else {
      const userExists = await serviceContainer.sessionService
        .userExists(serviceContainer.arcaneArchiveProxy, this._dto.userName);
      if (userExists) {
        this.setFieldInvalid("userName", { helperText: "Username already in use", intent: "danger" });
      } else {
        this.setFieldValid("userName");
      }
    }
    return Promise.resolve();
  }

  public validateEmail(): void {
    // we do not immediately go to server to check if email already in use, as this would unnecessary expose known email addresses
    if (stringCouldBeEmail(this._dto.email)) {
      this.setFieldValid("email");
    } else {
      this.setFieldInvalid(
        "email",
        { helperText: "Please enter a valid email address", intent: "danger" }
      );
    }
  }

  public validateEmailRepeat(): void {
    if (this._dto.email == this._dto.emailRepeat) {
      this.setFieldValid("emailRepeat");
    } else {
      this.setFieldInvalid(
        "emailRepeat",
        { helperText: "Email and repeated email do not correspond", intent: "danger" }
      );
    }
  }
  // #endregion
}
