import { PreferencesDto } from "../../../../common/dto";
import { CardFilterParamsDto, QueryParamsDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../dto";

import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ILibraryCardSearchService {
  cardFilterParams: CardFilterParamsDto;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<LibraryCardListDto>;
  selectedSearchTab: string | number;
  setFilter: Array<MtgSetTreeDto>;

  /**
   * Query cards
   * @param queryParams the query parameters
   * @param cardFilterParams
   * @param setFilter
   */
  getLibraryCards(
    cardFilterParams: CardFilterParamsDto | null,
    queryParams: QueryParamsDto,
    setFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<LibraryCardListDto>>;
  //#endregion

  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy, preferences: PreferencesDto): void;
  //#endregion
}
