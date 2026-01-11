import { PreferencesDto } from "../../../common/dto";
import { PasswordDto } from "./password.dto";

export type RegisterRequestDto = PasswordDto & {
  emailRepeat: string;
  firstName: string | null;
  lastName: string | null;
  preferences: PreferencesDto;
};
