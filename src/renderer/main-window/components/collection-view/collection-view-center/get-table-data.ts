import { QueryResultDto, CollectionCardListDto, QueryParamsDto } from "../../../../shared/dto";
import { CollectionCardListViewmodel, IMtgCardViewmodelFactory } from "../../../../shared/viewmodel";

// TODO implement sort
export function getTableData(
  qryResult: QueryResultDto<CollectionCardListDto>,
  _cardQuery: QueryParamsDto,
  mtgCardViewmodelFactory: IMtgCardViewmodelFactory
): Array<CollectionCardListViewmodel> {
  const result: Array<CollectionCardListViewmodel> = qryResult.resultList.map(
    (c: CollectionCardListDto) => mtgCardViewmodelFactory.getCollectionCardlistViewmodel(c)
  );
  result.sort((a: CollectionCardListViewmodel, b: CollectionCardListViewmodel) =>
    a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue)
  );
  return result;
}
