import React from "react";
import { ConfigurationDto } from "../../../../common/dto";
import { BaseDesktop, DesktopContentProps } from "../../../shared/components/base/base-desktop";
import { CollectionView } from "../collection-view";
import { DeckView } from "../deck-view";
import { LibraryView } from "../library-view";
import { ButtonBar } from "./button-bar/button-bar";
import { EDesktopView } from "./desktop-view.enum";
import { MainWindowDesktopProps } from "./main-window-desktop.props";

export function MainWindowDesktop(props: MainWindowDesktopProps) {
  // #region State ------------------------------------------------------------
  const [desktopView, setDesktopView] = React.useState<EDesktopView>(EDesktopView.Library);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <BaseDesktop
      desktopContent={(props: DesktopContentProps) => desktopContent(props)}
      toastCall={props.toastCall}
    />
  );

  function desktopContent(contentProps: DesktopContentProps): React.JSX.Element {
    return (
      <>
        <ButtonBar
          {...contentProps}
          afterSaveSettings={(saved: ConfigurationDto) => contentProps.onConfigurationChanged(saved)}
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
