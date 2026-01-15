import { stringCouldBeEmail, stringHasMinimalLength } from "../../components/util";
import { IServiceContainer } from "../../context";
import { RegisterRequestDto } from "../../dto";
import { PasswordViewmodel } from "./password.viewmodel";

export class RegisterViewmodel extends PasswordViewmodel<RegisterRequestDto> {
  // #region Private fields ---------------------------------------------------
  private serviceContainer: IServiceContainer;
  // #endregion

  // #region non Dto related properties ---------------------------------------
  public readonly showLoginButton: boolean;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: RegisterRequestDto, showLoginButton: boolean, serviceContainer: IServiceContainer) {
    super(dto, "create");
    this.showLoginButton = showLoginButton;
    this.serviceContainer = serviceContainer;
    this.registerValidation("email", () => this.validateEmail());
    this.registerValidation("emailRepeat", () => this.validateEmailRepeat());
    this.registerAsyncValidation("userName", (signal: AbortSignal) => this.validateUserName(signal));
    this.markTouched("userName");
  }
  // #endregion

  // #region Validation methods -----------------------------------------------
  private async validateUserName(signal: AbortSignal): Promise<void> {
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
      const userExists = await this.serviceContainer.sessionService
        .userExistsNew(this.serviceContainer.arcaneArchiveProxy, this._dto.userName, signal);
      if (userExists) {
        this.setFieldInvalid("userName", { helperText: "Username already in use", intent: "danger" });
      } else {
        this.setFieldValid("userName");
      }
    }
    return Promise.resolve();
  }

  private validateEmail(): void {
    // we do not immediately go to server to check if email already in use, as this would unnecessary expose known email addresses
    if (stringCouldBeEmail(this._dto.email)) {
      this.setFieldValid("email");
    } else {
      this.setFieldInvalid(
        "email",
        { helperText: "Please enter a valid email address", intent: "danger" }
      );
    }
    this.validateEmailRepeat();
  }

  private validateEmailRepeat(): void {
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
