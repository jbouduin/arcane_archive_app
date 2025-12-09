import { FormGroup, MenuItem } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import * as React from "react";
import { SelectOption } from "../../../types";
import { HighlightText } from "../highlight-text/highlight-text";
import { BaseSelectProps } from "./base-select.props";

/**
 * A multi select component that uses a static (cached) list of items
 */
export function BaseSelect<T>(props: BaseSelectProps<T>) {
  // #region Event handling ----------------------------------------------------
  function onSelect(item: SelectOption<T>): void {
    const indexOfSelected = props.selectedItems.findIndex((value: SelectOption<T>) => value.value == item.value);
    if (indexOfSelected >= 0) {
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
        disabled={props.disabled}
      >
        <MultiSelect<SelectOption<T>>
          initialContent={null}
          disabled={props.disabled}
          itemListPredicate={filterOptionList}
          itemRenderer={(item: SelectOption<T>, itemProps: ItemRendererProps) => itemRenderer(item, itemProps)}
          items={props.allItems}
          key={props.formGroupLabel}
          noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
          onClear={props.onClearOptions}
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
          selectedItems={props.selectedItems}
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
        selected={props.selectedItems.includes(item)}
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
