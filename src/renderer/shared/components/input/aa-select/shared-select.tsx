import { MenuItem, PopoverProps, Tag } from "@blueprintjs/core";
import { ItemRendererProps } from "@blueprintjs/select";
import { ReactNode } from "react";
import { SelectOption } from "../../../types";
import { HighlightText } from "../../base/highlight-text/highlight-text";
import { AaClientSelectProps } from "./aa-client-select.props";

//#region Rendering -----------------------------------------------------------
export function getPopoverProps(): Partial<Omit<PopoverProps, "content" | "defaultIsOpen" | "fill" | "renderTarget">> {
  return {
    matchTargetWidth: true,
    minimal: true,
    modifiers: {
      eventListeners: {
        enabled: false
      }
    }
  };
}

export function itemRenderer<T>(
  item: SelectOption<T>,
  itemProps: ItemRendererProps,
  selected: boolean,
  preTextElement?: (option: SelectOption<T>) => React.ReactNode,
): React.JSX.Element | null {
  if (!itemProps.modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={itemProps.modifiers.active}
      disabled={itemProps.modifiers.disabled}
      key={item.label}
      onClick={itemProps.handleClick}
      onFocus={itemProps.handleFocus}
      ref={itemProps.ref}
      roleStructure="listoption"
      selected={selected}
      shouldDismissPopover={false}
      text={(
        <div style={{ display: "flex" }}>
          {preTextElement?.(item)}
          <HighlightText fullText={item.label} toHighlight={itemProps.query} />
        </div>
      )}
    />
  );
}

export function tagRenderer<T>(
  item: SelectOption<T>, preTextElement?: (option: SelectOption<T>
  ) => React.ReactNode): ReactNode {
  return (
    <div key={item.label} style={{ display: "flex" }}>
      {preTextElement?.(item)}
      {item.label}
    </div>
  );
}

export function renderReadOnlyTags<T>(selectedOptions: Array<SelectOption<T>>): Array<JSX.Element> {
  return selectedOptions.map((value: SelectOption<T>, idx: number) => {
    return (<Tag key={"tag_" + idx.toString()}>{tagRenderer(value)}</Tag>);
  });
}
//#endregion

//#region Event Handling ----------------------------------------------------..
export function onClear<T, U, Dto extends object>(props: AaClientSelectProps<T, U, Dto>): void {
  (props.viewmodel.dto[props.fieldName] as unknown as Array<U>).splice(0);
  props.viewmodel.markTouched(props.fieldName);
  if (props.validation === "synchronous") {
    props.viewmodel.validate(props.fieldName);
  }
  props.viewmodelChanged();
}

export function onItemSelect<T, U, Dto extends object>(
  item: SelectOption<T>,
  selectedOptions: Array<SelectOption<T>>,
  dtoValue: Array<U>,
  props: AaClientSelectProps<T, U, Dto>): void {
  const id = props.idExtractor(item.value);
  if (optionIsSelected(item, selectedOptions, props.idExtractor)) {
    (props.viewmodel.dto[props.fieldName] as unknown as Array<U>) = dtoValue.filter((val: U) => val != id);
  } else {
    (props.viewmodel.dto[props.fieldName] as unknown as Array<U>).push(id);
  }
  props.viewmodel.markTouched(props.fieldName);
  if (props.validation === "synchronous") {
    props.viewmodel.validate(props.fieldName);
  }
  props.viewmodelChanged();
}

export function onRemove<T, U, Dto extends object>(
  removed: SelectOption<T>,
  dtoValue: Array<U>,
  props: AaClientSelectProps<T, U, Dto>): void {
  const id = props.idExtractor(removed.value);
  (props.viewmodel.dto[props.fieldName] as unknown as Array<U>) = dtoValue.filter((val: U) => val != id);
  props.viewmodel.markTouched(props.fieldName);
  if (props.validation === "synchronous") {
    props.viewmodel.validate(props.fieldName);
  }
  props.viewmodelChanged();
}
//#endregion

//#region Auxiliary Methods ---------------------------------------------------
export function optionIsSelected<T, U>(
  item: SelectOption<T>,
  selectedOptions: Array<SelectOption<T>>,
  idExtractor: (value: T) => U
): boolean {
  return selectedOptions.findIndex(
    (value: SelectOption<T>) => idExtractor(item.value) === idExtractor(value.value)) >= 0;
}
//#endregion
