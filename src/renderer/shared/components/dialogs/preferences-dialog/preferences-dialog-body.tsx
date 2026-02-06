import { Callout, ControlGroup, Tab, Tabs } from "@blueprintjs/core";
import { useServices, useSession } from "../../../../hooks";
import { CardConditionDto } from "../../../dto/card-condition.dto";
import { BaseCheckbox, BaseHtmlSelect, CheckBoxTable } from "../../input";
import { PreferencesDialogBodyProps } from "./preferences-dialog.props";

export function PreferencesDialogBody(props: PreferencesDialogBodyProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const { basicDataService } = useServices();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        !loggedIn &&
        (
          <Callout compact={true} intent="warning">
            You are not logged in.
            Your preferences will be stored locally only.
          </Callout>
        )
      }
      <Tabs animate={true} defaultSelectedTabId="basic" renderActiveTabPanelOnly={true}>
        <Tab
          id="basic"
          key="basic"
          title="Preferences"
          panel={renderBasicPreferences()}
        />
        <Tab
          id="library-treeview"
          key="library-treeview"
          title="Library Set Tree"
          panel={renderLibraryTreeviewmodel()}
        />
        {
          loggedIn &&
          (
            <Tab
              id="card-conditions"
              key="card-conditions"
              title="Card Conditions"
              panel={(
                <CheckBoxTable
                  key="cardconditions"
                  columns={3}
                  allOptions={basicDataService.getCardConditionSelectOptions()}
                  value={(cardCondition: CardConditionDto) => cardCondition.condition}
                  viewmodel={props.viewmodel}
                  fieldName="cardConditions"
                  viewmodelChanged={props.viewmodelChanged}
                  validation="synchronous"
                />
              )}
            />
          )
        }
      </Tabs>

    </>
  );

  function renderBasicPreferences(): JSX.Element {
    return (
      <>
        <BaseCheckbox
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="useDarkTheme"
        >
          Dark Theme
        </BaseCheckbox>
        <BaseCheckbox
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="refreshCacheAtStartup"
        >
          Refresh cache at startup
        </BaseCheckbox>
        <ControlGroup
          key="group-1"
          fill={true}
          vertical={false}
        >
          <BaseHtmlSelect
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="cachedImageSize"
            label="Size of Cached Images"
          />
          <BaseHtmlSelect
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="defaultPageSize"
            label="Default Page SIze"
          />
        </ControlGroup>
        <ControlGroup
          key="group-2"
          fill={true}
          vertical={false}
        >
          <BaseHtmlSelect
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="defaultCardSortField"
            label="Default Sort Field (Cards)"
          />
          <BaseHtmlSelect
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="defaultCardSortField"
            label="Sort Direction"
          />
        </ControlGroup>
      </>
    );
  }

  function renderLibraryTreeviewmodel(): JSX.Element {
    const viewmodel = props.viewmodel.librarySetTreeSettingsViewmodel;
    return (
      <>
        <ControlGroup
          key="set-preferences"
          fill={true}
          vertical={false}
        >
          <BaseHtmlSelect
            viewmodel={viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="cardSetSort"
            label="Sort sets in tree by"
          />
          <BaseHtmlSelect
            viewmodel={viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="cardSetGroupBy"
            label="Group sets in tree by"
          />
        </ControlGroup>
        <CheckBoxTable
          key="set-type-filter"
          columns={3}
          allOptions={basicDataService.getSelectOptions("setType")}
          value={(setType: string) => setType}
          viewmodel={viewmodel}
          fieldName="cardSetTypeFilter"
          viewmodelChanged={props.viewmodelChanged}
        />
      </>
    );
  }
  // #endregion
}
