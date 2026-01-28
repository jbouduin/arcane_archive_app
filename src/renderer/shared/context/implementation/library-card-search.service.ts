import {
  CardFilterParamsDto,
  LibraryCardListDto, MtgSetTreeDto,
  QueryParamsDto, QueryResultDto
} from "../../dto";
import { ILibraryCardSearchService } from "../interface";
import { BaseCardSearchService } from "./base-card-search.service";

export class LibraryCardSearchService extends BaseCardSearchService<LibraryCardListDto>
  implements ILibraryCardSearchService {
  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    super();
  }
  //#endregion

  // #region ICardSearchParamService Members ----------------------------------
  public getLibraryCards(
    cardFilterParams: CardFilterParamsDto | null,
    queryParams: QueryParamsDto,
    setFilter: Array<MtgSetTreeDto>
  ): Promise<QueryResultDto<LibraryCardListDto>> {
    return this.getCards(
      "/public/card/library",
      cardFilterParams,
      queryParams,
      null,
      setFilter
    );
  }
  // #endregion
}
