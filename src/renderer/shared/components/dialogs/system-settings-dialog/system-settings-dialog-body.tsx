import { Button, Callout, Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { IpcPaths } from "../../../../../common/ipc";
import { useServices } from "../../../../hooks";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { SystemSettingsDialogBodyProps } from "./system-settings-dialog-props";

export function SystemSettingsDialogBody(props: SystemSettingsDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      <Callout compact={true} intent="danger">
        Changes to these settings can break the application.
        Use at your own risk.
      </Callout>
      <Tabs
        animate={true}
        defaultSelectedTabId="local-storage"
        renderActiveTabPanelOnly={true}
      >
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

  function onSearchDirectory(target: "root" | "cache") {
    let current = target == "root" ? props.viewmodel.rootDataDirectory : props.viewmodel.cacheDirectory;
    if (current != "") {
      current = "/" + encodeURIComponent(props.viewmodel.rootDataDirectory);
    }

    serviceContainer.ipcProxy.getData<string>(`${IpcPaths.IO_SELECT_DIRECTORY}${current}`)
      .then(
        (dir: string | undefined) => {
          if (dir) {
            if (target == "root") {
              props.viewmodel.rootDataDirectory = dir;
            } else {
              props.viewmodel.cacheDirectory = dir;
            }
            props.viewmodelChanged(props.viewmodel);
          }
        },
        noop
      );
  }

  function renderLocalStorage(): React.JSX.Element {
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
            rightElement: (<Button icon="search" size="small" onClick={() => onSearchDirectory("root")} />),
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

  function renderApi(): React.JSX.Element {
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
        {/* LATER: display these values also or have a separate dialog which also displays status of all services
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
