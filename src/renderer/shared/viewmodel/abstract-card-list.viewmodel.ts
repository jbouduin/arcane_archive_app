import { IBasicDataService, IMtgSetService } from "../context";
import { AppColorDto, BaseCardListDto } from "../dto";
import { AbstractCardViewmodel } from "./abstract-card.viewmodel";

export class AbstractCardListViewmodel<Dto extends BaseCardListDto> extends AbstractCardViewmodel {
  //#region Private fields ----------------------------------------------------
  private readonly _dto: Dto;
  //#endregion

  //#region Public properties -------------------------------------------------
  public readonly setName: string;
  public readonly setKeyruneCode: string;
  public readonly colorIdentity: Array<string>;
  public readonly rarityDisplayValue: string;
  public readonly manaCost: Array<string>;
  //#endregion

  //#region Getters -----------------------------------------------------------
  public get dto(): Dto {
    return this._dto;
  }

  public get cardId(): number {
    return this._dto.id;
  }

  public get cardCode(): string {
    return this._dto.code;
  }

  public get cardName(): string {
    return this._dto.cardName;
  }

  public get convertedManaCost(): number {
    return this._dto.convertedManaCost;
  }

  public get collectorNumber(): string {
    return this._dto.collectorNumber;
  }

  public get collectorNumberSortValue(): string {
    return this._dto.collectorNumberSortValue;
  }

  public get colorIdentitySortValue(): string {
    return this._dto.colorIdentitiesSortValue;
  }

  public get rarity(): string {
    return this._dto.rarity;
  }

  public get raritySortValue(): number {
    return this._dto.raritySortValue;
  }

  public get type(): string {
    return this._dto.type;
  }

  public get power(): string {
    return this._dto.power;
  }

  public get toughness(): string {
    return this._dto.toughness;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    basicDataService: IBasicDataService,
    mtgSetService: IMtgSetService,
    dto: Dto) {
    super();
    this._dto = dto;
    const mtgSet = mtgSetService.getSetTreeDtoById(dto.mtgSetId);
    this.setName = mtgSet?.setName || "Unknown set";
    this.setKeyruneCode = mtgSet?.keyruneCode || "DEFAULT";
    const identityColors = dto.colorIdentities
      .map((color: string) => basicDataService.getColor(color))
      .filter((color: AppColorDto | undefined) => color != undefined)
      .sort((a: AppColorDto, b: AppColorDto) => a.sequence - b.sequence);
    this.colorIdentity = identityColors.map((color: AppColorDto) => color.manaSymbol);
    this.rarityDisplayValue = basicDataService.getDisplayValue("rarity", dto.rarity);
    this.manaCost = this.calculateCardManaCost(dto.manaCost);
  }
  // #endregion
}
