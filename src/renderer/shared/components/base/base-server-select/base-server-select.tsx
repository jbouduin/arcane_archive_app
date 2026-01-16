import { FormGroup, MenuItem, Tag } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import { useCallback, useEffect, useState } from "react";
import { useServices } from "../../../../hooks/use-services";
import { SelectOption } from "../../../types";
import { HighlightText } from "../highlight-text/highlight-text";
import { BaseServerSelectProps } from "./base-server-select.props";

// TODO move this component to ../../input and make it work with BaseViewmodel
/**
 * A multi select component that retrieves items from the server
 */
export function BaseServerSelect<T>(props: BaseServerSelectProps<T>) {
  // #region Memo --------------------------------------------------------------
  const optionsIsSelected = useCallback(
    (item: SelectOption<T>) => props.selectedOptions.findIndex(
      (value: SelectOption<T>) => props.itemComparer ? props.itemComparer(item.value, value.value) : item.value == value.value
    ) >= 0,
    [props.selectedOptions]
  );
  // #endregion

  // #region State ------------------------------------------------------------
  const [items, setItems] = useState(new Array<SelectOption<T>>());
  const [queryString, setQueryString] = useState<string>("");
  // #endregion

  // #region Context ----------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      if (queryString != "") {
        const timeOutId = setTimeout(
          () => {
            void serviceContainer.arcaneArchiveProxy
              .getData<Array<T>>(props.server, `${props.serverBaseUrl}?q=${queryString}`)
              .then(
                (r: Array<T>) => {
                  const sorted = props.itemSort ? r.sort(props.itemSort) : r;
                  setItems(sorted.map((t: T) => ({ label: props.itemLabel(t), value: t })));
                },
                (_r: Error) => setItems(new Array<SelectOption<T>>())
              );
          },
          500
        );
        return () => clearTimeout(timeOutId);
      }
    },
    [queryString]
  );
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSelect(item: SelectOption<T>): void {
    if (optionsIsSelected(item)) {
      props.onOptionsRemoved(item);
    } else {
      props.onOptionAdded(item);
    }
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="layout-isolation">
      <FormGroup
        key={props.keyString}
        label={props.formGroupLabel}
      >
        {
          !props.disabled &&
          (
            <MultiSelect<SelectOption<T>>
              initialContent={null}
              itemRenderer={(item: SelectOption<T>, itemProps: ItemRendererProps) => itemRenderer(item, itemProps)}
              disabled={props.disabled}
              items={items}
              itemsEqual={
                (a: SelectOption<T>, b: SelectOption<T>) => {
                  return props.itemComparer ? props.itemComparer(a.value, b.value) : a.value == b.value;
                }
              }
              key={props.keyString}
              noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
              onClear={props.onClearSelectedOptions}
              onItemSelect={(item: SelectOption<T>) => onSelect(item)}
              onQueryChange={onQueryChange}
              onRemove={props.onOptionsRemoved}
              popoverProps={{ matchTargetWidth: true, minimal: true }}
              resetOnSelect={true}
              selectedItems={props.selectedOptions}
              tagRenderer={tagRenderer}
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
        onClick={itemProps.handleClick}
        onFocus={itemProps.handleFocus}
        ref={itemProps.ref}
        roleStructure="listoption"
        selected={optionsIsSelected(item)}
        shouldDismissPopover={false}
        text={(
          <div>
            <HighlightText fullText={item.label} toHighlight={itemProps.query} />
          </div>
        )}
      />
    );
  }

  function tagRenderer(item: SelectOption<T>): React.ReactNode {
    return (
      <div key={item.label}>
        {item.label}
      </div>
    );
  }

  function renderReadOnlyTags(): Array<JSX.Element> {
    return props.selectedOptions.map((value: SelectOption<T>, idx: number) => {
      return (<Tag key={"tag_" + idx.toString()}>{tagRenderer(value)}</Tag>);
    });
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  function onQueryChange(query: string, _event?: React.ChangeEvent<HTMLInputElement>): void {
    setQueryString(query);
  }
  // #endregion
}
