import { ColorDto } from "./color.dto";

export type CardFilterParamsDto = {
  abilities: Array<string>;
  actions: Array<string>;
  cardColors: Array<ColorDto>;
  cardNames: Array<string>;
  identityColors: Array<ColorDto>;
  gameFormats: Array<string>;
  producedManaColors: Array<ColorDto>;
  powers: Array<string>;
  rarities: Array<string>;
  subTypes: Array<string>;
  superTypes: Array<string>;
  toughnesses: Array<string>;
  types: Array<string>;
};
