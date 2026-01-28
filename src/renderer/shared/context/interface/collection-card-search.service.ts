import { PreferencesDto } from "../../../../common/dto";
import { CardFilterParamsDto, CollectionCardListDto, CollectionDto, MtgSetTreeDto, QueryParamsDto, QueryResultDto } from "../../dto";

import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ICollectionCardSearchService {
  //#region Collection Search -------------------------------------------------
  cardFilterParams: CardFilterParamsDto;
  collectionFilter: Array<CollectionDto>;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<CollectionCardListDto>;
  selectedSearchTab: string | number;
  setFilter: Array<MtgSetTreeDto>;
  getCollectionCards(
    cardFilterParams: CardFilterParamsDto | null,
    queryParams: QueryParamsDto,
    collectionFilter: Array<CollectionDto>,
    setFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<CollectionCardListDto>>;
  //#endregion

  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy, preferences: PreferencesDto): void;
  //#endregion
}
