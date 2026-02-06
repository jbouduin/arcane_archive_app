import { FormGroup, MenuItem, Tag } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import { ReactNode, useCallback } from "react";
import { SelectOption } from "../../types";
import { HighlightText } from "../base/highlight-text/highlight-text";
import { BaseMultiSelectProps } from "./base-multi-select.props";

/**
 * A multi select component that uses a static (cached) list of items
 */
export function BaseMultiSelect<T, U, Dto extends object>(props: BaseMultiSelectProps<T, U, Dto>): JSX.Element {
  //#region Set Defaults -------------------------------------------------------
  const validation = props.validation || "none";
  //#endregion

  //#region Memo ---------------------------------------------------------------
  const optionIsSelected = useCallback(
    (item: SelectOption<T>, selectedOptions: Array<SelectOption<T>>) =>
      selectedOptions.findIndex((value: SelectOption<T>) => itemComparer(item.value, value.value)) >= 0,
    []
  );
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function onSelect(item: SelectOption<T>, selectedOptions: Array<SelectOption<T>>): void {
    const id = props.idExtractor(item.value);
    if (optionIsSelected(item, selectedOptions)) {
      (props.viewmodel.dto[props.fieldName] as unknown as Array<U>) = dtoValue.filter((val: U) => val != id);
    } else {
      (props.viewmodel.dto[props.fieldName] as unknown as Array<U>).push(id);
    }
    props.viewmodel.markTouched(props.fieldName);
    if (validation != "none") {
      props.viewmodel.validate(props.fieldName);
    }
    props.viewmodelChanged();
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  const keyName = props.fieldName.toString();
  const dtoValue = props.viewmodel.dto[props.fieldName] as unknown as Array<U>;
  const selectedOptions = props.allItems
    .filter((so: SelectOption<T>) => dtoValue.includes(props.idExtractor(so.value)));
  const validationResult = props.viewmodel.getValidation(props.fieldName);
  return (
    <div className="layout-isolation">
      <FormGroup
        label={props.label}
        // labelFor={keyName + "-select"}
        labelInfo={props.labelInfo}
        fill={props.fill}
        helperText={validationResult.helperText}
        intent={validationResult.intent}
      >
        {
          !props.disabled &&
          (
            <MultiSelect<SelectOption<T>>
              key={keyName + "-select"}
              initialContent={null}
              disabled={props.disabled}
              itemListPredicate={filterOptionList}
              itemRenderer={(item: SelectOption<T>, itemProps: ItemRendererProps) => itemRenderer(item, itemProps)}
              items={props.allItems}
              itemsEqual={
                (a: SelectOption<T>, b: SelectOption<T>) => {
                  return itemComparer(a.value, b.value);
                }
              }

              noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
              onClear={() => {
                (props.viewmodel.dto[props.fieldName] as unknown as Array<U>).splice(0);
                props.viewmodel.markTouched(props.fieldName);
                if (validation != "none") {
                  props.viewmodel.validate(props.fieldName);
                }
                props.viewmodelChanged();
              }}
              onItemSelect={(item: SelectOption<T>) => onSelect(item, selectedOptions)}
              onRemove={(removed: SelectOption<T>) => {
                const id = props.idExtractor(removed.value);
                (props.viewmodel.dto[props.fieldName] as unknown as Array<U>) = dtoValue.filter((val: U) => val != id);
                props.viewmodel.markTouched(props.fieldName);
                if (validation != "none") {
                  props.viewmodel.validate(props.fieldName);
                }
                props.viewmodelChanged();
              }}
              popoverProps={{
                matchTargetWidth: true,
                minimal: true,
                modifiers: {
                  eventListeners: {
                    enabled: false
                  }
                }
              }}
              resetOnSelect={true}
              selectedItems={selectedOptions}
              tagRenderer={(item: SelectOption<T>) => tagRenderer(item)}
            />
          )
        }
        {
          props.disabled && (
            <div className="disabled-tag-div">
              {renderReadOnlyTags()}
            </div>
          )
        }
      </FormGroup>
    </div>
  );

  function itemRenderer(item: SelectOption<T>, itemProps: ItemRendererProps): React.JSX.Element | null {
    if (!itemProps.modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={itemProps.modifiers.active}
        disabled={itemProps.modifiers.disabled}
        key={item.label}
        label={item.label}
        onClick={itemProps.handleClick}
        onFocus={itemProps.handleFocus}
        ref={itemProps.ref}
        roleStructure="listoption"
        selected={optionIsSelected(item, selectedOptions)}
        shouldDismissPopover={false}
        text={(
          <div style={{ display: "flex" }}>
            {props.preTextElement?.(item)}
            <HighlightText fullText={item.label} toHighlight={itemProps.query} />
          </div>
        )}
      />
    );
  }

  function tagRenderer(item: SelectOption<T>): ReactNode {
    return (
      <div key={item.label} style={{ display: "flex" }}>
        {props.preTextElement?.(item)}
        {item.label}
      </div>
    );
  }

  function renderReadOnlyTags(): Array<JSX.Element> {
    return selectedOptions.map((value: SelectOption<T>, idx: number) => {
      return (<Tag key={"tag_" + idx.toString()}>{tagRenderer(value)}</Tag>);
    });
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  function filterOptionList(query: string, items: Array<SelectOption<T>>): Array<SelectOption<T>> {
    const normalizedQuery = query.toLowerCase();
    return items
      .filter(item => item.label.toLowerCase().includes(normalizedQuery))
      .slice(0, 20);
  }

  function itemComparer(a: T, b: T): boolean {
    return props.idExtractor(a) == props.idExtractor(b);
  }
  //#endregion
}
