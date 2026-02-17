import { PreferencesDto } from "../../../../common/dto";
import { CollectionCardListDto, CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../dto";

import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ICollectionCardSearchService {
  //#region Collection Search -------------------------------------------------
  readonly queryFilter: CardQueryFilterDto;
  readonly queryParams: QueryParamsDto;
  readonly queryResult: QueryResultDto<CollectionCardListDto>;
  selectedSearchTab: string | number;

  getCollectionCards(
    filterParams: CardQueryFilterDto, collectionsOnly: boolean, queryParams: QueryParamsDto
  ): Promise<QueryResultDto<CollectionCardListDto>>;
  //#endregion

  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy, preferences: PreferencesDto): void;
  //#endregion
}
