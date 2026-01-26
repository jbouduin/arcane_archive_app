import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService } from "../../context";
import { CollectionCardListDto, ColorDto } from "../../dto";
import { AbstractCardViewmodel } from "../abstract-card.viewmodel";

// TODO create an AbstractCardListViewmodel as superclass and use it for LibraryCardListVIewmodel also
export class CollectionCardListViewmodel extends AbstractCardViewmodel {
  public readonly cardId: number;
  public readonly cardName: string;
  public readonly setName: string;
  public readonly setKeyruneCode: string;
  public readonly collectorNumber: string;
  public readonly collectorNumberSortValue: string;
  public readonly colorIdentity: Array<string>;
  public readonly colorIdentitySortValue: string;
  public readonly convertedManaCost: number;
  public readonly language: string;
  public readonly rarity: string;
  public readonly rarityDisplayValue: string;
  public readonly raritySortValue: number;
  public readonly type: string;
  public readonly manaCost: Array<string>;
  public readonly power: string;
  public readonly toughness: string;

  public constructor(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService,
    dto: CollectionCardListDto) {
    super();
    this.cardId = dto.id;
    this.cardName = dto.cardName;
    const mtgSet = mtgSetService.getSetById(dto.mtgSetId);
    this.setName = mtgSet?.setName || "Unknown set";
    this.setKeyruneCode = mtgSet?.keyruneCode || "DEFAULT";
    this.collectorNumber = dto.collectorNumber;
    this.collectorNumberSortValue = dto.collectorNumberSortValue;
    this.convertedManaCost = dto.convertedManaCost;
    const identityColors = dto.colorIdentities
      .map((color: string) => colorService.getColor(color))
      .filter((color: ColorDto | undefined) => color != undefined)
      .sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence);
    this.colorIdentity = identityColors.map((color: ColorDto) => color.manaSymbol);
    this.colorIdentitySortValue = dto.colorIdentitiesSortValue;
    this.rarity = dto.rarity;
    this.rarityDisplayValue = displayValueService.getDisplayValue("rarity", dto.rarity);
    this.raritySortValue = dto.raritySortValue;
    this.type = dto.type;
    this.manaCost = this.calculateCardManaCost(dto.manaCost);
    this.power = dto.power;
    this.toughness = dto.toughness;
    this.language = languageService.getLanguage(dto.language)?.buttonText || "?";
  }
}
