import { ProfileDto } from "../../../renderer/shared/dto/profile.dto";

export type LoginResponseDto = {
  token: string;
  refreshToken: string;
  profile: ProfileDto;
};
