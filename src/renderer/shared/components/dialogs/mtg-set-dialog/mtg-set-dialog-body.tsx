import { Checkbox, ControlGroup, FormGroup, HTMLTable, InputGroup, NumericInput, Tab, Tabs, Text, TextAlignment } from "@blueprintjs/core";
import classNames from "classnames";
import { useState } from "react";
import { LanguageDto } from "../../../dto";
import { AuditFields } from "../../base/audit-fields/audit-fields";
import { LanguageButtonBar } from "../../card-detail-view/language-button-bar/language-button-bar";
import { MtgSetDialogBodyProps } from "./mtg-set-dialog.props";

// TODO if readonly (non sys-admin render using label-value-panel)
export function MtgSetDialogBody(props: MtgSetDialogBodyProps) {
  // #region State ------------------------------------------------------------
  const [currentLanguage, setCurrentLanguage] = useState<LanguageDto>(props.viewmodel.languages[0]);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Tabs animate={true} defaultSelectedTabId="basic" renderActiveTabPanelOnly={true}>
      <Tab
        id="basic"
        key="basic"
        title="Set Details"
        panel={renderSetDetailsPanel()}
      />
      <Tab
        id="additional"
        key="additional"
        title="Additional Info"
        panel={renderAdditionalInfoPanel()}
      />
    </Tabs>
  );

  function renderSetDetailsPanel(): React.JSX.Element {
    return (
      <>
        {renderSetDetailsLanguageHeader()}
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
              value={props.viewmodel.releaseDate.toLocaleDateString()}
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
            {generateTableRow(props.viewmodel.partialPreview, "Partial Preview", props.viewmodel.foreignOnly, "Non-English only")}
            {generateTableRow(props.viewmodel.foilOnly, "Foil Only", props.viewmodel.nonFoilOnly, "Non-foil only")}
            {generateTableRow(props.viewmodel.onlineOnly, "Online only", props.viewmodel.paperOnly, "Paper only")}
          </tbody>
        </HTMLTable>
      </>
    );
  }

  function renderSetDetailsLanguageHeader(): React.JSX.Element {
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
          <p className={classNames("bp6-divider", "ruling-divider")} />
        </>
      );
    }
  }

  function renderAdditionalInfoPanel() {
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
        <AuditFields auditFields={props.viewmodel} />
      </>
    );
  }

  function generateTableRow(value1: boolean, label1: string, value2: boolean, label2: string): React.JSX.Element {
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
  // #endregion
}
