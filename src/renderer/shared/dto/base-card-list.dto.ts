import { MasterDataDto } from "../../../common/dto";

export type BaseCardListDto = MasterDataDto<string> & {
  id: number;
  mtgSetId: number;
  cardName: string;
  convertedManaCost: number;
  collectorNumber: string;
  rarity: string;
  type: string;
  manaCost: Array<string>;
  power: string;
  toughness: string;
  colorIdentities: Array<string>;
  collectorNumberSortValue: string;
  colorIdentitiesSortValue: string;
  raritySortValue: number;
};
