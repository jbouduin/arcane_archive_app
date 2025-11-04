import React from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
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
  const [mosaicLayout, setMosaicLayout] = React.useState<MosaicNode<string>>(initialLayout);
  const [selectedSets, setSelectedSets] = React.useState<Array<MtgSetTreeViewmodel>>(new Array<MtgSetTreeViewmodel>());
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  // #endregion

  // #region Memo -------------------------------------------------------------
  const renderTile = React.useCallback((id: string) => ELEMENT_MAP[id], [selectedSets, selectedCard]);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const ELEMENT_MAP: { [viewId: string]: React.JSX.Element; } = {
    a: <LibraryViewLeft onSetsSelected={(sets: Array<MtgSetTreeViewmodel>) => setSelectedSets(sets)} />,
    b: <LibraryViewCenter selectedSets={selectedSets} onCardSelected={(cardId: number | null) => setSelectedCard(cardId)} />,
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
