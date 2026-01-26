import { IColorService, IDisplayValueService, IMtgSetService } from "../context";
import { BaseCardListDto, ColorDto } from "../dto";
import { AbstractCardViewmodel } from "./abstract-card.viewmodel";

export class AbstractCardListViewmodel extends AbstractCardViewmodel {
  // #region public fields Members --------------------------------------------
  public readonly cardId: number;
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
  public readonly raritySortValue: number;
  public readonly type: string;
  public readonly manaCost: Array<string>;
  public readonly power: string;
  public readonly toughness: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    mtgSetService: IMtgSetService,
    dto: BaseCardListDto) {
    super();
    this.cardId = dto.id;
    const mtgSet = mtgSetService.getSetById(dto.mtgSetId);
    this.setName = mtgSet?.setName || "Unknown set";
    this.setKeyruneCode = mtgSet?.keyruneCode || "DEFAULT";
    this.cardName = dto.cardName;
    this.convertedManaCost = dto.convertedManaCost;
    this.collectorNumber = dto.collectorNumber;
    this.collectorNumberSortValue = dto.collectorNumberSortValue;
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
  }
  // #endregion
}
