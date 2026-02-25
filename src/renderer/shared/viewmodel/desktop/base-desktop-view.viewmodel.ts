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

  //#region Getters -----------------------------------------------------------
  public get queryFilterViewmodel(): CardQueryFilterViewmodel {
    return this._queryFilterViewmodel;
  }

  public get queryParamsViewmodel(): QueryParamsViewmodel {
    return this._queryParamsViewmodel;
  }

  public get expandedNodes(): Array<number | string> {
    return this._dto.uiState.expandedNodes;
  }

  public get selectedNodes(): Array<number | string> {
    return this._dto.uiState.selectedNodes;
  }

  public get tableVersion(): number {
    return this._dto.uiState.tableVersion;
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

  public expandNode(node: string | number): void {
    if (!this._dto.uiState.expandedNodes.includes(node)) {
      this._dto.uiState.expandedNodes.push(node);
    }
  }

  public collapseNode(node: string | number): void {
    this._dto.uiState.expandedNodes = this._dto.uiState.expandedNodes
      .filter((value: string | number) => value !== node);
  }

  public selectNode(node: string | number): void {
    if (!this._dto.uiState.selectedNodes.includes(node)) {
      this._dto.uiState.selectedNodes.push(node);
    }
  }

  public deselectNode(node: string | number): void {
    this._dto.uiState.selectedNodes = this._dto.uiState.selectedNodes
      .filter((value: string | number) => value !== node);
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  protected bumpTableVersion(): void {
    this._dto.uiState.tableVersion++;
  }

  /**
   * returns a completely "detached" BaseDesktopViewDto<LDto>
   */
  protected get baseDesktopDtoSnapshot(): BaseDesktopViewDto<LDto> {
    return {
      queryFilter: this._queryFilterViewmodel.dtoToSave,
      queryParams: this._queryParamsViewmodel.dtoToSave,
      queryResult: {
        ...this._dto.queryResult,
        resultList: new Array<LDto>(...this._dto.queryResult.resultList)
      },
      selectedCard: this._dto.selectedCard,
      selectedSearchTab: this._dto.selectedSearchTab,
      uiState: {
        selectedNodes: new Array<number | string>(...this._dto.uiState.selectedNodes),
        expandedNodes: new Array<number | string>(...this._dto.uiState.expandedNodes),
        tableVersion: this._dto.uiState.tableVersion
      }
    };
  }
  //#endregion
}
