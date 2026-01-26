import { Button, Callout, Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { DirectoryTarget } from "../../../viewmodel";
import { BaseHtmlSelect, BaseInput } from "../../input";
import { SystemSettingsDialogBodyProps } from "./system-settings-dialog.props";

export function SystemSettingsDialogBody(props: SystemSettingsDialogBodyProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function onSearchDirectory(target: DirectoryTarget): void {
    void serviceContainer.sessionService
      .selectDirectory(
        serviceContainer.ipcProxy, props.viewmodel.dataConfigurationViewmodel.getCurrentDirectoryValue(target)
      )
      .then(
        (dir: string | undefined) => {
          if (dir) {
            props.viewmodel.dataConfigurationViewmodel.setCurrentDirectoryValue(target, dir);
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
        defaultSelectedTabId="logging-renderer"
        renderActiveTabPanelOnly={true}
      >
        <Tab
          id="logging-renderer"
          key="logging-renderer"
          title="Logging (desktop)"
          panel={renderRendererLogging}
        />
        <Tab
          id="logging-main"
          key="logging-main"
          title="Logging (main)"
          panel={renderMainLogging}
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

  function renderMainLogging(): JSX.Element {
    return (
      <>
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getMainLogSettingsViewmodel("Main")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for main process"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getMainLogSettingsViewmodel("DB")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for database layer"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getMainLogSettingsViewmodel("API")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for API (3rd party)"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getMainLogSettingsViewmodel("Renderer")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for renderer"
        />
      </>
    );
  }

  function renderRendererLogging(): JSX.Element {
    return (
      <>
        <BaseHtmlSelect
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="rendererLogLevel"
          label="Desktop Log level"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getResponseLogSettingsViewmodel("IPC")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for IPC requests"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getResponseLogSettingsViewmodel("authentication")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for Authentication Service requests"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getResponseLogSettingsViewmodel("library")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for Library Service requests"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getResponseLogSettingsViewmodel("collection")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for Collection Service requests"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getResponseLogSettingsViewmodel("deck")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for Deck Service requests"
        />
      </>
    );
  }

  function renderLocalStorage(): JSX.Element {
    return (
      <>
        <BaseInput
          viewmodel={props.viewmodel.dataConfigurationViewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="rootDataDirectory"
          validation="synchronous"
          label="Root Data Directory"
          labelInfo="*"
          inputProps={{
            placeholder: "Enter a directory...",
            readOnly: true,
            required: true,
            rightElement: (<Button icon="search" size="small" onClick={() => onSearchDirectory("data")} />),
          }}
        />
        <BaseInput
          viewmodel={props.viewmodel.dataConfigurationViewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="cacheDirectory"
          validation="synchronous"
          label="Cache Directory"
          labelInfo="*"
          inputProps={{
            placeholder: "Enter a directory...",
            readOnly: true,
            required: true,
            rightElement: (<Button icon="search" size="small" onClick={() => onSearchDirectory("cache")} />),
          }}
        />
        <BaseInput
          viewmodel={props.viewmodel.dataConfigurationViewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="logDirectory"
          validation="synchronous"
          label="Log Directory"
          labelInfo="*"
          inputProps={{
            placeholder: "Enter a directory...",
            readOnly: true,
            required: true,
            rightElement: (<Button icon="search" size="small" onClick={() => onSearchDirectory("log")} />),
          }}
        />
        <BaseInput
          viewmodel={props.viewmodel.dataConfigurationViewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="databaseName"
          validation="synchronous"
          label="Database Name"
          labelInfo="*"
          inputProps={{
            placeholder: "Enter a name...",
            required: true
          }}
        />
      </>
    );
  }

  function renderApi(): JSX.Element {
    return (
      <BaseInput
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        fieldName="discovery"
        validation="synchronous"
        label="Discovery Internet Address"
        labelInfo="*"
        inputProps={{
          placeholder: "Enter an internet address...",
          required: true
        }}
      />
    );
  }
  // #endregion
}
