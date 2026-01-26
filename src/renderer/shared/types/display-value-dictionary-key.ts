export type EnumDisplayValueDictionaryKey =
  "colorType" | "frame" | "frameEffect" | "game" | "gameFormat" | "landType" | "layout" | "legality" | "promoType" |
  "rarity" | "scryfallImageStatus" | "securityStamp" | "setType" | "cardCondition";

export type CatalogDisplayValueDictionaryKey = "superType" | "cardType" | "powerValues" | "thoughnessValues";

export type DisplayValueDictionaryKey = EnumDisplayValueDictionaryKey | CatalogDisplayValueDictionaryKey;

export const DISPLAY_VALUE_DICTIONARY_KEYS: EnumDisplayValueDictionaryKey[] = [
  "colorType",
  "frame",
  "frameEffect",
  "game",
  "gameFormat",
  "landType",
  "layout",
  "legality",
  "promoType",
  "rarity",
  "scryfallImageStatus",
  "securityStamp",
  "setType",
  "cardCondition"
];
