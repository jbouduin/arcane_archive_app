import { FormGroup, MenuItem } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import * as React from "react";
import { SelectOption } from "../../../types";
import { HighlightText } from "../highlight-text/highlight-text";
import { BaseMultiSelectProps } from "./base-multi-select.props";

/**
 * A multi select component that uses a static (cached) list of items
 */
export function BaseMultiSelect<T>(props: BaseMultiSelectProps<T>) {
  // #region Memo --------------------------------------------------------------
  const optionIsSelected = React.useCallback(
    (item: SelectOption<T>) => props.selectedOptions.findIndex(
      (value: SelectOption<T>) => props.itemComparer ? props.itemComparer(item.value, value.value) : item.value == value.value
    ) >= 0,
    [props.selectedOptions]
  );
  // #endregion

  // #region Event handling ----------------------------------------------------
  function onSelect(item: SelectOption<T>): void {
    if (optionIsSelected(item)) {
      props.onOptionRemoved(item);
    } else {
      props.onOptionAdded(item);
    }
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="layout-isolation">
      <FormGroup
        key={props.formGroupLabel}
        label={props.formGroupLabel}
      >
        {/* LATER: solve the issue that taginput has no readonly property, so we have to disable.  */}
        <MultiSelect<SelectOption<T>>
          initialContent={null}
          disabled={props.disabled}
          itemListPredicate={filterOptionList}
          itemRenderer={(item: SelectOption<T>, itemProps: ItemRendererProps) => itemRenderer(item, itemProps)}
          items={props.allItems}
          itemsEqual={
            (a: SelectOption<T>, b: SelectOption<T>) => {
              return props.itemComparer ? props.itemComparer(a.value, b.value) : a.value == b.value;
            }
          }
          key={props.formGroupLabel}
          noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
          onClear={props.onClearSelectedOptions}
          onItemSelect={(item: SelectOption<T>) => onSelect(item)}
          onRemove={props.onOptionRemoved}
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
          selectedItems={props.selectedOptions}
          tagRenderer={(item: SelectOption<T>) => tagRenderer(item)}
        />
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
        label={props.itemLabel?.(item)}
        onClick={itemProps.handleClick}
        onFocus={itemProps.handleFocus}
        ref={itemProps.ref}
        roleStructure="listoption"
        selected={optionIsSelected(item)}
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

  function tagRenderer(item: SelectOption<T>): React.ReactNode {
    return (
      <div key={item.label} style={{ display: "flex" }}>
        {props.preTextElement?.(item)}
        {item.label}
      </div>
    );
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  function filterOptionList(query: string, items: Array<SelectOption<T>>): Array<SelectOption<T>> {
    const normalizedQuery = query.toLowerCase();
    return items
      .filter(item => item.label.toLowerCase().includes(normalizedQuery))
      .slice(0, 20);
  }
  // #endregion
}
