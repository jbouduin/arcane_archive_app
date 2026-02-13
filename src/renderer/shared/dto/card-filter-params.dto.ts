import { AppColorDto } from "./app-color.dto";

export type CardFilterParamsDto = {
  abilities: Array<string>;
  actions: Array<string>;
  cardColors: Array<AppColorDto>;
  cardNames: Array<string>;
  identityColors: Array<AppColorDto>;
  gameFormats: Array<string>;
  producedManaColors: Array<AppColorDto>;
  powers: Array<string>;
  rarities: Array<string>;
  subTypes: Array<string>;
  superTypes: Array<string>;
  toughnesses: Array<string>;
  types: Array<string>;
};
