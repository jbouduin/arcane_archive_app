import { Props } from "@blueprintjs/core";
import { CollectionCardListDto } from "../../../../shared/dto/collection-card-list.dto";
import { CardQueryParamsDto, QueryResultDto } from "../../../../shared/dto";

export interface CollectionViewCenterProps extends Props {
  queryResult: QueryResultDto<CollectionCardListDto>;
  cardQueryParams: CardQueryParamsDto;
  // selectedCollectionId: number | undefined;
}
