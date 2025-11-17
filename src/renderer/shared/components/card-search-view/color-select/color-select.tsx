import { FormGroup, MenuItem } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import * as React from "react";
import { ColorDto } from "../../../dto";
import { HighlightText } from "../../base/highlight-text/highlight-text";
import { CardSymbolRenderer } from "../../card-symbol-renderer";
import { ColorSelectProps } from "./color-select.props";

export function ColorSelect(props: ColorSelectProps) {
  // #region Event handling ---------------------------------------------------
  function onClear(): void {
    props.onClearOptions();
  }

  function onRemove(item: ColorDto): void {
    props.onOptionRemoved(item);
  }

  function onSelect(item: ColorDto): void {
    const indexOfSelected = props.selectedColors.findIndex((value: ColorDto) => value.id == item.id);
    if (indexOfSelected >= 0) {
      props.onOptionRemoved(item);
    } else {
      props.onOptionAdded(item);
    }
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <FormGroup
      key={props.colorType}
      label={props.label}
      labelFor="card-sets-multi-select"
    >
      <MultiSelect<ColorDto>
        initialContent={null}
        itemPredicate={filterColor}
        itemRenderer={(item: ColorDto, itemProps: ItemRendererProps) => colorItemRenderer(item, itemProps)}
        items={props.allColors}
        // itemsEqual="id"
        key="card-sets-multi-select"
        noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
        onClear={() => onClear()}
        onItemSelect={(item: ColorDto) => onSelect(item)}
        onRemove={(item: ColorDto) => onRemove(item)}
        popoverProps={{ matchTargetWidth: true, minimal: true }}
        resetOnSelect={true}
        selectedItems={props.selectedColors}
        tagRenderer={(item: ColorDto) => colorTagRenderer(item)}
      />
    </FormGroup>
  );

  function colorItemRenderer(item: ColorDto, itemProps: ItemRendererProps): React.JSX.Element | null {
    if (!itemProps.modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={itemProps.modifiers.active}
        disabled={itemProps.modifiers.disabled}
        key={item.id}
        onClick={itemProps.handleClick}
        onFocus={itemProps.handleFocus}
        ref={itemProps.ref}
        roleStructure="listoption"
        selected={props.selectedColors.includes(item)}
        shouldDismissPopover={false}
        text={
          (
            <div style={{ display: "flex" }}>
              <CardSymbolRenderer cardSymbols={[item.manaSymbol]} className="mana-cost-image-in-text" />
              <HighlightText fullText={item.name["ENGLISH"]} toHighlight={itemProps.query} />
            </div>
          )
        }
      />
    );
  }

  function colorTagRenderer(item: ColorDto): React.ReactNode {
    return (
      <div key={item.id}>
        <CardSymbolRenderer cardSymbols={[item.manaSymbol]} />
      </div>
    );
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  function filterColor(query: string, item: ColorDto, index?: number, exactMatch?: boolean): boolean {
    const normalizedTitle = item.name["ENGLISH"].toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return normalizedTitle.indexOf(normalizedQuery) >= 0;
    }
  }
  // #endregion
}
