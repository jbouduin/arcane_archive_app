import { CollectionCardListDto, CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../dto";
import { ICollectionCardSearchService } from "../interface";
import { BaseCardSearchService } from "./base-card-search.service";

export class CollectionCardSearchService extends BaseCardSearchService<CollectionCardListDto>
  implements ICollectionCardSearchService {
  //#region Constructor -------------------------------------------------------
  public constructor() {
    super();
  }
  //#endregion

  //#region ICardSearchParamService Members -----------------------------------
  public getCollectionCards(
    filterParams: CardQueryFilterDto, collectionsOnly: boolean, queryParams: QueryParamsDto
  ): Promise<QueryResultDto<CollectionCardListDto>> {
    return this.getCards(
      "/auth/card/collection",
      collectionsOnly ? "collection" : "advanced",
      filterParams,
      queryParams
    );
  }
  //#endregion
}
