import "./collection-cards-dialog.css";

import { Tab, TabId, Tabs } from "@blueprintjs/core";
import { useState } from "react";
import { usePreferences } from "../../../../../hooks";
import { BaseDivider } from "../../../../../shared/components/base/base-divider/base-divider";
import { CardHeaderView } from "../../../../../shared/components/card-detail-view/card-header-view/card-header-view";
import { CardImageView } from "../../../../../shared/components/card-detail-view/card-image-view/card-image-view";
import { OwnershipTable } from "../../../../../shared/components/ownership-table";
import { LanguageDto } from "../../../../../shared/dto";
import { ScryfallLanguageMap } from "../../../../../shared/types";
import { CollectionCardViewmodel } from "../../../../../shared/viewmodel";
import { CollectionCardsDialogBodyProps } from "./collection-cards-dialog.props";

export function CollectionCardsDialogBody(props: CollectionCardsDialogBodyProps): JSX.Element {
  //#region Pre-Rendering -----------------------------------------------------
  const viewmodel = props.viewmodel.currentCollectionCardViewmodel;
  //#endregion

  //#region State -------------------------------------------------------------
  const [currentLanguage, setCurrentLanguage] = useState<string>(viewmodel.languages[0].language);
  //#endregion

  //#region Hooks -------------------------------------------------------------
  const { preferences } = usePreferences();
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <>
      {
        viewmodel && (
          <>
            <CardHeaderView
              code={viewmodel.cardCode}
              cardName={viewmodel.cardName}
              rarity={viewmodel.rarity}
              keyruneCode={viewmodel.keyruneCode}
              subTitle={viewmodel.setName}
            />
            <BaseDivider />
            <div className="aa-collection-cards-content">
              <div className="aa-collection-cards-image-wrapper">
                <CardImageView
                  cardLayout={viewmodel.layout}
                  cachedImageSize={preferences.cachedImageSize}
                  setCode={viewmodel.setCode}
                  cardBackId={viewmodel.cardBackId}
                  collectorNumber={viewmodel.collectorNumber}
                  scryfallLanguage={ScryfallLanguageMap.get(currentLanguage)!}
                  size="small"
                  imageStatus={viewmodel.getCollectionCardViewmodelForLanguage(currentLanguage).imageStatus}
                />
              </div>
              <div className="aa-ownership-table-wrapper">
                {
                  viewmodel.languages.length == 1 &&
                  (
                    renderTable(viewmodel.getCollectionCardViewmodelForLanguage(viewmodel.languages[0].language))
                  )
                }
                {
                  viewmodel.languages.length > 1 && renderTabs()
                }
              </div>
            </div>

          </>

        )
      }
    </>
  );

  function renderTabs(): JSX.Element {
    const tabs = viewmodel.languages.map((lng: LanguageDto) => {
      const viewmodelForLanguage = viewmodel.getCollectionCardViewmodelForLanguage(lng.language);
      const titleText = lng.buttonText + (viewmodelForLanguage.hasChanges ? "*" : "");
      return (
        <Tab
          key={lng.language}
          id={lng.language}
          title={titleText}
          panel={renderTable(viewmodelForLanguage)}
        />
      );
    });
    return (
      <Tabs
        animate={true}
        children={tabs}
        defaultSelectedTabId={currentLanguage}
        renderActiveTabPanelOnly={true}
        onChange={(newTabId: TabId) => setCurrentLanguage(newTabId.toString())}
      />
    );
  }

  function renderTable(collectionCardViewmodel: CollectionCardViewmodel): JSX.Element {
    return (
      <OwnershipTable
        cardConditions={props.viewmodel.cardConditions}
        collectionCardViewmodel={collectionCardViewmodel}
        viewmodelChanged={props.viewmodelChanged}
      />
    );
  }
  //#endregion
}
