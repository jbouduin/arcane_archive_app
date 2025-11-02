import React from "react";
import { Mosaic } from "react-mosaic-component";
import { MtgSetTreeViewmodel } from "../../../shared/viewmodel";
import { LibraryViewCenter } from "./library-view-center/library-view-center";
import { LibraryViewLeft } from "./library-view-left/library-view-left";
import { LibraryViewRight } from "./library-view-right/library-view-right";
import { LibraryViewProps } from "./library-view.props";

export function LibraryView(props: LibraryViewProps) {
  // #region State ------------------------------------------------------------
  const [selectedSets, setSelectedSets] = React.useState<Array<MtgSetTreeViewmodel>>(new Array<MtgSetTreeViewmodel>());
  // #endregion

  // #region Rendering --------------------------------------------------------
  const ELEMENT_MAP: { [viewId: string]: React.JSX.Element; } = {
    a: <LibraryViewLeft onSetsSelected={(sets: Array<MtgSetTreeViewmodel>) => setSelectedSets(sets)} />,
    b: <LibraryViewCenter selectedSets={selectedSets} />,
    c: <LibraryViewRight />,
  };

  return (
    <Mosaic
      renderTile={(id: string) => ELEMENT_MAP[id]}
      initialValue={{
        direction: "row",
        first: "a",
        second:
        {
          direction: "row",
          first: "b",
          second: "c",
        },
        splitPercentage: 20,
      }}
      {...props}
    />
  );
  // #endregion
}
