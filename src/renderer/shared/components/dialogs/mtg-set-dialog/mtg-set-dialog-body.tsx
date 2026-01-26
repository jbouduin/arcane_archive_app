import { ControlGroup, HTMLTable, Tab, Tabs, Text, TextAlignment } from "@blueprintjs/core";
import { useState } from "react";
import { useServices } from "../../../../hooks";
import { LanguageDto, MtgSetDto } from "../../../dto";
import { createAuditableLabelValueItems, LabelValueItem, LabelValuePanel } from "../../base/label-value-panel";
import { BaseCheckbox, BaseInput } from "../../input";
import { LanguageButtonBar } from "../../language-button-bar";
import { MtgSetDialogBodyProps } from "./mtg-set-dialog.props";

export function MtgSetDialogBody(props: MtgSetDialogBodyProps): JSX.Element {
  //#region State -------------------------------------------------------------
  const [currentLanguage, setCurrentLanguage] = useState<LanguageDto>(props.viewmodel.languages[0]);
  //#endregion

  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
  //#endregion

  //#region Rendering ---------------------------------------------------------
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
            {props.viewmodel.name.get(currentLanguage.language) ?? props.viewmodel.dto["setName"]}
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
    const items = createAuditableLabelValueItems(props.viewmodel.dto);
    return (<LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />);
  }

  function renderReadWriteAdditionalInfo(): JSX.Element {
    const items = createAuditableLabelValueItems(props.viewmodel.dto);
    return (
      <>
        <ControlGroup
          key="codes-group"
          fill={true}
          vertical={false}
        >
          <BaseInput
            viewmodel={props.viewmodel}
            fieldName="code"
            viewmodelChanged={props.viewmodelChanged}
            validation="none"
            label="Set Code"
            inputProps={{
              readOnly: true
            }}
          />
          <BaseInput
            viewmodel={props.viewmodel}
            fieldName="tokenSetCode"
            viewmodelChanged={props.viewmodelChanged}
            validation="none"
            label="Token Set Code"
            inputProps={{
              readOnly: true
            }}
          />
        </ControlGroup>
        <LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />
      </>
    );
  }

  function renderTableRow(
    fieldName1: keyof MtgSetDto,
    label1: string,
    fieldName2: keyof MtgSetDto,
    label2: string
  ): JSX.Element {
    return (
      <tr>
        <td style={{ paddingLeft: "0px" }}>
          <BaseCheckbox
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName={fieldName1}
            checkBoxProps={{
              readOnly: true
            }}
          >
            {label1}
          </BaseCheckbox>
        </td>
        <td>
          <BaseCheckbox
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName={fieldName2}
            checkBoxProps={{
              readOnly: true
            }}
          >
            {label2}
          </BaseCheckbox>
        </td>
      </tr>
    );
  }

  function renderReadOnlyDetails(): JSX.Element {
    const items = new Map<string, JSX.Element>([
      ["Set Code", (<LabelValueItem viewmodel={props.viewmodel} fieldName="code" fieldType="string" />)],
      ["Release Date", (<LabelValueItem viewmodel={props.viewmodel} fieldName="releaseDate" fieldType="date" />)],
      ["Set Type", (<LabelValueItem viewmodel={props.viewmodel} fieldName="type" fieldType="string" />)],
      ["Block", (<LabelValueItem viewmodel={props.viewmodel} fieldName="block" fieldType="string" />)],
      ["Base Set Size", (<LabelValueItem viewmodel={props.viewmodel} fieldName="baseSetSize" fieldType="number" />)],
      ["Total Set Size", (<LabelValueItem viewmodel={props.viewmodel} fieldName="totalSetSize" fieldType="string" />)],
      ["Partial Preview", (<LabelValueItem viewmodel={props.viewmodel} fieldName="partialPreview" fieldType="boolean" />)],
      ["Non-English Only", (<LabelValueItem viewmodel={props.viewmodel} fieldName="foreignOnly" fieldType="boolean" />)],
      ["Foil Only", (<LabelValueItem viewmodel={props.viewmodel} fieldName="foilOnly" fieldType="boolean" />)],
      ["Non-foil Only", (<LabelValueItem viewmodel={props.viewmodel} fieldName="nonFoilOnly" fieldType="boolean" />)],
      ["Online Only", (<LabelValueItem viewmodel={props.viewmodel} fieldName="onlineOnly" fieldType="boolean" />)],
      ["Paper Only", (<LabelValueItem viewmodel={props.viewmodel} fieldName="paperOnly" fieldType="boolean" />)]
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
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="code"
            validation="none"
            label="Set Code"
            inputProps={{
              readOnly: true
            }}
          />
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="releaseDate"
            validation="none"
            label="Release Date"
            inputProps={{
              readOnly: true
            }}
          />
        </ControlGroup>
        <ControlGroup
          key="type-block-group"
          fill={true}
          vertical={false}
        >
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="type"
            label="Set Type"
            validation="none"
            inputProps={{
              readOnly: true
            }}
          />
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="block"
            label="Block"
            validation="none"
            inputProps={{
              readOnly: true
            }}
          />
        </ControlGroup>
        <ControlGroup
          key="size-group"
          fill={true}
          vertical={false}
        >
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="baseSetSize"
            label="Base Set Size"
            validation="none"
            numericInputProps={{
              readOnly: true,
              stepSize: 1,
              fill: true
            }}
          />
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="totalSetSize"
            label="Total Set Size"
            validation="none"
            numericInputProps={{
              readOnly: true,
              stepSize: 1,
              fill: true
            }}
          />
        </ControlGroup>
        <HTMLTable
          bordered={false}
          compact={true}
          width="100%"
        >
          <thead></thead>
          <tbody>
            {
              renderTableRow("partialPreview", "Partial Preview", "foreignOnly", "Non-English only")
            }
            {
              renderTableRow("foilOnly", "Foil Only", "nonFoilOnly", "Non-foil only")
            }
            {
              renderTableRow("onlineOnly", "Online only", "paperOnly", "Paper only")
            }
          </tbody>
        </HTMLTable>
      </>
    );
  }
  //#endregion
}
