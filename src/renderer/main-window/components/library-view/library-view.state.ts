import { CardQueryFilterDto, LibraryCardListDto, QueryParamsDto, QueryResultDto } from "../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel } from "../../../shared/viewmodel";

export interface LibraryViewState {
  queryFilter: CardQueryFilterDto;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<LibraryCardListDto>;
  selectedCard: number | null;
  selectedSearchTab: string | number;
  setsOnly: boolean;
  treeConfiguration: MtgSetTreeConfigurationViewmodel;
}
