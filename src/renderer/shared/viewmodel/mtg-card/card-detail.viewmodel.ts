import { IBasicDataService, IMtgSetService } from "../../context";
import { LanguageDto, CardDetailDto, LibraryLegality } from "../../dto";
import { AppColorDto } from "../../dto/app-color.dto";
import { CardLanguageDetailDto } from "../../dto/card-language-detail.dto";
import { CardfaceDetailDto } from "../../dto/cardface-detail.dto";
import { CardLayout } from "../../types/card-layout";
import { AbstractCardViewmodel } from "../abstract-card.viewmodel";
import { LibraryCardLanguageViewmodel } from "./library-card-language.viewmodel";
import { LibraryCardfaceViewmodel } from "./library-cardface.viewmodel";

export class CardDetailViewmodel extends AbstractCardViewmodel {
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
  public readonly languages: Array<LanguageDto>;
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
    basicDataService: IBasicDataService,
    mtgSetService: IMtgSetService,
    dto: CardDetailDto) {
    super();
    // --- sort card faces and languages ---
    dto.cardfaces.sort((a: CardfaceDetailDto, b: CardfaceDetailDto) => a.sequence - b.sequence);
    dto.cardLanguages.sort((a: CardLanguageDetailDto, b: CardLanguageDetailDto) => {
      const languageA = basicDataService.getLanguage(a.language)?.sequence || 0;
      const languageB = basicDataService.getLanguage(b.language)?.sequence || 0;
      return languageA - languageB;
    });
    // --- assign card fields ---
    this.id = dto.id!;
    this.code = dto.code;
    this.cardName = dto.cardName;
    this.cardBackId = dto.cardBackId;
    const mtgSet = mtgSetService.getSetTreeDtoById(dto.mtgSetId);
    this.setCode = mtgSet?.code || "";
    this.tokenSetCode = mtgSet?.tokenSetCode || "";
    this.setKeyruneCode = mtgSet?.keyruneCode || "DEFAULT";
    this.collectorNumber = dto.collectorNumber;
    this.colorIdentity = dto.colorIdentities
      .map((color: string) => basicDataService.getColor(color))
      .filter((color: AppColorDto | undefined) => color != undefined)
      .sort((a: AppColorDto, b: AppColorDto) => a.sequence - b.sequence)
      .map((color: AppColorDto) => color.manaSymbol);
    this.languages = dto.cardLanguages
      .map((cardLanguage: CardLanguageDetailDto) => basicDataService.getLanguage(cardLanguage.language))
      .filter((lng: LanguageDto | undefined) => lng != undefined)
      .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence);
    this.rarity = dto.rarity;
    this.layout = dto.layout;
    this.manaCost = this.calculateCardManaCost(
      dto.cardfaces.map((cardface: CardfaceDetailDto) => cardface.manaCost)
    );
    this.cardLanguages = this.createCardLanguageViewmodels(dto);
    const firstLanguage = this.cardLanguages.values().next().value!;
    this.typeline = Array.of(...firstLanguage.cardfaces.values())
      .map((lcfvm: LibraryCardfaceViewmodel) => lcfvm.printedTypeLine)
      .join(" // ");
    this.legalities = new Map<string, string>();
    dto.legalities.forEach((l: LibraryLegality) => {
      this.legalities.set(
        basicDataService.getDisplayValue("gameFormat", l.gameFormat),
        basicDataService.getDisplayValue("legality", l.legality)
      );
    });
    this.oracleId = dto.cardfaces[0].oracleId;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private createCardLanguageViewmodels(dto: CardDetailDto): Map<string, LibraryCardLanguageViewmodel> {
    const result = new Map<string, LibraryCardLanguageViewmodel>();
    dto.cardLanguages.forEach((cardLanguageDto: CardLanguageDetailDto) => {
      const cardLanguageViewmodel = new LibraryCardLanguageViewmodel(dto, cardLanguageDto.language);
      result.set(cardLanguageDto.language, cardLanguageViewmodel);
    });
    return result;
  }
  // #endregion
}
