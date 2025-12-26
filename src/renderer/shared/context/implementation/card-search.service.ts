import { noop } from "lodash";
import { CardFilterParamsDto, CardQueryParamsDto, ColorDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../dto";
import { SelectOption } from "../../types";
import { ICardSearchService, ICollectionManagerProxyService } from "../interface";

export class CardSearchService implements ICardSearchService {
  // #region Private fields: SelectOptions ------------------------------------
  private _cardSuperTypeSelectOptions: Array<SelectOption<string>>;
  private _cardTypeSelectOptions: Array<SelectOption<string>>;
  private _powerValueSelectOptions: Array<SelectOption<string>>;
  private _toughnessValueSelectOptions: Array<SelectOption<string>>;
  // #endregion

  // #region Private fields: Search criteria ----------------------------------
  private _cardFilterParams: CardFilterParamsDto;
  private _cardQueryParams: CardQueryParamsDto;
  private _cardSetFilter: Array<MtgSetTreeDto>;
  private _lastQueryResult: QueryResultDto<LibraryCardListDto>;
  private _currentSelectedSearchTab: string | number;
  // #endregion

  // #region Private fields ---------------------------------------------------
  private collectionManagerProxy!: ICollectionManagerProxyService;
  // #endregion

  // #region ICardSearchParamService Getters/Setters --------------------------
  public get cardFilterParams(): CardFilterParamsDto {
    return this._cardFilterParams;
  }

  public set cardFilterParams(value: CardFilterParamsDto) {
    this._cardFilterParams = value;
  }

  public get cardQueryParams(): CardQueryParamsDto {
    return this._cardQueryParams;
  }

  public set cardQueryParams(value: CardQueryParamsDto) {
    this._cardQueryParams = value;
  }

  public get cardSetFilter(): Array<MtgSetTreeDto> {
    return this._cardSetFilter;
  }

  public set cardSetFilter(value: Array<MtgSetTreeDto>) {
    this._cardSetFilter = value;
  }

  public get lastQueryResult(): QueryResultDto<LibraryCardListDto> {
    return this._lastQueryResult;
  }

  public set lastQueryResult(value: QueryResultDto<LibraryCardListDto>) {
    this._lastQueryResult = value;
  }

  public get currentSelectedSearchTab(): string | number {
    return this._currentSelectedSearchTab;
  }

  public set currentSelectedSearchTab(value: string | number) {
    this._currentSelectedSearchTab = value;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._cardSuperTypeSelectOptions = new Array<SelectOption<string>>();
    this._cardTypeSelectOptions = new Array<SelectOption<string>>();
    this._powerValueSelectOptions = new Array<SelectOption<string>>();
    this._toughnessValueSelectOptions = new Array<SelectOption<string>>();
    this._cardFilterParams = {
      abilities: new Array<string>(),
      actions: new Array<string>(),
      cardColors: new Array<ColorDto>(),
      cardNames: new Array<string>(),
      gameFormats: new Array<string>(),
      identityColors: new Array<ColorDto>(),
      producedManaColors: new Array<ColorDto>(),
      powers: new Array<string>(),
      rarities: new Array<string>(),
      subTypes: new Array<string>(),
      superTypes: new Array<string>(),
      toughnesses: new Array<string>(),
      types: new Array<string>()
    };
    this._cardQueryParams = {
      pageNumber: 0,
      // TODO store this in preferences, and preference context
      pageSize: 100,
      sortField: "collectorNumberSortValue",
      sortDirection: "ASC",
    };
    this._cardSetFilter = new Array<MtgSetTreeDto>();
    this._lastQueryResult = {
      currentPageNumber: 0,
      currentPageSize: 100,
      hasMore: false,
      resultList: new Array<LibraryCardListDto>()
    };
    this._currentSelectedSearchTab = 0;
  }
  // #endregion

  // #region ICardSearchParamService Members ----------------------------------
  public getCards(cardQueryParams: CardQueryParamsDto, cardFilterParams: CardFilterParamsDto | null, cardSetFilter: Array<MtgSetTreeDto>): Promise<QueryResultDto<LibraryCardListDto>> {
    const path = "/public/card/list";
    const params = new URLSearchParams();
    if (cardFilterParams) {
      cardFilterParams.abilities.forEach((ability: string) => params.append("kw", ability));
      cardFilterParams.actions.forEach((action: string) => params.append("kw", action));
      cardFilterParams.cardColors.forEach((color: ColorDto) => params.append("cc", color.code));
      cardFilterParams.cardNames.forEach((cardName: string) => params.append("cn", cardName));
      cardFilterParams.gameFormats.forEach((gameFormat: string) => params.append("gf", gameFormat));
      cardFilterParams.identityColors.forEach((color: ColorDto) => params.append("ic", color.code));
      cardFilterParams.powers.forEach((power: string) => params.append("pw", power));
      cardFilterParams.producedManaColors.forEach((color: ColorDto) => params.append("pm", color.code));
      cardFilterParams.rarities.forEach((rarity: string) => params.append("rar", rarity));
      cardFilterParams.subTypes.forEach((type: string) => params.append("sub", type));
      cardFilterParams.superTypes.forEach((type: string) => params.append("sup", type));
      cardFilterParams.types.forEach((type: string) => params.append("ty", type));
      cardFilterParams.toughnesses.forEach((toughness: string) => params.append("tn", toughness));
    }
    cardSetFilter.forEach((set: MtgSetTreeDto) => params.append("set", set.id.toString()));
    // TODO  cardnames, and wordbank catalogs
    if (params.size > 0) {
      params.append("pn", cardQueryParams.pageNumber.toString());
      params.append("ps", cardQueryParams.pageSize.toString());
      params.append("sort", `${cardQueryParams.sortField}:${cardQueryParams.sortDirection}`);
      return this.collectionManagerProxy.getData<QueryResultDto<LibraryCardListDto>>("library", path + "?" + params.toString());
    } else {
      return Promise.resolve({
        currentPageNumber: 0,
        currentPageSize: 100,
        hasMore: false,
        resultList: new Array<LibraryCardListDto>()
      });
    }
  }

  public getCardTypeSelectOptions(): Array<SelectOption<string>> {
    return this._cardTypeSelectOptions;
  }

  public getCardSuperTypeSelectOptions(): Array<SelectOption<string>> {
    return this._cardSuperTypeSelectOptions;
  }

  public getPowerValueSelectOptions(): Array<SelectOption<string>> {
    return this._powerValueSelectOptions;
  }

  public getToughnessValueSelectOptions(): Array<SelectOption<string>> {
    return this._toughnessValueSelectOptions;
  }

  public initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void> {
    this.collectionManagerProxy = collectionManagerProxy;
    return Promise.all([
      collectionManagerProxy.getData<Array<string>>("library", "/public/card-super-type"),
      collectionManagerProxy.getData<Array<string>>("library", "/public/card-type"),
      collectionManagerProxy.getData<Array<string>>("library", "/public/catalog/POWERS/item"),
      collectionManagerProxy.getData<Array<string>>("library", "/public/catalog/TOUGHNESSES/item")])
      .then(
        (r: [Array<string>, Array<string>, Array<string>, Array<string>]) => {
          this._cardSuperTypeSelectOptions = r[0].sort().map((s: string) => ({ label: s, value: s }));
          this._cardTypeSelectOptions = r[1].sort().map((s: string) => ({ label: s, value: s }));
          this._powerValueSelectOptions = r[2].sort().map((s: string) => ({ label: s, value: s }));
          this._toughnessValueSelectOptions = r[3].sort().map((s: string) => ({ label: s, value: s }));
        },
        noop
      );
  }
  // #endregion
}
