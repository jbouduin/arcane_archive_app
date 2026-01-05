import { Classes, Icon, MaybeElement, Section } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { versionInfo } from "../../../../../common/dto/arcane-archive/version-info";
import { MtgServer } from "../../../types";
import { SystemInfoDialogBodyProps } from "./system-info-dialog.props";

type SectionCardKey = MtgServer | "application";

export function SystemInfoDialogBody(props: SystemInfoDialogBodyProps) {
  // #region State ------------------------------------------------------------
  const [accordeon, setAccordeon] = useState<Map<SectionCardKey, boolean>>(
    new Map<SectionCardKey, boolean>([
      ["application", true],
      ["authentication", false],
      ["library", false],
      ["collection", false],
      ["deck", false]
    ])
  );
  // #endregion

  // #region Event handling ---------------------------------------------------
  function toggleAccordeon(sectionCardKey: SectionCardKey) {
    const c = accordeon.get(sectionCardKey);
    let newState: Map<SectionCardKey, boolean>;

    if (c == true) { // we are collapsing a section card
      newState = cloneDeep(accordeon);
      newState.set(sectionCardKey, false);
    } else {
      newState = new Map<SectionCardKey, boolean>([
        ["application", sectionCardKey == "application"],
        ["authentication", sectionCardKey == "authentication"],
        ["library", sectionCardKey == "library"],
        ["collection", sectionCardKey == "collection"],
        ["deck", sectionCardKey == "deck"]
      ]);
    }
    setAccordeon(newState);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div>
      {renderAppSection()}
      {renderApiSections()}
    </div>
  );

  function renderApiSections(): Array<JSX.Element> {
    return Array.from(props.viewmodel.apiRoots.keys())
      .map((mtgServer: MtgServer) => {
        const status = props.viewmodel.apiStatus.get(mtgServer);
        return (
          <Section
            key={mtgServer}
            collapsible={true}
            collapseProps={{
              isOpen: accordeon.get(mtgServer) || false,
              onToggle: () => toggleAccordeon(mtgServer)
            }}
            compact={true}
            icon={renderIcon(mtgServer)}
            title={mtgServerToTitle(mtgServer)}
          >
            <div className="label-value-panel">
              <div>
                <span className={Classes.TEXT_MUTED}>URL</span>
                {props.viewmodel.apiRoots.get(mtgServer)}
              </div>
              <div>
                <span className={Classes.TEXT_MUTED}>Status</span>
                {status ? "Online" : "Offline"}
              </div>
              <div>
                <span className={Classes.TEXT_MUTED}>Version</span>
                {status ? status.version : "-"}
              </div>
              <div>
                <span className={Classes.TEXT_MUTED}>Environment</span>
                {status ? status.environment : "-"}
              </div>
            </div>
          </Section>
        );
      });
  }

  function renderIcon(sectionCardKey: SectionCardKey): MaybeElement {
    if (sectionCardKey == "application" || props.viewmodel.apiStatus.get(sectionCardKey) != null) {
      return (
        <Icon icon="cloud-tick" intent="success" />
      );
    } else {
      return (
        <Icon icon="cloud" intent="danger" />
      );
    }
  }

  function renderAppSection(): JSX.Element {
    return (
      <Section
        key="app"
        collapsible={true}
        collapseProps={{
          isOpen: accordeon.get("application") || false,
          onToggle: () => toggleAccordeon("application")
        }}
        compact={true}
        icon={renderIcon("application")}
        title={mtgServerToTitle("application")}
      >
        <div className="label-value-panel">
          <div>
            <span className={Classes.TEXT_MUTED}>Arcane Archive Version</span>
            {versionInfo.version}
          </div>
          <div>
            <span className={Classes.TEXT_MUTED}>Chrome Version</span>
            {window.versions.chrome()}
          </div>
          <div>
            <span className={Classes.TEXT_MUTED}>Electron Version</span>
            {window.versions.electron()}
          </div>
          <div>
            <span className={Classes.TEXT_MUTED}>Node Version</span>
            {window.versions.node()}
          </div>
        </div>
      </Section>
    );
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  function mtgServerToTitle(sectionCardKey: SectionCardKey): string {
    switch (sectionCardKey) {
      case "application":
        return "Application";
      case "authentication":
        return "Authentication service";
      case "library":
        return "Library service";
      case "collection":
        return "Collection service";
      case "deck":
        return "Deck service";
    };
  }
  // #endregion
}
