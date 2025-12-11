import React from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { SortDirection } from "../../../shared/components/base/base-table";
import { CardQueryParamsDto, ColorDto, MtgSetTreeDto } from "../../../shared/dto";
import { CardSearchDto } from "../../../shared/dto/card-search.dto";
import { CardSortField } from "../../../shared/types";
import { MtgSetTreeViewmodel } from "../../../shared/viewmodel";
import { LibraryViewCenter } from "./library-view-center/library-view-center";
import { LibraryViewLeft } from "./library-view-left/library-view-left";
import { LibraryViewRight } from "./library-view-right/library-view-right";
import { LibraryViewProps } from "./library-view.props";

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
  const initialCardQueryParams: CardQueryParamsDto = React.useMemo(
    () => ({
      pageNumber: 0,
      pageSize: 100,
      sortField: "collectorNumberSortValue",
      sortDirection: "ASC",
      selectedAbilities: new Array<string>(),
      selectedActions: new Array<string>(),
      selectedCardColors: new Array<ColorDto>(),
      selectedCardNames: new Array<string>(),
      selectedGameFormats: new Array<string>(),
      selectedIdentityColors: new Array<ColorDto>(),
      selectedProducedManaColors: new Array<ColorDto>(),
      selectedPowers: new Array<string>(),
      selectedRarities: new Array<string>(),
      selectedSets: new Array<MtgSetTreeDto>(),
      selectedSubTypes: new Array<string>(),
      selectedSuperTypes: new Array<string>(),
      selectedToughnesses: new Array<string>(),
      selectedTypes: new Array<string>()
    }),
    []
  );
  const [mosaicLayout, setMosaicLayout] = React.useState<MosaicNode<string>>(initialLayout);
  const [cardQueryDto, setCardQueryDto] = React.useState<CardQueryParamsDto>(initialCardQueryParams);
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  // #endregion

  // #region Memo -------------------------------------------------------------
  const renderTile = React.useCallback((id: string) => elementMap[id], [cardQueryDto, selectedCard]);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = React.useMemo(() => ({
    a: (
      <LibraryViewLeft
        initialCardSearchDto={initialCardQueryParams}
        onSetSelectionChanged={
          (selection: Array<MtgSetTreeViewmodel>) =>
            setCardQueryDto(prev => ({ ...prev, selectedSets: selection.map((set: MtgSetTreeViewmodel) => set.dto) }))
        }
        onAdvancedSearch={(cardSearch: CardSearchDto) => setCardQueryDto(prev => (({ ...prev, ...cardSearch })))}
      />
    ),
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
