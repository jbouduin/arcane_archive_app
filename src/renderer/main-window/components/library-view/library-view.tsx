import React from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { CardQueryParamsDto } from "../../../shared/dto";
import { LibraryViewCenter } from "./library-view-center/library-view-center";
import { LibraryViewLeft } from "./library-view-left/library-view-left";
import { LibraryViewRight } from "./library-view-right/library-view-right";
import { LibraryViewProps } from "./library-view.props";
import { SortDirection } from "../../../shared/components/base/base-table";
import { CardSortField } from "../../../shared/types";
import { MtgSetTreeViewmodel } from "../../../shared/viewmodel";

export function LibraryView(props: LibraryViewProps) {
  // #region State ------------------------------------------------------------
  const initialLayout: MosaicNode<string> = {
    direction: "row",
    first: "a",
    second: {
      direction: "row",
      first: "b",
      second: "c",
    },
    splitPercentage: 20,
  };
  const [mosaicLayout, setMosaicLayout] = React.useState<MosaicNode<string>>(initialLayout);
  const [cardQueryDto, setCardQueryDto] = React.useState<CardQueryParamsDto>({ pageNumber: 0, pageSize: 100, sortField: "collectorNumberSortValue", sortDirection: "ASC" });
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  // #endregion

  // #region Memo -------------------------------------------------------------
  const renderTile = React.useCallback((id: string) => elementMap[id], [cardQueryDto, selectedCard]);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = React.useMemo(() => ({
    a: <LibraryViewLeft onSelectionChanged={(selection: Array<MtgSetTreeViewmodel>) => setCardQueryDto(prev => ({ ...prev, selectedSets: selection.map((set: MtgSetTreeViewmodel) => set.id) }))} />,
    b: (
      <LibraryViewCenter
        cardQuery={cardQueryDto}
        onCardSelected={setSelectedCard}
        onCurrentPageChanged={(newPage: number) => setCardQueryDto(prev => ({ ...prev, pageNumber: newPage }))}
        onCurrentPageSizeChanged={(newPageSize: number) => setCardQueryDto(prev => ({ ...prev, pageNumber: 0, pageSize: newPageSize }))}
        onSortChanged={(fieldName: CardSortField, direction: SortDirection) => setCardQueryDto(prev => ({ ...prev, pageNumber: 0, sortField: fieldName, sortDirection: direction }))}
      />
    ),
    c: <LibraryViewRight cardId={selectedCard} />,
  }), [cardQueryDto, selectedCard]);

  return (
    <Mosaic
      renderTile={renderTile}
      value={mosaicLayout}
      onChange={(newNode: MosaicNode<string> | null) => setMosaicLayout(newNode || initialLayout)}
      {...props}
    />
  );
  // #endregion
}
