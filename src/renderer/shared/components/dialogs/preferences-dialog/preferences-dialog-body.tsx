import { Callout, ControlGroup, HTMLTable, Tab, Tabs } from "@blueprintjs/core";
import { useServices, useSession } from "../../../../hooks";
import { CardConditionDto } from "../../../dto/card-condition.dto";
import { SelectOption } from "../../../types";
import { SetTreeSettingsViewmodel } from "../../../viewmodel/settings";
import { BaseCheckbox, BaseHtmlSelect, ToggleCheckbox } from "../../input";
import { PreferencesDialogBodyProps } from "./preferences-dialog.props";

export function PreferencesDialogBody(props: PreferencesDialogBodyProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const serviceContainer = useServices();
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
              panel={renderCardConditions()}
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
        <HTMLTable
          bordered={false}
          compact={true}
          key="set-type-filter"
          width="100%"
        >
          <thead>
            <tr><td colSpan={3} style={{ paddingLeft: "0px" }}>Set types filter</td></tr>
          </thead>
          <tbody>
            {
              renderSetTypes(viewmodel)
            }
          </tbody>
        </HTMLTable>
      </>
    );
  }

  // TODO use CheckBoxTable
  function renderSetTypes(viewmodel: SetTreeSettingsViewmodel): Array<JSX.Element> {
    const table = new Array<JSX.Element>();
    let currentRow: Array<JSX.Element>;
    let idx = 0;
    serviceContainer
      .basicDataService
      .getSelectOptions("setType")
      .forEach((opt: SelectOption<string>) => {
        if (idx % 3 == 0) {
          currentRow = new Array<JSX.Element>();
          table.push((
            <tr key={`row-${idx}`}>
              {currentRow}
            </tr>
          ));
        }
        currentRow.push((
          <td key={`cell-${opt.value}`} style={{ paddingLeft: "0px" }}>
            <ToggleCheckbox
              viewmodel={viewmodel}
              viewmodelChanged={props.viewmodelChanged}
              fieldName="cardSetTypeFilter"
              value={opt.value}
            >
              {opt.label}
            </ToggleCheckbox>
          </td>
        ));
        idx = idx + 1;
      });
    while (idx % 3 != 0) {
      currentRow!.push(<td key={`cell-${idx}`} style={{ paddingLeft: "0px" }}></td>);
      idx = idx + 1;
    }
    return table;
  }

  // TODO use CheckBoxTable
  function renderCardConditions(): JSX.Element {
    const table = new Array<JSX.Element>();
    let currentRow: Array<JSX.Element>;
    let idx = 0;
    serviceContainer
      .basicDataService
      .getCardConditionSelectOptions()
      .forEach((opt: SelectOption<CardConditionDto>) => {
        if (idx % 3 == 0) {
          currentRow = new Array<JSX.Element>();
          table.push((
            <tr key={`row-${idx}`}>
              {currentRow}
            </tr>
          ));
        }
        currentRow.push((
          <td key={`cell-${opt.value}`} style={{ paddingLeft: "0px" }}>
            <ToggleCheckbox
              viewmodel={props.viewmodel}
              viewmodelChanged={props.viewmodelChanged}
              fieldName="cardConditions"
              value={opt.value.condition}
            >
              {opt.label}
            </ToggleCheckbox>
          </td>
        ));
        idx = idx + 1;
      });
    while (idx % 3 != 0) {
      currentRow!.push(<td key={`cell-${idx}`} style={{ paddingLeft: "0px" }}></td>);
      idx = idx + 1;
    }

    return (
      <HTMLTable
        bordered={false}
        compact={true}
        key="set-type-filter"
        width="100%"
      >
        <thead>
          <tr><td colSpan={3} style={{ paddingLeft: "0px" }}>Card Conditions</td></tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </HTMLTable>
    );
  }
  // #endregion
}
