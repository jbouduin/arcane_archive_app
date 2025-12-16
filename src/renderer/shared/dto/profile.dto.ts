import { PreferencesDto } from "../../../common/dto";
import { AuditableDto } from "../../../common/dto/mtg-collection";

export type ProfileDto = AuditableDto & {
  email: string;
  firstname: string | null;
  lastName: string | null;
  preferences: PreferencesDto;
};
