import { PreferencesDto } from "../../../../common/dto";
import {
  CardFilterParamsDto, CollectionDto, ColorDto, MtgSetTreeDto, QueryParamsDto, QueryResultDto
} from "../../dto";
import { IArcaneArchiveProxy } from "../interface";

export abstract class BaseCardSearchService<T> {
  //#region Protected fields --------------------------------------------------
  protected arcaneArchiveProxy!: IArcaneArchiveProxy;
  //#endregion

  //#region Private fields: Library Search criteria ---------------------------
  private _cardFilterParams: CardFilterParamsDto;
  private _queryParams: QueryParamsDto;
  private _queryResult: QueryResultDto<T>;
  private _selectedSearchTab: string | number;
  private _setFilter: Array<MtgSetTreeDto>;
  //#endregion

  //#region ICardSearchParamService Library Search Getters/Setters ------------
  public get cardFilterParams(): CardFilterParamsDto {
    return this._cardFilterParams;
  }

  public set cardFilterParams(value: CardFilterParamsDto) {
    this._cardFilterParams = value;
  }

  public get queryParams(): QueryParamsDto {
    return this._queryParams;
  }

  public set queryParams(value: QueryParamsDto) {
    this._queryParams = value;
  }

  public get queryResult(): QueryResultDto<T> {
    return this._queryResult;
  }

  public set queryResult(value: QueryResultDto<T>) {
    this._queryResult = value;
  }

  public get selectedSearchTab(): string | number {
    return this._selectedSearchTab;
  }

  public set selectedSearchTab(value: string | number) {
    this._selectedSearchTab = value;
  }

  public get setFilter(): Array<MtgSetTreeDto> {
    return this._setFilter;
  }

  public set setFilter(value: Array<MtgSetTreeDto>) {
    this._setFilter = value;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  protected constructor() {
    this._cardFilterParams = this.createEmptyCardFilterParams();
    this._queryParams = {
      pageNumber: 0,
      pageSize: 100,
      sortField: "collectorNumberSortValue",
      sortDirection: "ASC",
    };
    this._queryResult = {
      currentPageNumber: 0,
      currentPageSize: 50,
      hasMore: false,
      resultList: new Array<T>()
    };
    this._selectedSearchTab = 0;
    this._setFilter = new Array<MtgSetTreeDto>();
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy, preferences: PreferencesDto): void {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
    this._queryParams.pageSize = preferences.defaultPageSize;
    this._queryParams.sortField = preferences.defaultCardSortField;
    this._queryParams.sortDirection = preferences.defaultCardSortDirection;
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  protected getCards(
    path: string,
    cardFilterParams: CardFilterParamsDto | null,
    queryParams: QueryParamsDto,
    collectionFilter: Array<CollectionDto> | null,
    setFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<T>> {
    const params = this.buildSearchParams(cardFilterParams, collectionFilter, setFilter);
    if (params.size > 0) {
      params.append("pn", queryParams.pageNumber.toString());
      params.append("ps", queryParams.pageSize.toString());
      params.append("sort", `${queryParams.sortField}:${queryParams.sortDirection}`);
      return this.arcaneArchiveProxy.getData<QueryResultDto<T>>("library", path + "?" + params.toString());
    } else {
      return Promise.resolve({
        currentPageNumber: 0,
        currentPageSize: queryParams.pageSize,
        hasMore: false,
        resultList: new Array<T>()
      });
    }
  }

  private buildSearchParams(
    cardFilterParams: CardFilterParamsDto | null,
    collectionFilter: Array<CollectionDto> | null,
    setFilter: Array<MtgSetTreeDto>
  ): URLSearchParams {
    const result = new URLSearchParams();
    if (cardFilterParams) {
      cardFilterParams.abilities.forEach((ability: string) => result.append("kw", ability));
      cardFilterParams.actions.forEach((action: string) => result.append("kw", action));
      cardFilterParams.cardColors.forEach((color: ColorDto) => result.append("cc", color.code));
      cardFilterParams.cardNames.forEach((cardName: string) => result.append("cn", cardName));
      cardFilterParams.gameFormats.forEach((gameFormat: string) => result.append("gf", gameFormat));
      cardFilterParams.identityColors.forEach((color: ColorDto) => result.append("ic", color.code));
      cardFilterParams.powers.forEach((power: string) => result.append("pw", power));
      cardFilterParams.producedManaColors.forEach((color: ColorDto) => result.append("pm", color.code));
      cardFilterParams.rarities.forEach((rarity: string) => result.append("rar", rarity));
      cardFilterParams.subTypes.forEach((type: string) => result.append("sub", type));
      cardFilterParams.superTypes.forEach((type: string) => result.append("sup", type));
      cardFilterParams.types.forEach((type: string) => result.append("ty", type));
      cardFilterParams.toughnesses.forEach((toughness: string) => result.append("tn", toughness));
    }
    setFilter.forEach((set: MtgSetTreeDto) => result.append("set", set.id.toString()));
    if (collectionFilter != null) {
      collectionFilter.forEach((col: CollectionDto) => result.append("co", col.id!.toString()));
    }
    return result;
  }

  private createEmptyCardFilterParams(): CardFilterParamsDto {
    return {
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
  }
  //#endregion
}
