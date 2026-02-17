import { PreferencesDto } from "../../../../common/dto";
import { LibraryCardListDto, CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../dto";

import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ILibraryCardSearchService {
  readonly queryFilter: CardQueryFilterDto;
  readonly queryParams: QueryParamsDto;
  readonly queryResult: QueryResultDto<LibraryCardListDto>;
  selectedSearchTab: string | number;

  /**
   * Query cards
   * @param filterParams
   * @param setsOnly
   * @param cardFilterParams
   */
  getLibraryCards(
    filterParams: CardQueryFilterDto, setsOnly: boolean, queryParams: QueryParamsDto
  ): Promise<QueryResultDto<LibraryCardListDto>>;
  //#endregion

  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy, preferences: PreferencesDto): void;
  //#endregion
}
