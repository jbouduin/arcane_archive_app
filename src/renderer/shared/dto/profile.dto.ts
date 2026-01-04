import { AuditableDto, PreferencesDto } from "../../../common/dto";

export type ProfileDto = AuditableDto & {
  email: string;
  firstname: string | null;
  lastName: string | null;
  preferences: PreferencesDto;
};
