import { MasterDataDto } from "../../../common/dto/mtg-collection";

export type ColorDto = MasterDataDto<string> & {
  sequence: number;
  code: string;
  manaSymbol: string;
};
