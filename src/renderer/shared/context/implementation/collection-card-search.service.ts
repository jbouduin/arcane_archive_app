import {
  CardFilterParamsDto, CollectionCardListDto, CollectionDto, MtgSetTreeDto, QueryParamsDto, QueryResultDto
} from "../../dto";
import { ICollectionCardSearchService } from "../interface";
import { BaseCardSearchService } from "./base-card-search.service";

export class CollectionCardSearchService extends BaseCardSearchService<CollectionCardListDto>
  implements ICollectionCardSearchService {
  //#region Private fields: Collection Search criteria ------------------------
  private _collectionFilter: Array<CollectionDto>;
  //#endregion

  //#region ICardSearchParamService Getters/Setters ---------------------------
  public get collectionFilter(): Array<CollectionDto> {
    return this._collectionFilter;
  }

  public set collectionFilter(value: Array<CollectionDto>) {
    this._collectionFilter = value;
  }
  //#endregion

  //#region Constructor -------------------------------------------------------
  public constructor() {
    super();
    this._collectionFilter = new Array<CollectionDto>();
  }
  // #endregion

  // #region ICardSearchParamService Members ----------------------------------
  public getCollectionCards(
    cardFilterParams: CardFilterParamsDto | null,
    queryParams: QueryParamsDto,
    collectionFilter: Array<CollectionDto>,
    setFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<CollectionCardListDto>> {
    return this.getCards(
      "/public/card/collection",
      cardFilterParams,
      queryParams,
      collectionFilter,
      setFilter
    );
  }
  // #endregion
}
