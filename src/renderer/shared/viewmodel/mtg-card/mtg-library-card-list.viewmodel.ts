import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService } from "../../context";
import { LanguageDto, MtgLibraryCardListDto } from "../../dto";
import { ColorDto } from "../../dto/color.dto";

export class MtgLibraryCardListViewmodel {
  // #region public fields Members --------------------------------------------
  public readonly setName: string;
  public readonly setKeyruneCode: string;
  public readonly cardName: string;
  public readonly convertedManaCost: number;
  public readonly collectorNumber: string;
  public readonly collectorNumberSortValue: string;
  public readonly colorIdentity: Array<string>;
  public readonly colorIdentitySortValue: string;
  public readonly rarity: string;
  public readonly rarityDisplayValue: string;
  public readonly type: string;
  public readonly manaCost: Array<string>;
  public readonly power: string;
  public readonly thoughness: string;
  public readonly languages: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService,
    dto: MtgLibraryCardListDto) {
    const mtgSet = mtgSetService.getSetById(dto.mtgSetId);
    this.setName = mtgSet?.name["ENGLISH"] || "Unknown set";
    this.setKeyruneCode = mtgSet?.keyruneCode || "DEFAULT";
    this.cardName = dto.cardName;
    this.convertedManaCost = dto.convertedManaCost;
    this.collectorNumber = dto.collectorNumber;
    this.collectorNumberSortValue = isNaN(Number(dto.collectorNumber)) ? dto.collectorNumber : dto.collectorNumber.padStart(4, "0");
    const identityColors = dto.colorIdentity
      .map((color: string) => colorService.getColor(color))
      .filter((color: ColorDto | undefined) => color != undefined)
      .sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence);
    this.colorIdentity = identityColors.map((color: ColorDto) => color.manaSymbol);
    let colorIdentitySortValue = "";
    identityColors.forEach((color: ColorDto) => {
      colorIdentitySortValue = colorIdentitySortValue + color.sequence.toString().padStart(2, "0");
    });
    this.colorIdentitySortValue = colorIdentitySortValue;
    this.rarity = dto.rarity;
    this.rarityDisplayValue = displayValueService.getDisplayValue("rarity", dto.rarity);
    this.type = dto.type;
    this.manaCost = this.calculateCardManaCost(dto.manaCost);
    this.power = dto.power;
    this.thoughness = dto.thoughness;
    this.languages = dto.languages
      .map((lng: string) => languageService.getLanguage(lng))
      .filter((lng: LanguageDto | undefined) => lng != undefined)
      .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence)
      .map((lng: LanguageDto) => lng.buttonText)
      .join(", ");
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private calculateCardManaCost(manacosts: Array<string>): Array<string> {
    const result = new Array<string>();
    manacosts.forEach((cost: string, idx: number) => {
      if (idx > 0) {
        result.push("//");
      }
      result.push(...this.convertManaCost(cost));
    });
    if (result.length == 1 && result[0] == "//") {
      result.pop();
    } else if (result[0] == "//") {
      result.splice(0, 0, "-");
    } else if (result[result.length - 1] == "//") {
      result.push("-");
    }
    return result;
  }

  private convertManaCost(manaCost: string): Array<string> {
    const splittedCellValue = manaCost.split("}");
    splittedCellValue.pop();
    return splittedCellValue.map((s: string, i: number) => {
      /* es-lint-disable-next-line @stylistic/operator-linebreak */
      return i < splittedCellValue.length ? s + "}" : s;
    });
  }
  // #endregion
}
