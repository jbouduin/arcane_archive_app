import { AccountDto } from "./account.dto";
import { ProfileDto } from "./profile.dto";

export type UserDto = {
  account: AccountDto;
  profile: ProfileDto;
};
