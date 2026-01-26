import { PreferencesDto } from "../../../../common/dto";
import { CardFilterParamsDto, CardQueryParamsDto, CollectionCardListDto, CollectionDto, ColorDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../dto";
import { IArcaneArchiveProxy, ICardSearchService } from "../interface";

export class CardSearchService implements ICardSearchService {
  //#region Private fields ----------------------------------------------------
  private arcaneArchiveProxy!: IArcaneArchiveProxy;
  // #endregion

  //#region Private fields: Library Search criteria ---------------------------
  private _libraryFilterParams: CardFilterParamsDto;
  private _libraryQueryParams: CardQueryParamsDto;
  private _librarySetFilter: Array<MtgSetTreeDto>;
  private _libraryQueryResult: QueryResultDto<LibraryCardListDto>;
  private _librarySelectedSearchTab: string | number;
  // #endregion

  //#region Private fields: Collection Search criteria ------------------------
  private _collectionQueryParams: CardQueryParamsDto;
  private _collectionQueryResult: QueryResultDto<CollectionCardListDto>;
  private _collectionFilter: Array<CollectionDto>;
  //#endregion

  //#region ICardSearchParamService Library Search Getters/Setters ------------
  public get libraryFilterParams(): CardFilterParamsDto {
    return this._libraryFilterParams;
  }

  public set libraryFilterParams(value: CardFilterParamsDto) {
    this._libraryFilterParams = value;
  }

  public get libraryQueryParams(): CardQueryParamsDto {
    return this._libraryQueryParams;
  }

  public set libraryQueryParams(value: CardQueryParamsDto) {
    this._libraryQueryParams = value;
  }

  public get librarySetFilter(): Array<MtgSetTreeDto> {
    return this._librarySetFilter;
  }

  public set librarySetFilter(value: Array<MtgSetTreeDto>) {
    this._librarySetFilter = value;
  }

  public get libraryQueryResult(): QueryResultDto<LibraryCardListDto> {
    return this._libraryQueryResult;
  }

  public set libraryQueryResult(value: QueryResultDto<LibraryCardListDto>) {
    this._libraryQueryResult = value;
  }

  public get librarySelectedSearchTab(): string | number {
    return this._librarySelectedSearchTab;
  }

  public set librarySelectedSearchTab(value: string | number) {
    this._librarySelectedSearchTab = value;
  }
  // #endregion

  //#region ICardSearchParamService Collection Search Getters/Setters ---------
  public get collectionQueryParams(): CardQueryParamsDto {
    return this._collectionQueryParams;
  }

  public set collectionQueryParams(value: CardQueryParamsDto) {
    this._collectionQueryParams = value;
  }

  public get collectionQueryResult(): QueryResultDto<CollectionCardListDto> {
    return this._collectionQueryResult;
  }

  public set collectionQueryResult(value: QueryResultDto<CollectionCardListDto>) {
    this._collectionQueryResult = value;
  }

  public get collectionFilter(): Array<CollectionDto> {
    return this._collectionFilter;
  }

  public set collectionFilter(value: Array<CollectionDto>) {
    this._collectionFilter = value;
  }
  //#endregion

  //#region Constructor -------------------------------------------------------
  public constructor() {
    this._libraryFilterParams = {
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
    this._libraryQueryParams = {
      pageNumber: 0,
      pageSize: 100,
      sortField: "collectorNumberSortValue",
      sortDirection: "ASC",
    };
    this._librarySetFilter = new Array<MtgSetTreeDto>();
    this._libraryQueryResult = {
      currentPageNumber: 0,
      currentPageSize: 50,
      hasMore: false,
      resultList: new Array<LibraryCardListDto>()
    };
    this._librarySelectedSearchTab = 0;
    this._collectionQueryParams = {
      pageNumber: 0,
      pageSize: 100,
      sortField: "collectorNumberSortValue",
      sortDirection: "ASC",
    };
    this._collectionQueryResult = {
      currentPageNumber: 0,
      currentPageSize: 50,
      hasMore: false,
      resultList: new Array<CollectionCardListDto>()
    };
    this._collectionFilter = new Array<CollectionDto>();
  }
  // #endregion

  // #region ICardSearchParamService Members ----------------------------------
  public getLibraryCards(
    cardQueryParams: CardQueryParamsDto,
    cardFilterParams: CardFilterParamsDto | null,
    cardSetFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<LibraryCardListDto>> {
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
    // LATER cardnames, and wordbank catalogs
    if (params.size > 0) {
      params.append("pn", cardQueryParams.pageNumber.toString());
      params.append("ps", cardQueryParams.pageSize.toString());
      params.append("sort", `${cardQueryParams.sortField}:${cardQueryParams.sortDirection}`);
      return this.arcaneArchiveProxy.getData<QueryResultDto<LibraryCardListDto>>("library", path + "?" + params.toString());
    } else {
      return Promise.resolve({
        currentPageNumber: 0,
        currentPageSize: 100,
        hasMore: false,
        resultList: new Array<LibraryCardListDto>()
      });
    }
  }

  public getCollectionCards(
    collectionQueryParams: CardQueryParamsDto,
    collectionFilter: Array<CollectionDto>
  ): Promise<QueryResultDto<CollectionCardListDto>> {
    if (collectionFilter.length > 0) {
      const path = `/public/card/collection/${collectionFilter[0].id}`;
      const params = new URLSearchParams();
      params.append("pn", collectionQueryParams.pageNumber.toString());
      params.append("ps", collectionQueryParams.pageSize.toString());
      params.append("sort", `${collectionQueryParams.sortField}:${collectionQueryParams.sortDirection}`);
      return this.arcaneArchiveProxy.getData<QueryResultDto<CollectionCardListDto>>("library", path + "?" + params.toString());
    } else {
      return Promise.resolve({
        currentPageNumber: 0,
        currentPageSize: 100,
        hasMore: false,
        resultList: new Array<CollectionCardListDto>()
      });
    }
  }

  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy, preferences: PreferencesDto): void {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
    this.libraryQueryParams.pageSize = preferences.defaultPageSize;
    this.libraryQueryParams.sortField = preferences.defaultCardSortField;
    this.libraryQueryParams.sortDirection = preferences.defaultCardSortDirection;
  }
  // #endregion
}
