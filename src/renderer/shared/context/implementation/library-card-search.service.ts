import { LibraryCardListDto, CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../dto";
import { ILibraryCardSearchService } from "../interface";
import { BaseCardSearchService } from "./base-card-search.service";

export class LibraryCardSearchService extends BaseCardSearchService<LibraryCardListDto>
  implements ILibraryCardSearchService {
  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    super();
  }
  //#endregion

  //#region ICardSearchParamService Members -----------------------------------
  public getLibraryCards(
    filterParams: CardQueryFilterDto, setsOnly: boolean, queryParams: QueryParamsDto
  ): Promise<QueryResultDto<LibraryCardListDto>> {
    return this.getCards(
      "/public/card/library",
      setsOnly ? "set" : "advanced",
      filterParams,
      queryParams
    );
  }
  //#endregion
}
