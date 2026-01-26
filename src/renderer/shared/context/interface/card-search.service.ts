import { PreferencesDto } from "../../../../common/dto";
import { CardFilterParamsDto, CardQueryParamsDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../dto";
import { CollectionDto, CollectionCardListDto } from "../../dto";

import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ICardSearchService {
  //#region Library Search ----------------------------------------------------
  libraryQueryParams: CardQueryParamsDto;
  libraryFilterParams: CardFilterParamsDto;
  librarySetFilter: Array<MtgSetTreeDto>;
  libraryQueryResult: QueryResultDto<LibraryCardListDto>;
  librarySelectedSearchTab: string | number;

  /**
   * Query cards
   * @param libraryQueryParams the query parameters
   * @param libraryFilterParams
   * @param librarySetFilter
   */
  getLibraryCards(
    libraryQueryParams: CardQueryParamsDto,
    libraryFilterParams: CardFilterParamsDto | null,
    librarySetFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<LibraryCardListDto>>;
  //#endregion

  //#region Collection Search -------------------------------------------------
  collectionQueryParams: CardQueryParamsDto;
  collectionQueryResult: QueryResultDto<CollectionCardListDto>;
  collectionFilter: Array<CollectionDto>;
  getCollectionCards(
    collectionQueryParams: CardQueryParamsDto,
    collectionFilter: Array<CollectionDto>
  ): Promise<QueryResultDto<CollectionCardListDto>>;
  //#endregion

  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy, preferences: PreferencesDto): void;
  //#endregion
}
