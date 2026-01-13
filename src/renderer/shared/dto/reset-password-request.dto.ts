import { PasswordDto } from "./password.dto";

export type ResetPasswordRequestDto = PasswordDto & {
  resetToken: string;
};
