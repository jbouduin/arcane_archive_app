import { Callout, Checkbox, ControlGroup, FormGroup, HTMLSelect, HTMLTable, Icon, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import { CardSetGroupBy, CardSetSort } from "../../../../../common/types";
import { useServices, useSession } from "../../../../hooks";
import { SelectOption } from "../../../types";
import { SetTreeSettingsViewmodel } from "../../../viewmodel/settings";
import { BaseCheckbox } from "../../input";
import { BaseHtmlSelect } from "../../input/base-html-select";
import { handleBooleanChange } from "../../util/handle-boolean-change";
import { handleValueChange } from "../../util/handle-value-change";
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

  // TODO replace the HTMLSelects
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
          <Tooltip
            openOnTargetFocus={false}
            content={(<span>Explain ...</span>)}
          >
            <Icon style={{ paddingLeft: "5px" }} icon="help" intent="primary" />
          </Tooltip>
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
          <FormGroup label="Sort sets in tree by" labelFor="sort-sets-by" fill={true}>
            <HTMLSelect
              id="sort-sets-by"
              minimal={true}
              fill={true}
              onChange={
                handleValueChange((value: CardSetSort) => {
                  viewmodel.cardSetSort = value;
                  props.viewmodelChanged();
                })
              }
              options={viewmodel.cardSetSortOptions}
              value={viewmodel.cardSetSort}
            />
          </FormGroup>
          <FormGroup label="Group sets in tree by" labelFor="group-sets-by" fill={true}>
            <HTMLSelect
              id="group-sets-by"
              minimal={true}
              fill={true}
              onChange={
                handleValueChange((value: CardSetGroupBy) => {
                  viewmodel.cardSetGroupBy = value;
                  props.viewmodelChanged();
                })
              }
              options={viewmodel.cardSetGroupByOptions}
              value={viewmodel.cardSetGroupBy}
            />
          </FormGroup>
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
            <Checkbox
              checked={viewmodel.cardSetTypeFilter.indexOf(opt.value) >= 0}
              key={opt.value}
              label={opt.label}
              onChange={
                handleBooleanChange((_value: boolean) => {
                  viewmodel.toggleCardSetFilterType(opt.value);
                  props.viewmodelChanged();
                })
              }
            />
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
