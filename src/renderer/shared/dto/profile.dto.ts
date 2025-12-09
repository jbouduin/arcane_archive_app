import { AuditableDto } from "../../../common/dto/mtg-collection";

export type ProfileDto = AuditableDto & {
  email: string;
  firstname: string | null;
  lastName: string | null;
};
