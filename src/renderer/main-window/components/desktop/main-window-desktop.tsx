import { useState } from "react";
import { BaseDesktop, DesktopContentProps } from "../../../shared/components/base/base-desktop";
import { CollectionView } from "../collection-view";
import { DeckView } from "../deck-view";
import { LibraryView } from "../library-view";
import { ButtonBar } from "./button-bar/button-bar";
import { EDesktopView } from "./desktop-view.enum";
import { MainWindowDesktopProps } from "./main-window-desktop.props";

export function MainWindowDesktop(_props: MainWindowDesktopProps) {
  // #region State ------------------------------------------------------------
  const [desktopView, setDesktopView] = useState<EDesktopView>(EDesktopView.Library);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <BaseDesktop
      desktopContent={(props: DesktopContentProps) => desktopContent(props)}
    />
  );

  function desktopContent(contentProps: DesktopContentProps): React.JSX.Element {
    return (
      <>
        <ButtonBar
          {...contentProps}
          currentView={desktopView}
          onDesktopViewSelectionClick={(view: EDesktopView) => setDesktopView(view)}
        />
        <div className="main-panel">
          {
            desktopView == EDesktopView.Library &&
            <LibraryView {...contentProps} />
          }
          {
            desktopView == EDesktopView.Collection &&
            <CollectionView {...contentProps} />
          }
          {
            desktopView == EDesktopView.Deck &&
            <DeckView {...contentProps} />
          }
        </div>
      </>
    );
  }
  // #endregion
}
