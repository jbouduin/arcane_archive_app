import { MasterDataDto } from "../../../common/dto/mtg-collection";

export type MtgLibraryCardListDto = MasterDataDto<string> & {
  mtgSetId: number;
  cardName: string;
  convertedManaCost: number;
  collectorNumber: string;
  rarity: string;
  type: string;
  manaCost: Array<string>;
  power: string;
  thoughness: string;
  colorIdentity: Array<string>;
  languages: Array<string>;
};
