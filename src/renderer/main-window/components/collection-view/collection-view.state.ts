import { CardQueryFilterDto, CollectionCardListDto, QueryParamsDto, QueryResultDto } from "../../../shared/dto";

export interface CollectionViewState {
  collectionsOnly: boolean;
  expandedNodes: Set<number>;
  queryFilter: CardQueryFilterDto;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<CollectionCardListDto>;
  selectedCard: number | null;
  selectedCollection: number | null;
  selectedSearchTab: string | number;
  version: number;
}
