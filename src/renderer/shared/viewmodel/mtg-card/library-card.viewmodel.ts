import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService } from "../../context";
import { LanguageDto, LibraryCardDto, LibraryLegality } from "../../dto";
import { CardLayout } from "../../types/card-layout";
import { ColorDto } from "../../dto/color.dto";
import { LibraryCardLanguageDto } from "../../dto/library-card-language.dto";
import { LibraryCardfaceDto } from "../../dto/library-cardface.dto";
import { AbstractCardViewmodel } from "./abstract-card.viewmodel";
import { LibraryCardLanguageViewmodel } from "./library-card-language.viewmodel";
import { LibraryCardfaceViewmodel } from "./library-cardface.viewmodel";

export class LibraryCardViewmodel extends AbstractCardViewmodel {
  // #region Fields -----------------------------------------------------------
  public readonly id: number;
  public readonly code: string;
  public readonly cardName: string;
  public readonly cardBackId: string | null;
  public readonly setCode: string;
  public readonly tokenSetCode: string;
  public readonly setKeyruneCode: string;
  public readonly collectorNumber: string;
  public readonly colorIdentity: Array<string>;
  public readonly languages: Array<string>;
  public readonly displayLanguages: Array<string>;
  public readonly rarity: string;
  public readonly layout: CardLayout;
  public readonly manaCost: Array<string>;
  public readonly typeline: string;
  public readonly cardLanguages: Map<string, LibraryCardLanguageViewmodel>;
  public readonly legalities: Map<string, string>;
  public readonly oracleId: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService,
    dto: LibraryCardDto) {
    super();
    // --- sort card faces and languages ---
    dto.cardfaces.sort((a: LibraryCardfaceDto, b: LibraryCardfaceDto) => a.sequence - b.sequence);
    dto.cardLanguages.sort((a: LibraryCardLanguageDto, b: LibraryCardLanguageDto) => {
      const languageA = languageService.getLanguage(a.language)?.sequence || 0;
      const languageB = languageService.getLanguage(b.language)?.sequence || 0;
      return languageA - languageB;
    });
    // --- assign card fields ---
    this.id = dto.id;
    this.code = dto.code;
    this.cardName = dto.cardName;
    this.cardBackId = dto.cardBackId;
    const mtgSet = mtgSetService.getSetById(dto.mtgSetId);
    this.setCode = mtgSet?.code || "";
    this.tokenSetCode = mtgSet?.tokenSetCode || "";
    this.setKeyruneCode = mtgSet?.keyruneCode || "DEFAULT";
    this.collectorNumber = dto.collectorNumber;
    this.colorIdentity = dto.colorIdentities
      .map((color: string) => colorService.getColor(color))
      .filter((color: ColorDto | undefined) => color != undefined)
      .sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence)
      .map((color: ColorDto) => color.manaSymbol);
    this.displayLanguages = new Array<string>();
    this.languages = new Array<string>();
    dto.cardLanguages
      .map((cardLanguage: LibraryCardLanguageDto) => cardLanguage.language)
      .forEach((lng: string) => {
        this.languages.push(lng);
        const lngDto: LanguageDto | undefined = languageService.getLanguage(lng);
        this.displayLanguages.push(lngDto?.buttonText ?? lng);
      });
    this.rarity = dto.rarity;
    this.layout = dto.layout;
    this.manaCost = this.calculateCardManaCost(dto.cardfaces.map((cardface: LibraryCardfaceDto) => cardface.manaCost));
    this.cardLanguages = this.createCardLanguageViewmodels(dto);
    const firstLanguage = this.cardLanguages.values().next().value!;
    this.typeline = Array.of(...firstLanguage.cardfaces.values())
      .map((lcfvm: LibraryCardfaceViewmodel) => lcfvm.printedTypeLine)
      .join(" // ");
    this.legalities = new Map<string, string>();
    dto.legalities.forEach((l: LibraryLegality) => {
      this.legalities.set(displayValueService.getDisplayValue("gameFormat", l.gameFormat), displayValueService.getDisplayValue("legality", l.legality));
    });
    this.oracleId = dto.cardfaces[0].oracleId;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private createCardLanguageViewmodels(dto: LibraryCardDto): Map<string, LibraryCardLanguageViewmodel> {
    const result = new Map<string, LibraryCardLanguageViewmodel>();
    dto.cardLanguages.forEach((cardLanguageDto: LibraryCardLanguageDto) => {
      const cardLanguageViewmodel: LibraryCardLanguageViewmodel = new LibraryCardLanguageViewmodel(dto, cardLanguageDto.language);
      result.set(cardLanguageDto.language, cardLanguageViewmodel);
    });
    return result;
  }
  // #endregion
}
