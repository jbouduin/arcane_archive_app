import React from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { CardQueryParamsDto } from "../../../shared/dto";
import { LibraryViewCenter } from "./library-view-center/library-view-center";
import { LibraryViewLeft } from "./library-view-left/library-view-left";
import { LibraryViewRight } from "./library-view-right/library-view-right";
import { LibraryViewProps } from "./library-view.props";
import { cloneDeep } from "lodash";
import { SortDirection } from "../../../shared/components/base/base-table";
import { CardSortField } from "../../../shared/types";

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
  const renderTile = React.useCallback((id: string) => ELEMENT_MAP[id], [cardQueryDto, selectedCard]);
  // #endregion

  function currentPageChanged(newPage: number): void {
    const newCardQueryDto = cloneDeep(cardQueryDto);
    newCardQueryDto.pageNumber = newPage;
    setCardQueryDto(newCardQueryDto);
  }

  function pageSizeChanged(newPageSize: number): void {
    const newCardQueryDto = cloneDeep(cardQueryDto);
    newCardQueryDto.pageNumber = 0;
    newCardQueryDto.pageSize = newPageSize;
    setCardQueryDto(newCardQueryDto);
  }

  function onSortChanged(columnName: CardSortField, sortDirection: SortDirection): void {
    const newCardQueryDto = cloneDeep(cardQueryDto);
    newCardQueryDto.sortField = columnName;
    newCardQueryDto.sortDirection = sortDirection;
    setCardQueryDto(newCardQueryDto);
  }

  // #region Rendering --------------------------------------------------------
  const ELEMENT_MAP: { [viewId: string]: React.JSX.Element; } = {
    a: <LibraryViewLeft onSelectionChanged={(selection: CardQueryParamsDto) => setCardQueryDto(selection)} />,
    b: (
      <LibraryViewCenter
        cardQuery={cardQueryDto}
        onCardSelected={(cardId: number | null) => setSelectedCard(cardId)}
        onCurrentPageChanged={(newPage: number) => currentPageChanged(newPage)}
        onCurrentPageSizeChanged={(newPageSize: number) => pageSizeChanged(newPageSize)}
        onSortChanged={(columnName: CardSortField, sortDirection: SortDirection) => onSortChanged(columnName, sortDirection)}
      />
    ),
    c: <LibraryViewRight cardId={selectedCard} />,
  };

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
