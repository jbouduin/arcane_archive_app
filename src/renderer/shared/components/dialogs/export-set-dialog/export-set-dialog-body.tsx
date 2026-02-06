import { SectionCard } from "@blueprintjs/core";
import classNames from "classnames";
import { CollectionDto, LanguageDto } from "../../../dto";
import { CardConditionDto } from "../../../dto/card-condition.dto";
import { BaseCheckbox, BaseMultiSelect, CheckBoxTable } from "../../input";
import { ExportSetDialogBodyProps } from "./export-set-dialog.props";

export function ExportSetDialogBody(props: ExportSetDialogBodyProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <BaseMultiSelect
        allItems={props.viewmodel.allCollections}
        fieldName="collectionIds"
        label="Collections"
        labelInfo="*"
        viewmodel={props.viewmodel}
        validation="synchronous"
        idExtractor={(value: CollectionDto) => value.id!}
        viewmodelChanged={props.viewmodelChanged}
      />
      <CheckBoxTable
        key="languages"
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        fieldName="languages"
        value={(optionValue: LanguageDto) => optionValue.language}
        allOptions={props.viewmodel.allLanguages}
        columns={3}
        tableHeader="Languages"
        validation="synchronous"
      />
      <p className={classNames("bp6-divider", "ruling-divider")} />
      <CheckBoxTable
        key="card-conditions-2"
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        fieldName="cardConditions"
        value={(optionValue: CardConditionDto) => optionValue.condition}
        columns={3}
        allOptions={props.viewmodel.allCardConditions}
        tableHeader="Card Conditions"
        disabled={true}
      />
      <p
        className={classNames("bp6-divider", "ruling-divider")}
        style={{ marginBottom: "12px" }}
      />
      <BaseCheckbox
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        fieldName="openFile"
      >
        Open file after export (not implemented)
      </BaseCheckbox>
    </SectionCard>
  );
  //#endregion
}
