import { FormGroup, MenuItem } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import * as React from "react";
import { useServices } from "../../../../hooks/use-services";
import { SelectOption } from "../../../types";
import { HighlightText } from "../highlight-text/highlight-text";
import { BaseServerSelectProps } from "./base-server-select.props";

/**
 * A multi select component that retrieves items from the server
 */
export function BaseServerSelect<T>(props: BaseServerSelectProps<T>) {
  // #region State ------------------------------------------------------------
  const [items, setItems] = React.useState(new Array<SelectOption<T>>());
  const [queryString, setQueryString] = React.useState<string>("");
  // #endregion

  // #region Context ----------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      if (queryString != "") {
        const timeOutId = setTimeout(
          () => {
            void serviceContainer.collectionManagerProxy
              .getData<Array<T>>(`/${props.serverBaseUrl}?q=${queryString}`)
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
    const indexOfSelected = props.selectedItems.findIndex((f: SelectOption<T>) => f.label == item.label);
    if (indexOfSelected >= 0) {
      props.onItemRemoved(item);
    } else {
      props.onItemAdded(item);
    }
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="layout-isolation">
      <FormGroup
        key={props.keyString}
        label={props.label}
      >
        <MultiSelect<SelectOption<T>>
          initialContent={null}
          itemRenderer={(item: SelectOption<T>, itemProps: ItemRendererProps) => itemRenderer(item, itemProps)}
          items={items}
          key={props.keyString}
          noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
          onClear={props.onClearSelectedItems}
          onItemSelect={(item: SelectOption<T>) => onSelect(item)}
          onQueryChange={onQueryChange}
          onRemove={props.onItemRemoved}
          popoverProps={{ matchTargetWidth: true, minimal: true }}
          resetOnSelect={true}
          selectedItems={props.selectedItems}
          tagRenderer={tagRenderer}
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
        onClick={itemProps.handleClick}
        onFocus={itemProps.handleFocus}
        ref={itemProps.ref}
        roleStructure="listoption"
        selected={props.selectedItems.includes(item)}
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
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  function onQueryChange(query: string, _event?: React.ChangeEvent<HTMLInputElement>): void {
    setQueryString(query);
  }
  // #endregion
}
