import { BaseCardListDto, QueryParamsDto } from "../../dto";
import { AbstractCardListViewmodel } from "../../viewmodel/abstract-card-list.viewmodel";

export function getGenericTableData<Dto extends BaseCardListDto, T extends AbstractCardListViewmodel<Dto>>(
  queryData: Array<T>,
  cardQuery: QueryParamsDto
): Array<T> {
  switch (cardQuery.sortField) {
    case "cardName":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.cardName.localeCompare(y.cardName))
      );
      break;
    case "cmc":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.convertedManaCost - y.convertedManaCost)
      );
      break;
    case "collectorNumberSortValue":
      queryData.sort((a: T, b: T) =>
        a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue));
      break;
    case "colorIdentitiesSortValue":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.colorIdentitySortValue.localeCompare(y.colorIdentitySortValue))
      );
      break;
    case "power":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.power.localeCompare(y.power))
      );
    case "rarity":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.raritySortValue - y.raritySortValue)
      );
      break;
    case "setName":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.setName.localeCompare(y.setName))
      );
      break;
    case "toughness":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.toughness.localeCompare(y.toughness))
      );
      break;
    case "typeLine":
      queryData.sort(
        (a: T, b: T) =>
          sortData(a, b, (x, y) => x.type.localeCompare(y.type))
      );
      break;
    default:
      queryData.sort((a: T, b: T) =>
        a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue)
      );
  }
  return cardQuery.sortDirection == "DESC" ? queryData.reverse() : queryData;
}

//#region Auxiliary Methods ---------------------------------------------------
function sortData<Dto extends BaseCardListDto, T extends AbstractCardListViewmodel<Dto>>(
  a: T,
  b: T,
  compareFn: ((x: T, y: T) => number)
): number {
  let result: number = compareFn(a, b);
  if (result == 0) {
    result = a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue);
  }
  return result;
}
//#endregion
