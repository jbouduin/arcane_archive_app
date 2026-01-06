import { PreferencesDto } from "../../../common/dto";

export type RegisterRequestDto = {
  userName: string;
  password: string;
  passwordRepeat: string;
  email: string;
  emailRepeat: string;
  firstName: string | null;
  lastName: string | null;
  preferences: PreferencesDto;
};
