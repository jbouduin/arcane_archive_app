import { Callout, Checkbox, ControlGroup, FormGroup, HTMLSelect, HTMLTable, Icon, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import { PreferencesDto } from "../../../../../common/dto";
import { CardSetGroupBy, CardSetSort } from "../../../../../common/types";
import { useServices, useSession } from "../../../../hooks";
import { SelectOption } from "../../../types";
import { PreferencesViewmodel, SetTreeSettingsViewmodel } from "../../../viewmodel/settings";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { handleBooleanChange } from "../../util/handle-boolean-change";
import { handleValueChange } from "../../util/handle-value-change";

export function PreferencesDialogBody(props: BaseDialogBodyProps<PreferencesDto>) {
  const { loggedIn } = useSession();
  const serviceContainer = useServices();

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
        <Checkbox
          key="dark-theme"
          checked={(props.viewmodel as PreferencesViewmodel).useDarkTheme}
          onChange={
            handleBooleanChange((value: boolean) => {
              (props.viewmodel as PreferencesViewmodel).useDarkTheme = value;
              props.viewmodelChanged(props.viewmodel);
            })
          }
        >
          Dark Theme
        </Checkbox>
        <Checkbox
          key="refresh-cache"
          checked={(props.viewmodel as PreferencesViewmodel).refreshCacheAtStartup}
          onChange={
            handleBooleanChange((value: boolean) => {
              (props.viewmodel as PreferencesViewmodel).refreshCacheAtStartup = value;
              props.viewmodelChanged(props.viewmodel);
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
          checked={(props.viewmodel as PreferencesViewmodel).logServerResponses}
          onChange={
            handleBooleanChange((value: boolean) => {
              (props.viewmodel as PreferencesViewmodel).logServerResponses = value;
              props.viewmodelChanged(props.viewmodel);
            })
          }
        >
          Log server responses in console
        </Checkbox>
      </>
    );
  }

  function renderLibraryTreeviewmodel() {
    const viewmodel = (props.viewmodel as PreferencesViewmodel).librarySetTreeSettingsViewmodel;
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
                  props.viewmodelChanged(props.viewmodel);
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
                  props.viewmodelChanged(props.viewmodel);
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
                  props.viewmodelChanged(props.viewmodel);
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
