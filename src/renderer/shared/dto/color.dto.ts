import { MasterDataDto } from "../../../common/dto";

export type ColorDto = MasterDataDto<string> & {
  sequence: number;
  code: string;
  manaSymbol: string;
};
