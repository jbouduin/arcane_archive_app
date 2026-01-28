import { CardFilterParamsDto, QueryParamsDto, CollectionDto, MtgSetTreeDto, QueryResultDto } from "../../../shared/dto";
import { CollectionCardListDto } from "../../../shared/dto/collection-card-list.dto";

export interface CollectionViewState {
  cardFilterParams: CardFilterParamsDto;
  collectionFilter: Array<CollectionDto>;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<CollectionCardListDto>;
  selectedCard: number | null;
  selectedSearchTab: string | number;
  setFilter: Array<MtgSetTreeDto>;
}
