import { LibraryCardListDto, QueryResultDto } from "../../dto";
import { LibraryViewDto } from "../../dto/desktop";
import { ILibraryCardSearchService } from "../interface";
import { BaseCardSearchService } from "./base-card-search.service";

export class LibraryCardSearchService extends BaseCardSearchService<LibraryCardListDto, LibraryViewDto>
  implements ILibraryCardSearchService {
  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    super();
  }
  //#endregion

  //#region ICardSearchParamService Members -----------------------------------
  public async search(viewDto: LibraryViewDto): Promise<QueryResultDto<LibraryCardListDto>> {
    const result: QueryResultDto<LibraryCardListDto> = await this.newGetCards(
      "/public/card/library",
      viewDto.selectedSearchTab == 0 ? "set" : "advanced",
      viewDto
    );

    this.viewDto = {
      ...viewDto,
      queryResult: result
    };

    return result;
  }
  //#endregion
}
