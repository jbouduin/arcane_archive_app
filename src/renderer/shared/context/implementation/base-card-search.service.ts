import { BaseCardListDto, CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../dto";
import { BaseDesktopViewDto } from "../../dto/desktop";
import { IArcaneArchiveProxy, ViewDtoProvider } from "../interface";

export type SearchMode = "set" | "collection" | "advanced";

export abstract class BaseCardSearchService<LDto extends BaseCardListDto, VDto extends BaseDesktopViewDto<LDto>> {
  //#region Protected fields --------------------------------------------------
  protected arcaneArchiveProxy!: IArcaneArchiveProxy;
  //#endregion

  //#region Private fields: Library Search criteria ---------------------------
  private _viewDto!: VDto;
  //#endregion

  //#region ICardSearchParamService Library Search Getters/Setters ------------
  public get viewDto(): VDto {
    return this._viewDto;
  }

  public set viewDto(dto: VDto) {
    this._viewDto = dto;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  protected constructor() {
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy,
    viewDtoProvider: ViewDtoProvider<LDto, VDto>): void {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
    const defaultQueryParams: QueryParamsDto = {
      pageNumber: 0,
      pageSize: 50,
      sortField: "collectorNumberSortValue",
      sortDirection: "ASC",
    };
    const defaultQueryResult: QueryResultDto<LDto> = {
      currentPageNumber: 0,
      currentPageSize: 50,
      hasMore: false,
      resultList: new Array<LDto>()
    };
    this._viewDto = viewDtoProvider(defaultQueryParams, this.createEmptyQueryFilter(), defaultQueryResult);
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  protected async newGetCards(
    path: string,
    searchMode: SearchMode,
    viewDto: VDto,
  ): Promise<QueryResultDto<LDto>> {
    let result: QueryResultDto<LDto>;
    const params = this.buildSearchParams(searchMode, viewDto.queryFilter);
    if (params.size > 0) {
      params.append("pn", viewDto.queryParams.pageNumber.toString());
      params.append("ps", viewDto.queryParams.pageSize.toString());
      params.append("sort", `${viewDto.queryParams.sortField}:${viewDto.queryParams.sortDirection}`);
      result = await this.arcaneArchiveProxy
        .getData<QueryResultDto<LDto>>("library", path + "?" + params.toString());
    } else {
      result = {
        currentPageNumber: 0,
        currentPageSize: viewDto.queryParams.pageSize,
        hasMore: false,
        resultList: new Array<LDto>()
      };
    }
    return result;
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
