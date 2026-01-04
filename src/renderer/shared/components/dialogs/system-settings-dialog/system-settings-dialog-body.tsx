import { Button, Callout, FormGroup, HTMLSelect, Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { IpcPaths } from "../../../../../common/ipc";
import { useServices } from "../../../../hooks";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { SystemSettingsDialogBodyProps } from "./system-settings-dialog-props";
import { LogLevel } from "../../../../../common/enums";
import { handleValueChange } from "../../util/handle-value-change";

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
            props.viewmodelChanged(props.viewmodel);
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
        props.viewmodel.firstTime &&
        (
          <Callout compact={true} intent="danger">
            Changes to Local Storage and API settings can break the application.
            <br />
            Change those default values at your own risk.
          </Callout>
        )
      }
      {
        !props.viewmodel.firstTime &&
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
                props.viewmodelChanged(props.viewmodel);
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
                props.viewmodelChanged(props.viewmodel);
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
                props.viewmodelChanged(props.viewmodel);
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
                  props.viewmodelChanged(props.viewmodel);
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
          validate={() => props.viewmodel.validateRootDataDirectory()}
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
          validate={() => props.viewmodel.validateCacheDataDirectory()}
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
          validate={() => props.viewmodel.validateLogDirectory()}
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
          validate={() => props.viewmodel.validateDatabaseName()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter a name...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.databaseName = newValue;
              props.viewmodelChanged(props.viewmodel);
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
          validate={() => props.viewmodel.validateDiscovery()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.discovery = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            value: props.viewmodel.discovery
          }}
        />
        {/* TODO: display these values also or have a separate dialog which also displays status of all services
        <ValidatedInput
          keyPrefix="auth-url"
          label="Authentication Service Internet Address"
          labelInfo="*"
          validate={() => viewmodel.validateAuthenticationApiRoot()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              viewmodel.authenticationApiRoot = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            value: viewmodel.authenticationApiRoot
          }}
        />
        <ValidatedInput
          keyPrefix="lib-url"
          label="Library Service Internet Address"
          labelInfo="*"
          validate={() => viewmodel.validateLibraryApiRoot()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              viewmodel.libraryApiRoot = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            value: viewmodel.libraryApiRoot
          }}
        />
        <ValidatedInput
          keyPrefix="coll-url"
          label="Collection Service Internet Address"
          labelInfo="*"
          validate={() => viewmodel.validateCollectionApiRoot()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              viewmodel.collectionApiRoot = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            value: viewmodel.collectionApiRoot
          }}
        />
        <ValidatedInput
          keyPrefix="deck-url"
          label="Deck Service Internet Address"
          labelInfo="*"
          validate={() => viewmodel.validateDeckApiRoot()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              viewmodel.deckApiRoot = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            value: viewmodel.deckApiRoot
          }}
        />
        <ValidatedInput
          keyPrefix="scryfall-url"
          label="Scryfall API Internet Address"
          labelInfo="*"
          validate={() => viewmodel.validateScryfallApiRoot()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              viewmodel.scryfallApiRoot = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            value: viewmodel.scryfallApiRoot
          }}
        />
        <ValidatedInput
          keyPrefix="scryfall-url"
          label="Scryfall Card-back Internet Address"
          labelInfo="*"
          validate={() => viewmodel.validateScryfallCardBackRoot()}
          inputProps={{
            inputMode: "text",
            placeholder: "Enter an internet address...",
            size: "small",
            type: "text",
            onChange: handleStringChange((newValue: string) => {
              viewmodel.scryfallCardBackRoot = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            value: viewmodel.scryfallCardBackRoot
          }}
        /> */}
        { /* when changing the value, cancel the dialog and re-opening it: the value is one less than before -> not relevant anymore
         <ValidatedInput
          keyPrefix="scryfall-url"
          label="Scryfall Minimal Request Time-out"
          labelInfo="*"
          validate={() => viewmodel.validateScryfallMinimumRequestTimeout()}
          numericInputProps={{
            placeholder: "Enter an internet address...",
            size: "small",
            onValueChange: (valueAsNumber: number) => {
              viewmodel.scryfallMinimumRequestTimeout = valueAsNumber;
              props.viewmodelChanged(props.viewmodel);
            },
            value: viewmodel.scryfallMinimumRequestTimeout
          }}
        /> */}
      </>
    );
  }
  // #endregion
}
