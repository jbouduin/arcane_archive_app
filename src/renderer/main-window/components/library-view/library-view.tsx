import { cloneDeep } from "lodash";
import { useReducer, useRef, useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useServices } from "../../../hooks";
import { LibraryViewDto } from "../../../shared/dto";
import { LibraryViewCenter } from "./library-view-center";
import { LibraryViewLeft } from "./library-view-left";
import { LibraryViewRight } from "./library-view-right";
import { LibraryViewProps } from "./library-view.props";

export function LibraryView(props: LibraryViewProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { libraryCardSearchService, viewmodelFactoryService } = useServices();
  //#endregion

  //#region State -------------------------------------------------------------
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
  const viewModelRef = useRef(viewmodelFactoryService.desktopViewmodelFactory
    .getLibraryViewViewmodel(
      cloneDeep(libraryCardSearchService.viewDto),
      (dto: LibraryViewDto) => libraryCardSearchService.search(dto)
    )
  );
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  //#endregion

  //#region Rendering ---------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    a: (
      <LibraryViewLeft
        viewmodel={viewModelRef.current}
        viewmodelChanged={() => forceUpdate()}
        uiStateChanged={() => {
          libraryCardSearchService.viewDto = {
            ...libraryCardSearchService.viewDto,
            uiState: { ...viewModelRef.current.dto.uiState },
            treeConfiguration: viewModelRef.current.dto.treeConfiguration
          };
          forceUpdate();
        }}
      />
    ),
    b: (
      <LibraryViewCenter
        viewmodel={viewModelRef.current}
        viewmodelChanged={() => forceUpdate()}
      />
    ),
    c: <LibraryViewRight cardId={viewModelRef.current.dto.selectedCard?.id || null} />
  };

  return (
    <Mosaic
      renderTile={(id: string) => elementMap[id]}
      value={mosaicLayout}
      onChange={(newNode: MosaicNode<string> | null) => setMosaicLayout(newNode || initialLayout)}
      {...props}
    />
  );
  //#endregion
}
