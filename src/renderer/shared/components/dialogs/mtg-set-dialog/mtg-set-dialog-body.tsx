import { Checkbox, ControlGroup, FormGroup, HTMLTable, InputGroup, Tab, Tabs, Text, TextAlignment } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { LanguageDto, MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { AuditFields } from "../../base/audit-fields/audit-fields";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { LanguageButtonBar } from "../../card-detail-view/language-button-bar/language-button-bar";

export function MtgSetDialogBody(props: BaseDialogBodyProps<MtgSetDto>) {
  const vm = props.viewmodel as MtgSetDetailViewmodel;
  const [currentLanguage, setCurrentLanguage] = React.useState<LanguageDto>(vm.languages[0]);

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
              value={vm.code}
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
              value={vm.releaseDate.toLocaleDateString()}
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
              value={vm.type}
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
              value={vm.block ?? ""}
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
            <InputGroup
              id="base-size"
              inputMode="numeric"
              readOnly={true}
              size="small"
              type="text"
              value={vm.baseSetSize.toString()}
            />
          </FormGroup>
          <FormGroup
            id="total-size-group"
            label="Total Set Size"
            labelFor="total-size"
          >
            <InputGroup
              id="total-size"
              inputMode="text"
              readOnly={true}
              size="small"
              type="text"
              value={vm.totalSetSize.toString()}
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
            {generateTableRow(vm.partialPreview, "Partial Preview", vm.foreignOnly, "Non-English only")}
            {generateTableRow(vm.foilOnly, "Foil Only", vm.nonFoilOnly, "Non-foil only")}
            {generateTableRow(vm.onlineOnly, "Online only", vm.paperOnly, "Paper only")}
          </tbody>
        </HTMLTable>
      </>
    );
  }

  function renderSetDetailsLanguageHeader(): React.JSX.Element {
    if (vm.languages.length == 1 && vm.languages[0].language == "ENGLISH") {
      return (<></>);
    } else {
      return (
        <>
          <LanguageButtonBar
            currentLanguage={currentLanguage}
            allLanguages={vm.languages}
            onButtonClick={setCurrentLanguage}
          />
          <Text style={{ textAlign: TextAlignment.CENTER, paddingTop: "5px", paddingBottom: "5px" }}>
            {vm.name.get(currentLanguage.language) ?? vm.setName}
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
              value={vm.code}
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
              value={vm.tokenSetCode ?? ""}
            />
          </FormGroup>
        </ControlGroup>
        <AuditFields auditFields={vm} />
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
