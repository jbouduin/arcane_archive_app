import { IViewmodelFactoryService } from "../../../../shared/context";
import { LibraryCardListDto, QueryParamsDto, QueryResultDto } from "../../../../shared/dto";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel";

export function getTableData(
  qryResult: QueryResultDto<LibraryCardListDto>,
  cardQuery: QueryParamsDto,
  viewmodelFactoryService: IViewmodelFactoryService
): Array<LibraryCardListViewmodel> {
  const result: Array<LibraryCardListViewmodel> = qryResult.resultList
    .map((c: LibraryCardListDto) => viewmodelFactoryService.mtgCardViewmodelFactory.getLibraryCardListViewmodel(c));
  switch (cardQuery.sortField) {
    case "cardName":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.cardName.localeCompare(y.cardName))
      );
      break;
    case "cmc":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.convertedManaCost - y.convertedManaCost)
      );
      break;
    case "collectorNumberSortValue":
      result.sort((a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
        a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue));
      break;
    case "colorIdentitiesSortValue":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.colorIdentitySortValue.localeCompare(y.colorIdentitySortValue))
      );
      break;
    case "power":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.power.localeCompare(y.power))
      );
    case "rarity":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.raritySortValue - y.raritySortValue)
      );
      break;
    case "setName":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.setName.localeCompare(y.setName))
      );
      break;
    case "toughness":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.toughness.localeCompare(y.toughness))
      );
      break;
    case "typeLine":
      result.sort(
        (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
          sortData(a, b, (x, y) => x.type.localeCompare(y.type))
      );
      break;
    default:
      result.sort((a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) =>
        a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue)
      );
  }
  return cardQuery.sortDirection == "DESC" ? result.reverse() : result;
}

function sortData(
  a: LibraryCardListViewmodel,
  b: LibraryCardListViewmodel,
  compareFn: ((x: LibraryCardListViewmodel, y: LibraryCardListViewmodel) => number)
): number {
  let result: number = compareFn(a, b);
  if (result == 0) {
    result = a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue);
  }
  return result;
}
