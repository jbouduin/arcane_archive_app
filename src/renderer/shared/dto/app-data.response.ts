import { AppColorDto } from "./app-color.dto";
import { CardConditionDto } from "./card-condition.dto";
import { LanguageDto } from "./language.dto";

export type AppDataResponse = {
  appLanguages: Array<LanguageDto>;
  cardConditions: Array<CardConditionDto>;
  cardSuperTypes: Array<string>;
  cardTypes: Array<string>;
  colors: Array<AppColorDto>;
  dictionaries: Map<string, Map<string, string>>;
  mtgLanguages: Array<LanguageDto>;
  powers: Array<string>;
  toughnesses: Array<string>;
};
