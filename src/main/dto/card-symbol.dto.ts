import { MasterDataDto } from "../../common/dto/mtg-collection";

export type CardSymbolDto = MasterDataDto<string> & {
  /**
   * String Nullable An alternate version of this symbol, if it is possible to write it without curly
   * braces.
   */
  looseVariant: string;

  /**
   * True if it is possible to write this symbol “backwards”. For example, the official symbol {U/P} is sometimes
   * written as {P/U} or {P\U} in informal settings. Note that the Scryfall API never writes symbols backwards in other
   * responses. This field is provided for informational purposes.
   */
  transposable: boolean;

  /*
   * True if this is a mana symbol.
   */
  representsMana: boolean;

  /**
   * A decimal number representing this symbol’s mana value (also knowns as the converted mana
   * cost). Note that mana symbols from funny sets can have fractional mana values.
   * Nullable
   */
  manaValue: number;

  /**
   * True if this symbol is only used on funny cards or Un-cards.
   */
  funny: boolean;

  /**
   * True if the symbol is a hybrid mana symbol. Note that monocolor Phyrexian symbols aren’t considered hybrid.
   */
  hybrid: boolean;

  /**
   * True if the symbol is a Phyrexian mana symbol, i.e. it can be paid with 2 life.
   */
  phyrexian: boolean;

  /**
   * A URI to an SVG image of this symbol on Scryfall’s CDNs.
   * Nullable
   */
  svgUri: string;

  /**
   * An array of colors that this symbol represents.
   */
  colors: Set<string>;

  /**
   * An array of plaintext versions of this symbol that Gatherer uses on old cards to describe original printed text.
   * For example: {W} has ["oW", "ooW"] as alternates.
   * Nullable
   */
  gathererAlternates: Set<string>;
};
