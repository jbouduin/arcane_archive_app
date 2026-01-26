import { ProfileDto } from "../../../renderer/shared/dto/profile.dto";

export type SessionDto = {
  token: string;
  refreshToken: string;
  profile: ProfileDto;
  userName: string;
};
