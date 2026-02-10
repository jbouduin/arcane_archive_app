import "./collection-cards-dialog.css";

import { HTMLTable, Tab, TabId, Tabs } from "@blueprintjs/core";
import { useState } from "react";
import { usePreferences } from "../../../../../hooks";
import { BaseDivider } from "../../../../../shared/components/base/base-divider/base-divider";
import { CardHeaderView } from "../../../../../shared/components/card-detail-view/card-header-view/card-header-view";
import { CardImageView } from "../../../../../shared/components/card-detail-view/card-image-view/card-image-view";
import { BaseInput } from "../../../../../shared/components/input";
import { LanguageDto } from "../../../../../shared/dto";
import { CardConditionDto } from "../../../../../shared/dto/card-condition.dto";
import { ScryfallLanguageMap, SelectOption } from "../../../../../shared/types";
import { CollectionCardQuantityViewmodel, CollectionCardViewmodel } from "../../../../../shared/viewmodel";
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

  // TODO create component ownershiptable
  function renderTable(collectionCardViewmodel: CollectionCardViewmodel): JSX.Element {
    // we have to do it this way, as className does not work, try to solve it by using higher specificity in css
    const tdStyle = {
      paddingLeft: "0px",
      paddingBottom: "0px"
    };
    const rows = props.viewmodel.cardConditions
      .map((condition: SelectOption<CardConditionDto>) => {
        return (
          <tr key={condition.value.condition}>
            <td key="col1" style={tdStyle}>{condition.label}</td>
            <td key="col2" style={tdStyle}>
              {renderQuantityInput(collectionCardViewmodel.getQuantityViewmodel(condition.value.condition, false))}
            </td>
            <td key="col3" style={tdStyle}>
              {renderQuantityInput(collectionCardViewmodel.getQuantityViewmodel(condition.value.condition, true))}
            </td>
          </tr>
        );
      });
    return (
      <HTMLTable
        bordered={false}
        compact={true}
        key="the_table"
        width="100%"
      >
        <thead>
          <tr>
            <td key="col1" style={tdStyle}>Condition</td>
            <td key="col2" style={tdStyle}>Non-Foil</td>
            <td key="col3" style={tdStyle}>Foil</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </HTMLTable>
    );
  }

  function renderQuantityInput(viewmodel: CollectionCardQuantityViewmodel): JSX.Element {
    return (
      <BaseInput
        viewmodel={viewmodel}
        fieldName="quantity"
        viewmodelChanged={props.viewmodelChanged}
        validation="synchronous"
        numericInputProps={{
          allowNumericCharactersOnly: true,
          buttonPosition: "none",
          selectAllOnFocus: true,
          style: { maxWidth: "70px", textAlign: "right" },
          min: 0
        }}
      />
    );
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------

  //#endregion
}
