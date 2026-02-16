import { FormGroup, MenuItem } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import { SelectOption } from "../../../types";
import { AaClientSelectProps } from "./aa-client-select.props";
import { itemRenderer, onClear, onRemove, onItemSelect, optionIsSelected, renderReadOnlyTags, tagRenderer, getPopoverProps } from "./shared-select";

/**
 * A multi select component that uses a static (cached) list of items
 */
export function AaClientSelect<T, U, Dto extends object>(props: AaClientSelectProps<T, U, Dto>): JSX.Element {
  //#region Initialization -------------------------------------------------------
  const allItems = props.allItems || props.viewmodel.getSelectOptions(props.fieldName);
  const keyName = props.fieldName.toString();
  const dtoValue = props.viewmodel.dto[props.fieldName] as unknown as Array<U>;
  const selectedOptions = allItems
    .filter((so: SelectOption<T>) => dtoValue.includes(props.idExtractor(so.value)))
    .sort((a: SelectOption<T>, b: SelectOption<T>) => props.itemSort
      ? props.itemSort(a.value, b.value)
      : a.label.toLowerCase().localeCompare(b.label.toLowerCase(), undefined, { caseFirst: "false" })
    );
  const validationResult = props.viewmodel.getValidation(props.fieldName);
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <div className="layout-isolation">
      <FormGroup
        fill={props.fill || true}
        helperText={validationResult.helperText}
        intent={validationResult.intent}
        key={"form-group" + keyName}
        label={props.label}
        labelFor={keyName + "-select"}
        labelInfo={props.labelInfo}
      >
        {
          !props.readonly &&
          (
            <MultiSelect<SelectOption<T>>
              initialContent={null}
              items={allItems}
              key={keyName + "-select"}
              noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
              popoverProps={getPopoverProps()}
              resetOnSelect={true}
              selectedItems={selectedOptions}
              itemsEqual={
                (a: SelectOption<T>, b: SelectOption<T>) => props.idExtractor(a.value) === props.idExtractor(b.value)
              }
              itemListPredicate={filterOptionList}
              itemRenderer={(item: SelectOption<T>, itemProps: ItemRendererProps) =>
                itemRenderer(
                  item, itemProps, optionIsSelected(item, selectedOptions, props.idExtractor), props.preTextElement
                )}
              onClear={() => onClear(props)}
              onItemSelect={(item: SelectOption<T>) => onItemSelect(item, selectedOptions, dtoValue, props)}
              onRemove={(removed: SelectOption<T>) => onRemove(removed, dtoValue, props)}
              tagRenderer={(item: SelectOption<T>) => tagRenderer(item, props.preTextElement)}
            />
          )
        }
        {
          props.readonly && (
            <div className="disabled-tag-div">
              {renderReadOnlyTags(selectedOptions)}
            </div>
          )
        }
      </FormGroup>
    </div>
  );
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  function filterOptionList(query: string, items: Array<SelectOption<T>>): Array<SelectOption<T>> {
    const normalizedQuery = query.toLowerCase();
    return items
      .filter(item => item.label.toLowerCase().includes(normalizedQuery))
      .sort((a: SelectOption<T>, b: SelectOption<T>) => props.itemSort
        ? props.itemSort(a.value, b.value)
        : a.label.toLowerCase().localeCompare(b.label.toLowerCase(), undefined, { caseFirst: "false" })
      )
      .slice(0, 20);
  }
  //#endregion
}
