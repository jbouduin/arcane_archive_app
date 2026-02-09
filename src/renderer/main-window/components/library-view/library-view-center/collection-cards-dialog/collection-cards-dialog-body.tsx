import { HTMLTable, Tab, Tabs } from "@blueprintjs/core";
import classNames from "classnames";
import { BaseInput } from "../../../../../shared/components/input";
import { LanguageDto } from "../../../../../shared/dto";
import { CardConditionDto } from "../../../../../shared/dto/card-condition.dto";
import { SelectOption } from "../../../../../shared/types";
import { CollectionCardQuantityViewmodel, CollectionCardViewmodel } from "../../../../../shared/viewmodel";
import { CollectionCardsDialogBodyProps } from "./collection-cards-dialog.props";

export function CollectionCardsDialogBody(props: CollectionCardsDialogBodyProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  const viewmodel = props.viewmodel.currentCollectionCardViewmodel;
  return (
    <>
      {
        viewmodel && (
          <>
            <i
              key={`icon-${viewmodel.keyruneCode}`}
              className={classNames("ss", "ss-" + viewmodel.keyruneCode.toLowerCase(), viewmodel.rarity != "COMMON" ? "ss-" + viewmodel.rarity.toLowerCase() : "")}
              style={{ paddingRight: "5px" }}
            >
            </i>
            {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line */}
            {viewmodel.cardName} ({viewmodel.setName})
            {
              viewmodel.languages.length == 1 &&
              (
                renderTable(viewmodel.getCollectionCardViewmodelForLanguage(viewmodel.languages[0].language))
              )
            }
            {
              viewmodel.languages.length > 1 && renderTabs()
            }
          </>
        )
      }
    </>
  );

  function renderTabs(): JSX.Element {
    const tabs = viewmodel.languages.map((lng: LanguageDto, idx: number) => {
      const viewmodelForLanguage = viewmodel.getCollectionCardViewmodelForLanguage(lng.language);
      const titleText = lng.buttonText + (viewmodelForLanguage.hasChanges ? "*" : "");
      return (
        <Tab
          key={lng.language}
          id={"t" + idx.toString()}
          title={titleText}
          panel={renderTable(viewmodelForLanguage)}
        />
      );
    });
    return (
      <Tabs
        fill={true}
        defaultSelectedTabId="t0"
        children={tabs}
      />
    );
  }

  function renderTable(collectionCardViewmodel: CollectionCardViewmodel): JSX.Element {
    const rows = props.viewmodel.cardConditions
      .map((condition: SelectOption<CardConditionDto>) => {
        return (
          <tr key={condition.value.condition}>
            <td key="col1" style={{ paddingLeft: "0px" }}>{condition.label}</td>
            <td key="col2" style={{ paddingLeft: "0px" }}>
              {renderQuantityInput(collectionCardViewmodel.getQuantityViewmodel(condition.value.condition, false))}
            </td>
            <td key="col3" style={{ paddingLeft: "0px" }}>
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
            <td key="col1" style={{ paddingLeft: "0px" }}>Condition</td>
            <td key="col2" style={{ paddingLeft: "0px" }}>Non-Foil</td>
            <td key="col3" style={{ paddingLeft: "0px" }}>Foil</td>
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
          style: { maxWidth: "50px", textAlign: "right" },
          min: 0
        }}
      />
    );
  }
  //#endregion
}
