import "./synchronization-dialog.css";

import { Checkbox, HTMLTable, SectionCard, Tab, Tabs } from "@blueprintjs/core";
import { Fragment } from "react/jsx-runtime";
import { SyncTaskViewmodel } from "../../../viewmodel";
import { BaseDivider } from "../../base/base-divider/base-divider";
import { AaCheckbox, AaHtmlSelect } from "../../input";
import { handleBooleanChange } from "../../input/value-change-handler";
import { SynchronizationDialogBodyProps } from "./synchronization-dialog.props";

export function SynchronizationDialogBody(props: SynchronizationDialogBodyProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <AaHtmlSelect
        fieldName="allCardSets"
        label="Synchronize all cards of all cardsets"
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
      />
      <Tabs
        animate={true}
        defaultSelectedTabId="non-catalog"
        id="sync-tabs"
        renderActiveTabPanelOnly={true}
      >
        <Tab
          id="non-catalog"
          panel={renderTasks(props.viewmodel.nonCatalogTaskViewmodels)}
          title="General"
        />
        <Tab
          id="catalog"
          panel={renderCatalogPanel()}
          title="Catalogs"
        />
      </Tabs>
    </SectionCard>
  );

  function renderCatalogPanel(): JSX.Element {
    return (
      <>
        <Checkbox
          checked={props.viewmodel.allCatalogsSelected}
          onChange={
            handleBooleanChange((newValue: boolean) => {
              props.viewmodel.allCatalogsSelected = newValue;
              props.viewmodelChanged();
            })
          }
        >
          All catalogs
        </Checkbox>
        {
          props.viewmodel.allCatalogsSelected && (
            <AaHtmlSelect
              fieldName="allScryfallCatalogs"
              label="Synchronization mode"
              viewmodel={props.viewmodel}
              viewmodelChanged={props.viewmodelChanged}
            />
          )
        }
        {
          !props.viewmodel.allCatalogsSelected && renderTasks(props.viewmodel.catalogTaskViewmodels)
        }
      </>
    );
  }

  function renderTasks(tasks: Array<SyncTaskViewmodel>): JSX.Element {
    const allTasks = tasks.map((task: SyncTaskViewmodel) => (
      <Fragment key={`${task.dto.target}`}>
        <tr>
          <td colSpan={2} className="aa-sync-task-td">
            {task.label}
          </td>
        </tr>
        <tr>
          <td className="aa-sync-task-td">
            <AaHtmlSelect
              fieldName="mode"
              viewmodel={task}
              viewmodelChanged={props.viewmodelChanged}
            />
          </td>
          <td className="aa-sync-task-td">
            <AaCheckbox
              checkBoxProps={{ className: "aa-dump-data-checkbox" }}
              fieldName="dumpData"
              viewmodel={task}
              viewmodelChanged={props.viewmodelChanged}
            >
              Dump data
            </AaCheckbox>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="aa-sync-task-td">
            <BaseDivider />
          </td>
        </tr>
      </Fragment>
    ));
    return (
      <HTMLTable
        bordered={false}
        compact={true}
        width="100%"
      >
        <tbody>
          {allTasks}
        </tbody>
      </HTMLTable>
    );
  }
  //#endregion
}
