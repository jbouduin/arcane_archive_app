import { PreferencesDto } from "../../../../common/dto";
import { CardFilterParamsDto, CardQueryParamsDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../dto";
import { SelectOption } from "../../types";
import { ICollectionManagerProxyService } from "./collection-manager-proxy.service";

export interface ICardSearchService {
  cardQueryParams: CardQueryParamsDto;
  cardFilterParams: CardFilterParamsDto;
  cardSetFilter: Array<MtgSetTreeDto>;
  lastQueryResult: QueryResultDto<LibraryCardListDto>;
  currentSelectedSearchTab: string | number;

  /**
    * Query cards
    * @param cardQuery the query parameters
    * @param cardFilterParams
    * @param cardSetFilter
    */
  getCards(
    cardQueryParams: CardQueryParamsDto,
    cardFilterParams: CardFilterParamsDto | null,
    cardSetFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<LibraryCardListDto>>;
  getCardTypeSelectOptions(): Array<SelectOption<string>>;
  getCardSuperTypeSelectOptions(): Array<SelectOption<string>>;
  getPowerValueSelectOptions(): Array<SelectOption<string>>;
  getToughnessValueSelectOptions(): Array<SelectOption<string>>;
  initialize(collectionManagerProxy: ICollectionManagerProxyService, preferences: PreferencesDto): Promise<void>;
}
