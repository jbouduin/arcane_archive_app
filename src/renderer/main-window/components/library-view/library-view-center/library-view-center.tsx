import { H1 } from "@blueprintjs/core";
import { MtgSetTreeViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewCenterProps } from "./library-view-center.props";

export function LibraryViewCenter(props: LibraryViewCenterProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <H1>Center</H1>
      {
        renderSelectedSets(props.selectedSets)
      }
    </div>
  );

  function renderSelectedSets(selectedSets: Array<MtgSetTreeViewmodel>): React.JSX.Element {
    return (
      <ul>
        {selectedSets.map((set: MtgSetTreeViewmodel) => {
          return (
            <li key={set.id}>
              {set.cardSetName}
            </li>
          );
        })}
      </ul>
    );
  }
  // #endregion
}
