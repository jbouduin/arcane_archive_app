import { ProfileDto } from "../../dto";
import { ApplicationRole } from "../../types";

export type SessionChangeEvent = {
  profile: ProfileDto;
  roles: Set<ApplicationRole>;
  token: string;
  userName: string;
};
