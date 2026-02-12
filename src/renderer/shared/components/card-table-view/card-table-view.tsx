import { Region, SelectionModes, Table2, Utils } from "@blueprintjs/table";
import { CardSortField } from "../../types";
import {
  BaseLookupResult, IBaseColumn, onDataSelected,
  selectedRegionTransformToRowSelection, SortDirection, SortType
} from "../base/base-table";
import { CardTableViewProps } from "./card-table-view.props";

// LATER if props.data changes clear the selected region -> be carefull: that makes the selected region stuff controlled
export function CardTableView<T>(props: CardTableViewProps<T>): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="cards-table-wrapper">
      <Table2
        bodyContextMenuRenderer={props.bodyContextMenuRenderer}
        // BUG it looks like not all cells are re-rendered when required. e.g. Mana Cost, Rarity (all non standard text columns ???)
        cellRendererDependencies={[props.data, props.sortedIndexMap, props.version]}
        children={getTableChildren(props.sortableColumnDefinitions, props.sortType)}
        numRows={props.data?.length ?? 0}
        onSelection={
          (selectedRegions: Array<Region>) => props.onDataSelected(
            onDataSelected(selectedRegions, props.data, props.sortedIndexMap)
          )
        }
        selectedRegionTransform={(region: Region) => selectedRegionTransformToRowSelection(region)}
        selectionModes={SelectionModes.ROWS_AND_CELLS}
      />
    </div>
  );

  function getTableChildren(
    sortableColumnDefinitions: Array<IBaseColumn<T, BaseLookupResult>>, sortType: SortType
  ): Array<JSX.Element> {
    return sortType == "client"
      ? sortableColumnDefinitions.map(
        (c: IBaseColumn<T, BaseLookupResult>) => c.getClientSortedColumn(getCellData, clientSortColumn)
      )
      : sortableColumnDefinitions.map(
        (c: IBaseColumn<T, BaseLookupResult>) => c.getServerSortedColumn(getCellData, serverSortColumn)
      );
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  function getCellData<U>(rowIndex: number, valueCallBack: (row: T) => U): U {
    if (props.sortedIndexMap) {
      const sortedRowIndex = props.sortedIndexMap[rowIndex];
      if (sortedRowIndex != null) {
        rowIndex = sortedRowIndex;
      }
    }
    return valueCallBack(props.data[rowIndex]);
  }

  function clientSortColumn(comparator: (a: T, b: T) => number): void {
    const sortedIndexMap = Utils.times(props.data.length, (i: number) => i);
    sortedIndexMap.sort((a: number, b: number) => {
      return comparator(props.data[a], props.data[b]);
    });
    props.onClientColumnSort!(sortedIndexMap);
  }

  function serverSortColumn(columnName: CardSortField, direction: SortDirection): void {
    props.onServerColumnSort!(columnName, direction);
  }
  // #endregion
}
