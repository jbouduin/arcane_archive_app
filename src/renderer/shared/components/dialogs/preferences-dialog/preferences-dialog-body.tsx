import { Callout, Checkbox, ControlGroup, FormGroup, HTMLSelect, HTMLTable, Icon, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import { CachedImageSize, CardSetGroupBy, CardSetSort } from "../../../../../common/types";
import { useServices, useSession } from "../../../../hooks";
import { CardSortField, SelectOption } from "../../../types";
import { SetTreeSettingsViewmodel } from "../../../viewmodel/settings";
import { SortDirection } from "../../base/base-table";
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
        <Checkbox
          key="dark-theme"
          checked={props.viewmodel.useDarkTheme}
          onChange={
            handleBooleanChange((value: boolean) => {
              props.viewmodel.useDarkTheme = value;
              props.viewmodelChanged();
            })
          }
        >
          Dark Theme
        </Checkbox>
        <Checkbox
          key="refresh-cache"
          checked={props.viewmodel.refreshCacheAtStartup}
          onChange={
            handleBooleanChange((value: boolean) => {
              props.viewmodel.refreshCacheAtStartup = value;
              props.viewmodelChanged();
            })
          }
        >
          Refresh cache at startup
          <Tooltip
            openOnTargetFocus={false}
            content={(<span>Explain ...</span>)}
          >
            <Icon style={{ paddingLeft: "5px" }} icon="help" intent="primary" />
          </Tooltip>
        </Checkbox>
        <Checkbox
          key="log-server-response"
          checked={props.viewmodel.logServerResponses}
          onChange={
            handleBooleanChange((value: boolean) => {
              props.viewmodel.logServerResponses = value;
              props.viewmodelChanged();
            })
          }
        >
          Log server responses in console
        </Checkbox>
        <ControlGroup
          key="group-1"
          fill={true}
          vertical={false}
        >
          <FormGroup label="Size of cached images" labelFor="cached-image" fill={true}>
            <HTMLSelect
              id="cached-image"
              minimal={true}
              fill={true}
              onChange={
                handleValueChange((value: CachedImageSize) => {
                  props.viewmodel.cachedImageSize = value;
                  props.viewmodelChanged();
                })
              }
              options={props.viewmodel.cachedImageSizeOptions}
              value={props.viewmodel.cachedImageSize}
            />
          </FormGroup>
          <FormGroup label="Default Page size" labelFor="page-size" fill={true}>
            <HTMLSelect
              id="page-size"
              minimal={true}
              fill={true}
              onChange={
                handleValueChange((value: number) => {
                  props.viewmodel.defaultPageSize = value;
                  props.viewmodelChanged();
                })
              }
              options={props.viewmodel.pageSizeOptions}
              value={props.viewmodel.defaultPageSize}
            />
          </FormGroup>
        </ControlGroup>
        <ControlGroup
          key="group-2"
          fill={true}
          vertical={false}
        >
          <FormGroup label="Default Sort field (Cards)" labelFor="card-sort-field" fill={true}>
            <HTMLSelect
              id="card-sort-field"
              minimal={true}
              fill={true}
              onChange={
                handleValueChange((value: CardSortField) => {
                  props.viewmodel.defaultCardSortField = value;
                  props.viewmodelChanged();
                })
              }
              options={props.viewmodel.cardSortFieldOptions}
              value={props.viewmodel.defaultCardSortField}
            />
          </FormGroup>
          <FormGroup label="Sort Direction" labelFor="card-sort-direction" fill={true}>
            <HTMLSelect
              id="card-sort-direction"
              minimal={true}
              fill={true}
              onChange={
                handleValueChange((value: SortDirection) => {
                  props.viewmodel.defaultCardSortDirection = value;
                  props.viewmodelChanged();
                })
              }
              options={props.viewmodel.sortDirectionOptions}
              value={props.viewmodel.defaultCardSortDirection}
            />
          </FormGroup>
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
