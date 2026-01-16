import { Button, Callout, Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { DirectoryTarget } from "../../../viewmodel";
import { BaseInput } from "../../input";
import { BaseHtmlSelect } from "../../input/base-html-select";
import { SystemSettingsDialogBodyProps } from "./system-settings-dialog.props";

export function SystemSettingsDialogBody(props: SystemSettingsDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function onSearchDirectory(target: DirectoryTarget) {
    serviceContainer.sessionService.selectDirectory(serviceContainer.ipcProxy, props.viewmodel.dataConfigurationViewmodel.getCurrentDirectoryValue(target))
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
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getLogSettingsViewmodel("Main")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for main process"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getLogSettingsViewmodel("DB")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for database layer"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getLogSettingsViewmodel("API")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for API (3rd party)"
        />
        <BaseHtmlSelect
          viewmodel={props.viewmodel.getLogSettingsViewmodel("Renderer")}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="level"
          label="Log level for renderer"
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
