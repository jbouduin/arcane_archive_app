import { PasswordDto } from "./password.dto";

export type ChangePasswordRequestDto = PasswordDto & {
  oldPassword: string;
};
