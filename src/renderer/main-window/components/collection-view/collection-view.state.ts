import { CardQueryParamsDto, CollectionDto, QueryResultDto } from "../../../shared/dto";
import { CollectionCardListDto } from "../../../shared/dto/collection-card-list.dto";

export interface CollectionViewState {
  cardQueryParams: CardQueryParamsDto;
  queryResult: QueryResultDto<CollectionCardListDto>;
  collectionFilter: Array<CollectionDto>;
}
