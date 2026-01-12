import { Checkbox, ControlGroup, FormGroup, HTMLTable, InputGroup, NumericInput, Tab, Tabs, Text, TextAlignment } from "@blueprintjs/core";
import { useState } from "react";
import { useServices } from "../../../../hooks";
import { LanguageDto } from "../../../dto";
import { createAuditableLabelValueItems, LabelValuePanel, renderBoolean } from "../../base/label-value-panel";
import { LanguageButtonBar } from "../../card-detail-view/language-button-bar/language-button-bar";
import { MtgSetDialogBodyProps } from "./mtg-set-dialog.props";

export function MtgSetDialogBody(props: MtgSetDialogBodyProps) {
  // #region State ------------------------------------------------------------
  const [currentLanguage, setCurrentLanguage] = useState<LanguageDto>(props.viewmodel.languages[0]);
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {renderSetDetailsLanguageHeader()}
      <Tabs animate={true} defaultSelectedTabId="basic" renderActiveTabPanelOnly={true}>
        <Tab
          id="basic"
          key="basic"
          title="Set Details"
          panel={renderSetDetailsPanel(!serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN"))}
        />
        <Tab
          id="additional"
          key="additional"
          title="Additional Info"
          panel={renderAdditionalInfoPanel(!serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN"))}
        />
      </Tabs>
    </>
  );

  function renderSetDetailsPanel(readOnly: boolean): React.JSX.Element {
    return (
      <>
        {
          readOnly && renderReadOnlyDetails()
        }
        {
          !readOnly && renderReadWriteDetails()
        }
      </>
    );
  }

  function renderSetDetailsLanguageHeader(): JSX.Element {
    if (props.viewmodel.languages.length == 1 && props.viewmodel.languages[0].language == "ENGLISH") {
      return (<></>);
    } else {
      return (
        <>
          <LanguageButtonBar
            currentLanguage={currentLanguage}
            allLanguages={props.viewmodel.languages}
            onButtonClick={setCurrentLanguage}
          />
          <Text style={{ textAlign: TextAlignment.CENTER, paddingTop: "5px", paddingBottom: "5px" }}>
            {props.viewmodel.name.get(currentLanguage.language) ?? props.viewmodel.setName}
          </Text>
        </>
      );
    }
  }

  function renderAdditionalInfoPanel(readOnly: boolean): JSX.Element {
    return (
      <>
        {
          readOnly && renderReadOnlyAdditionalInfo()
        }
        {
          !readOnly && renderReadWriteAdditionalInfo()
        }
      </>
    );
  }

  function renderReadOnlyAdditionalInfo(): JSX.Element {
    const items = createAuditableLabelValueItems(props.viewmodel);
    return (<LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />);
  }

  function renderReadWriteAdditionalInfo(): JSX.Element {
    const items = createAuditableLabelValueItems(props.viewmodel);
    return (
      <>
        <ControlGroup
          key="codes-group"
          fill={true}
          vertical={false}
        >
          <FormGroup
            id="set-code-group"
            label="Set Code"
            labelFor="set-code"
          >
            <InputGroup
              id="set-code"
              inputMode="text"
              readOnly={true}
              size="small"
              type="text"
              value={props.viewmodel.code}
            />
          </FormGroup>
          <FormGroup
            id="token-code-group"
            label="Token Set Code"
            labelFor="token-code"
          >
            <InputGroup
              id="token-code"
              inputMode="text"
              readOnly={true}
              size="small"
              type="text"
              value={props.viewmodel.tokenSetCode ?? ""}
            />
          </FormGroup>
        </ControlGroup>
        <LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />
      </>
    );
  }

  function renderTableRow(value1: boolean, label1: string, value2: boolean, label2: string): JSX.Element {
    return (
      <tr>
        <td style={{ paddingLeft: "0px" }}>
          <Checkbox
            checked={value1}
            readOnly={true}
          >
            {label1}
          </Checkbox>
        </td>
        <td>
          <Checkbox
            checked={value2}
            readOnly={true}
          >
            {label2}
          </Checkbox>
        </td>
      </tr>
    );
  }

  function renderReadOnlyDetails(): JSX.Element {
    const items = new Map<string, JSX.Element>([
      ["Set Code", (<Text>{props.viewmodel.code}</Text>)],
      ["Release Date", (<Text>{props.viewmodel.releaseDate}</Text>)],
      ["Set Type", (<Text>{props.viewmodel.type}</Text>)],
      ["Block", (<Text>{props.viewmodel.block ?? ""}</Text>)],
      ["Base Set Size", (<Text>{props.viewmodel.baseSetSize}</Text>)],
      ["Total Set Size", (<Text>{props.viewmodel.totalSetSize}</Text>)],
      ["Partial Preview", renderBoolean(props.viewmodel.partialPreview)],
      ["Non-English Only", renderBoolean(props.viewmodel.foreignOnly)],
      ["Foil Only", renderBoolean(props.viewmodel.foilOnly)],
      ["Non-foil Only", renderBoolean(props.viewmodel.nonFoilOnly)],
      ["Online Only", renderBoolean(props.viewmodel.onlineOnly)],
      ["Paper Only", renderBoolean(props.viewmodel.paperOnly)]
    ]);
    return (<LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />);
  }

  function renderReadWriteDetails(): JSX.Element {
    return (
      <>
        <ControlGroup
          key="release-group"
          fill={true}
          vertical={false}
        >
          <FormGroup
            id="set-code-group"
            label="Set Code"
            labelFor="set-code"
          >
            <InputGroup
              id="set-code"
              inputMode="text"
              readOnly={true}
              size="small"
              type="text"
              value={props.viewmodel.code}
            />
          </FormGroup>
          <FormGroup
            id="release-date-group"
            label="Release Date"
            labelFor="release-date "
          >
            <InputGroup
              id="release-date"
              inputMode="text"
              readOnly={true}
              size="small"
              type="text"
              value={props.viewmodel.releaseDate}
            />
          </FormGroup>
        </ControlGroup>
        <ControlGroup
          key="type-block-group"
          fill={true}
          vertical={false}
        >
          <FormGroup
            id="type-group"
            label="Set Type"
            labelFor="set-type"
          >
            <InputGroup
              id="set-type"
              inputMode="text"
              readOnly={true}
              size="small"
              type="text"
              value={props.viewmodel.type}
            />
          </FormGroup>
          <FormGroup
            id="block-group"
            label="Block"
            labelFor="block"
          >
            <InputGroup
              id="block"
              inputMode="text"
              readOnly={true}
              size="small"
              type="text"
              value={props.viewmodel.block ?? ""}
            />
          </FormGroup>
        </ControlGroup>
        <ControlGroup
          key="size-group"
          fill={true}
          vertical={false}
        >
          <FormGroup
            id="base-size-group"
            label="Base Set Size"
            labelFor="base-size"
          >
            <NumericInput
              id="base-size"
              readOnly={true}
              size="small"
              stepSize={1}
              fill={true}
              value={props.viewmodel.baseSetSize}
            />
          </FormGroup>
          <FormGroup
            id="total-size-group"
            label="Total Set Size"
            labelFor="total-size"
          >
            <NumericInput
              id="total-size"
              readOnly={true}
              size="small"
              stepSize={1}
              fill={true}
              value={props.viewmodel.totalSetSize}
            />
          </FormGroup>
        </ControlGroup>
        <HTMLTable
          bordered={false}
          compact={true}
          width="100%"
        >
          <thead></thead>
          <tbody>
            {renderTableRow(props.viewmodel.partialPreview, "Partial Preview", props.viewmodel.foreignOnly, "Non-English only")}
            {renderTableRow(props.viewmodel.foilOnly, "Foil Only", props.viewmodel.nonFoilOnly, "Non-foil only")}
            {renderTableRow(props.viewmodel.onlineOnly, "Online only", props.viewmodel.paperOnly, "Paper only")}
          </tbody>
        </HTMLTable>
      </>
    );
  }
  // #endregion
}
