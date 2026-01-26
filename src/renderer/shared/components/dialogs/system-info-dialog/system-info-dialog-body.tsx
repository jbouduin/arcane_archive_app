import { Icon, MaybeElement, Section, Text } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { versionInfo } from "../../../../../common/dto/arcane-archive/version-info";
import { ArcanArchiveServer } from "../../../../../common/types";
import { LabelValuePanel } from "../../base/label-value-panel";
import { SystemInfoDialogBodyProps } from "./system-info-dialog.props";

type SectionCardKey = ArcanArchiveServer | "application";

export function SystemInfoDialogBody(props: SystemInfoDialogBodyProps): JSX.Element {
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
  function toggleAccordeon(sectionCardKey: SectionCardKey): void {
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
      .map((mtgServer: ArcanArchiveServer) => {
        const status = props.viewmodel.apiStatus.get(mtgServer);
        const items = new Map<string, JSX.Element>([
          ["URL", (<Text>{props.viewmodel.apiRoots.get(mtgServer)}</Text>)],
          ["Status", (<Text>{status ? "Online" : "Offline"}</Text>)],
          ["Version", (<Text>{status ? status.version : "-"}</Text>)],
          ["Environment", (<Text>{status ? status.environment : "-"}</Text>)]
        ]);
        return (
          <Section
            key={mtgServer}
            collapsible={true}
            collapseProps={{
              isOpen: accordeon.get(mtgServer) || false,
              onToggle: () => toggleAccordeon(mtgServer)
            }}
            compact={true}
            icon={renderSectionIcon(mtgServer)}
            title={mtgServerToTitle(mtgServer)}
          >
            <LabelValuePanel items={items} />
          </Section>
        );
      });
  }

  function renderSectionIcon(sectionCardKey: SectionCardKey): MaybeElement {
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
    const items = new Map<string, JSX.Element>([
      ["Arcane Archive Version", (<Text>{versionInfo.version}</Text>)],
      ["Chrome Version", (<Text>{window.versions.chrome()}</Text>)],
      ["Electron Version", (<Text>{window.versions.electron()}</Text>)],
      ["Node Version", (<Text>{window.versions.node()}</Text>)]
    ]);

    return (
      <Section
        key="app"
        collapsible={true}
        collapseProps={{
          isOpen: accordeon.get("application") || false,
          onToggle: () => toggleAccordeon("application")
        }}
        compact={true}
        icon={renderSectionIcon("application")}
        title={mtgServerToTitle("application")}
      >
        <LabelValuePanel items={items} />
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
