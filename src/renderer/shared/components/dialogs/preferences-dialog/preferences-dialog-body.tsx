import { Callout, ControlGroup, HTMLTable, Tab, Tabs } from "@blueprintjs/core";
import { useServices, useSession } from "../../../../hooks";
import { SelectOption } from "../../../types";
import { SetTreeSettingsViewmodel } from "../../../viewmodel/settings";
import { BaseCheckbox } from "../../input";
import { BaseHtmlSelect } from "../../input/base-html-select";
import { ToggleCheckbox } from "../../input/toggle-checkbox";
import { PreferencesDialogBodyProps } from "./preferences-dialog.props";

export function PreferencesDialogBody(props: PreferencesDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const serviceContainer = useServices();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        !loggedIn && (
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
      </Tabs>

    </>
  );

  function renderBasicPreferences(): React.JSX.Element {
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
        <BaseCheckbox
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="logServerResponses"
        >
          Log server responses in console
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

  function renderLibraryTreeviewmodel() {
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

  function renderSetTypes(viewmodel: SetTreeSettingsViewmodel): Array<React.JSX.Element> {
    const table = new Array<React.JSX.Element>();
    let currentRow: Array<React.JSX.Element>;
    let idx = 0;
    serviceContainer
      .displayValueService
      .getSelectOptions("setType")
      .forEach((opt: SelectOption<string>) => {
        if (idx % 3 == 0) {
          currentRow = new Array<React.JSX.Element>();
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
        if (idx % 3 == 1) {
          table.push((
            <tr key={`row-${idx}`}>
              {currentRow}
            </tr>
          ));
        }
        idx = idx + 1;
      });
    return table;
  }
  // #endregion
}
