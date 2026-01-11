import { Button, Callout, FormGroup, HTMLSelect, Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { LogLevel } from "../../../../../common/enums";
import { IpcPaths } from "../../../../../common/ipc";
import { useServices } from "../../../../hooks";
import { handleStringChange } from "../../util";
import { handleValueChange } from "../../util/handle-value-change";
import { ValidatedInput } from "../../validated-input/validated-input";
import { SystemSettingsDialogBodyProps } from "./system-settings-dialog.props";

export function SystemSettingsDialogBody(props: SystemSettingsDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function onSearchDirectory(target: "data" | "cache" | "log") {
    let current: string;

    switch (target) {
      case "data":
        current = props.viewmodel.rootDataDirectory;
        break;
      case "cache":
        current = props.viewmodel.cacheDirectory;
        break;
      case "log":
        current = props.viewmodel.logDirectory;
        break;
      default:
        throw (new Error("invalid target"));
    }
    // TODO move at least this call to configuration service, better move all
    serviceContainer.ipcProxy.getData<string>(`${IpcPaths.IO_SELECT_DIRECTORY}/${encodeURIComponent(current)}`)
      .then(
        (dir: string | undefined) => {
          if (dir) {
            switch (target) {
              case "data":
                props.viewmodel.rootDataDirectory = dir;
                break;
              case "cache":
                props.viewmodel.cacheDirectory = dir;
                break;
              case "log":
                props.viewmodel.logDirectory = dir;
                break;
            }
            props.viewmodelChanged();
          }
        },
        noop
      );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        props.viewmodel.mode == "create" &&
        (
          <Callout compact={true} intent="danger">
            Changes to Local Storage and API settings can break the application.
            <br />
            Change those default values at your own risk.
          </Callout>
        )
      }
      {
        props.viewmodel.mode == "update" &&
        (
          <Callout compact={true} intent="danger">
            Changes to Local Storage and API settings can break the application and require a restart.
            <br />
            Change them at your own risk.
          </Callout>
        )
      }
      <Tabs
        animate={true}
        defaultSelectedTabId="logging"
        renderActiveTabPanelOnly={true}
      >
        <Tab
          id="logging"
          key="logging"
          title="Logging"
          panel={renderLogging}
        />
        <Tab
          id="local-storage"
          key="local-storage"
          title="Local Storage"
          panel={renderLocalStorage()}
        />
        <Tab
          id="api"
          key="api"
          title="API"
          panel={renderApi()}
        />
      </Tabs>
    </>
  );

  function renderLogging(): JSX.Element {
    return (
      <>
        <FormGroup
          key="log-main"
          label="Log level for main process"
          labelFor="log-main-select"
          fill={true}
        >
          <HTMLSelect
            id="log-main-select"
            minimal={true}
            fill={true}
            onChange={
              handleValueChange((value: LogLevel) => {
                props.viewmodel.mainLogLevel = value;
                props.viewmodelChanged();
              })
            }
            options={props.viewmodel.logLevelOptions}
            value={props.viewmodel.mainLogLevel}
          />
        </FormGroup>
        <FormGroup
          key="log-db"
          label="Log level for database layer"
          labelFor="log-db-select"
          fill={true}
        >
          <HTMLSelect
            id="log-db-select"
            minimal={true}
            fill={true}
            onChange={
              handleValueChange((value: LogLevel) => {
                props.viewmodel.databaseLogLevel = value;
                props.viewmodelChanged();
              })
            }
            options={props.viewmodel.logLevelOptions}
            value={props.viewmodel.databaseLogLevel}
          />
        </FormGroup>
        <FormGroup
          key="log-api"
          label="Log level for API (3rd party)"
          labelFor="log-api-select"
          fill={true}
        >
          <HTMLSelect
            id="log-api-select"
            minimal={true}
            fill={true}
            onChange={
              handleValueChange((value: LogLevel) => {
                props.viewmodel.apiLogLevel = value;
                props.viewmodelChanged();
              })
            }
            options={props.viewmodel.logLevelOptions}
            value={props.viewmodel.apiLogLevel}
          />
          <FormGroup
            key="log-renderer"
            label="Log level for renderer"
            labelFor="log-renderer-select"
            fill={true}
          >
            <HTMLSelect
              id="log-renderer-select"
              minimal={true}
              fill={true}
              onChange={
                handleValueChange((value: LogLevel) => {
                  props.viewmodel.rendererLogLevel = value;
                  props.viewmodelChanged();
                })
              }
              options={props.viewmodel.logLevelOptions}
              value={props.viewmodel.rendererLogLevel}
            />
          </FormGroup>
        </FormGroup>
      </>
    );
  }

  function renderLocalStorage(): JSX.Element {
    return (
      <>
        <ValidatedInput
          keyPrefix="data-root"
          label="Root Data Directory"
          labelInfo="*"
          validationResult={props.viewmodel.getValidation("rootDataDirectory")}
          validate={() => props.viewmodel.validateRootDataDirectory()}
          startValidation={() => props.viewmodel.startValidation()}
          endValidation={() => props.viewmodel.endValidation()}
          onValidationComplete={() => props.onValidationCompleted()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter a directory...",
            rightElement: (<Button icon="search" size="small" onClick={() => onSearchDirectory("data")} />),
            size: "small",
            type: "text",
            readOnly: true,
            value: props.viewmodel.rootDataDirectory
          }}
        />
        <ValidatedInput
          keyPrefix="cache-dir"
          label="Cache Directory"
          labelInfo="*"
          validationResult={props.viewmodel.getValidation("cacheDirectory")}
          validate={() => props.viewmodel.validateCacheDataDirectory()}
          startValidation={() => props.viewmodel.startValidation()}
          endValidation={() => props.viewmodel.endValidation()}
          onValidationComplete={() => props.onValidationCompleted()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter a directory...",
            rightElement: (<Button icon="search" size="small" onClick={() => onSearchDirectory("cache")} />),
            size: "small",
            type: "text",
            readOnly: true,
            value: props.viewmodel.cacheDirectory
          }}
        />
        <ValidatedInput
          keyPrefix="log-dir"
          label="Log Directory"
          labelInfo="*"
          validationResult={props.viewmodel.getValidation("logDirectory")}
          validate={() => props.viewmodel.validateLogDirectory()}
          startValidation={() => props.viewmodel.startValidation()}
          endValidation={() => props.viewmodel.endValidation()}
          onValidationComplete={() => props.onValidationCompleted()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter a directory...",
            rightElement: (<Button icon="search" size="small" onClick={() => onSearchDirectory("log")} />),
            size: "small",
            type: "text",
            readOnly: true,
            value: props.viewmodel.logDirectory
          }}
        />
        <ValidatedInput
          keyPrefix="db-name"
          label="Database Name"
          labelInfo="*"
          validationResult={props.viewmodel.getValidation("databaseName")}
          validate={() => props.viewmodel.validateDatabaseName()}
          startValidation={() => props.viewmodel.startValidation()}
          endValidation={() => props.viewmodel.endValidation()}
          onValidationComplete={() => props.onValidationCompleted()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter a name...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.databaseName = newValue;
              props.viewmodelChanged();
            }),
            value: props.viewmodel.databaseName
          }}
        />
      </>
    );
  }

  function renderApi(): JSX.Element {
    return (
      <>
        <ValidatedInput
          keyPrefix="auth-url"
          label="Discovery Internet Address"
          labelInfo="*"
          validationResult={props.viewmodel.getValidation("discovery")}
          validate={() => props.viewmodel.validateDiscovery()}
          startValidation={() => props.viewmodel.startValidation()}
          endValidation={() => props.viewmodel.endValidation()}
          onValidationComplete={() => props.onValidationCompleted()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.discovery = newValue;
              props.viewmodelChanged();
            }),
            value: props.viewmodel.discovery
          }}
        />
      </>
    );
  }
  // #endregion
}
