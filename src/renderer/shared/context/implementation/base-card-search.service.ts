import { PreferencesDto } from "../../../../common/dto";
import { CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../dto";
import { IArcaneArchiveProxy } from "../interface";

export type SearchMode = "set" | "collection" | "advanced";

export abstract class BaseCardSearchService<T> {
  //#region Protected fields --------------------------------------------------
  protected arcaneArchiveProxy!: IArcaneArchiveProxy;
  //#endregion

  //#region Private fields: Library Search criteria ---------------------------
  private _queryFilter: CardQueryFilterDto;
  private _queryParams: QueryParamsDto;
  private _queryResult: QueryResultDto<T>;
  private _selectedSearchTab: string | number;
  //#endregion

  //#region ICardSearchParamService Library Search Getters/Setters ------------
  public get queryFilter(): CardQueryFilterDto {
    return this._queryFilter;
  }

  public set queryFilter(value: CardQueryFilterDto) {
    this._queryFilter = value;
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
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  protected constructor() {
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
    this._queryFilter = this.createEmptyQueryFilter();
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
    searchMode: SearchMode,
    queryFilter: CardQueryFilterDto,
    queryParams: QueryParamsDto
  ): Promise<QueryResultDto<T>> {
    /**
     * # TODO consider caching search criteria only when searching
     * this.queryfilter = cardSearchDto;
     * this.queryParams = queryParams;
     */
    const params = this.buildSearchParams(searchMode, queryFilter);
    if (params.size > 0) {
      params.append("pn", queryParams.pageNumber.toString());
      params.append("ps", queryParams.pageSize.toString());
      params.append("sort", `${queryParams.sortField}:${queryParams.sortDirection}`);
      // TODO consider setting the result here, instead of in the caller
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
    searchMode: SearchMode,
    cardSearchDto: CardQueryFilterDto
  ): URLSearchParams {
    const result = new URLSearchParams();
    if (searchMode == "advanced") {
      cardSearchDto.abilities.forEach((ability: string) => result.append("kw", ability));
      cardSearchDto.actions.forEach((action: string) => result.append("kw", action));
      cardSearchDto.cardColors.forEach((color: string) => result.append("cc", color));
      cardSearchDto.cardNames.forEach((cardName: string) => result.append("cn", cardName));
      cardSearchDto.gameFormats.forEach((gameFormat: string) => result.append("gf", gameFormat));
      cardSearchDto.identityColors.forEach((color: string) => result.append("ic", color));
      cardSearchDto.powers.forEach((power: string) => result.append("pw", power));
      cardSearchDto.producedManaColors.forEach((color: string) => result.append("pm", color));
      cardSearchDto.rarities.forEach((rarity: string) => result.append("rar", rarity));
      cardSearchDto.subTypes.forEach((type: string) => result.append("sub", type));
      cardSearchDto.superTypes.forEach((type: string) => result.append("sup", type));
      cardSearchDto.types.forEach((type: string) => result.append("ty", type));
      cardSearchDto.toughnesses.forEach((toughness: string) => result.append("tn", toughness));
    }
    if (searchMode == "set" || searchMode == "advanced") {
      cardSearchDto.cardSetIds.forEach((id: number) => result.append("set", id.toString()));
    }
    if (searchMode == "collection" || searchMode == "advanced") {
      cardSearchDto.collectionIds.forEach((id: number) => result.append("co", id.toString()));
    }
    return result;
  }

  private createEmptyQueryFilter(): CardQueryFilterDto {
    return {
      abilities: new Array<string>(),
      actions: new Array<string>(),
      cardColors: new Array<string>(),
      cardNames: new Array<string>(),
      cardSetIds: new Array<number>(),
      collectionIds: new Array<number>(),
      gameFormats: new Array<string>(),
      identityColors: new Array<string>(),
      producedManaColors: new Array<string>(),
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
