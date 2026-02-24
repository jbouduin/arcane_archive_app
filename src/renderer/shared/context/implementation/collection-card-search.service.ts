import { CollectionCardListDto, QueryResultDto } from "../../dto";
import { CollectionViewDto } from "../../dto/desktop";
import { ICollectionCardSearchService } from "../interface";
import { BaseCardSearchService } from "./base-card-search.service";

export class CollectionCardSearchService extends BaseCardSearchService<CollectionCardListDto, CollectionViewDto>
  implements ICollectionCardSearchService {
  //#region Constructor -------------------------------------------------------
  public constructor() {
    super();
  }
  //#endregion

  //#region ICardSearchParamService Members -----------------------------------
  public async search(viewDto: CollectionViewDto): Promise<QueryResultDto<CollectionCardListDto>> {
    const result: QueryResultDto<CollectionCardListDto> = await this.newGetCards(
      "/auth/card/collection",
      viewDto.selectedSearchTab == 0 ? "collection" : "advanced",
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
