import { IBasicDataService, IMtgSetService } from "../context";
import { BaseCardListDto, AppColorDto } from "../dto";
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
    basicDataService: IBasicDataService,
    mtgSetService: IMtgSetService,
    dto: BaseCardListDto) {
    super();
    this.cardId = dto.id;
    const mtgSet = mtgSetService.getSetTreeDtoById(dto.mtgSetId);
    this.setName = mtgSet?.setName || "Unknown set";
    this.setKeyruneCode = mtgSet?.keyruneCode || "DEFAULT";
    this.cardName = dto.cardName;
    this.convertedManaCost = dto.convertedManaCost;
    this.collectorNumber = dto.collectorNumber;
    this.collectorNumberSortValue = dto.collectorNumberSortValue;
    const identityColors = dto.colorIdentities
      .map((color: string) => basicDataService.getColor(color))
      .filter((color: AppColorDto | undefined) => color != undefined)
      .sort((a: AppColorDto, b: AppColorDto) => a.sequence - b.sequence);
    this.colorIdentity = identityColors.map((color: AppColorDto) => color.manaSymbol);
    this.colorIdentitySortValue = dto.colorIdentitiesSortValue;
    this.rarity = dto.rarity;
    this.rarityDisplayValue = basicDataService.getDisplayValue("rarity", dto.rarity);
    this.raritySortValue = dto.raritySortValue;
    this.type = dto.type;
    this.manaCost = this.calculateCardManaCost(dto.manaCost);
    this.power = dto.power;
    this.toughness = dto.toughness;
  }
  // #endregion
}
