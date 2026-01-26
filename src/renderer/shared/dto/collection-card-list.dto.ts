export type CollectionCardListDto = {
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
  language: string;
  collectorNumberSortValue: string;
  colorIdentitiesSortValue: string;
  raritySortValue: number;
};
