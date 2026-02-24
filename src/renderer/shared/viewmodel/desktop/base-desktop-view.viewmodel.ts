import { IBasicDataService, ICollectionService, IMtgSetService } from "../../context";
import { BaseCardListDto, QueryResultDto } from "../../dto";
import { BaseDesktopViewDto } from "../../dto/desktop";
import { BaseViewmodel } from "../base.viewmodel";
import { CardQueryFilterViewmodel } from "./card-query-filter.viewmodel";
import { QueryParamsViewmodel } from "./query-params.viewmodel";

export class BaseDesktopViewViewmodel<LDto extends BaseCardListDto, VDto extends BaseDesktopViewDto<LDto>>
  extends BaseViewmodel<VDto> {
  //#region Private fields ----------------------------------------------------
  private readonly _queryFilterViewmodel: CardQueryFilterViewmodel;
  private readonly _queryParamsViewmodel: QueryParamsViewmodel;
  private readonly searchCallback: (dto: VDto) => Promise<QueryResultDto<LDto>>;
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get queryFilterViewmodel(): CardQueryFilterViewmodel {
    return this._queryFilterViewmodel;
  }

  public get queryParamsViewmodel(): QueryParamsViewmodel {
    return this._queryParamsViewmodel;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    dto: VDto,
    useCollections: boolean,
    basicDataService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService,
    searchCallback: (dto: VDto) => Promise<QueryResultDto<LDto>>
  ) {
    super(dto, "update");
    this.searchCallback = searchCallback;
    this._queryFilterViewmodel = new CardQueryFilterViewmodel(
      dto.queryFilter, useCollections, basicDataService, collectionService, mtgSetService
    );
    this.registerChildViewmodel(this._queryFilterViewmodel);
    this._queryParamsViewmodel = new QueryParamsViewmodel(dto.queryParams);
    this.registerChildViewmodel(this._queryParamsViewmodel);
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  public async search(): Promise<QueryResultDto<LDto>> {
    this._dto.queryResult = await this.searchCallback(this.dtoToSave);
    return this._dto.queryResult;
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  protected get baseDesktopDtoSnapshot(): BaseDesktopViewDto<LDto> {
    return {
      queryFilter: { ...this._queryFilterViewmodel.dtoToSave },
      queryParams: { ...this._queryParamsViewmodel.dtoToSave },
      queryResult: { ...this._dto.queryResult },
      selectedCard: this._dto.selectedCard,
      selectedSearchTab: this._dto.selectedSearchTab
    };
  }
  //#endregion
}
