import { FormGroup, MenuItem } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import classNames from "classnames";
import * as React from "react";
import { MtgSetDto } from "../../../dto";
import { HighlightText } from "../../base/highlight-text/highlight-text";
import { CardSetSelectProps } from "./card-set-select.props";

export function CardSetSelect(props: CardSetSelectProps) {
  // #region Event handling ----------------------------------------------------
  function onClear(): void {
    props.onClearOptions();
  }

  function onRemove(item: MtgSetDto): void {
    props.onOptionRemoved(item);
  }

  function onSelect(item: MtgSetDto): void {
    const indexOfSelected = props.selectedCardSets.findIndex((value: MtgSetDto) => value.id == item.id);
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
      key="card-sets"
      label="Card Sets"
      labelFor="card-sets-multi-select"
    >
      <MultiSelect<MtgSetDto>
        initialContent={null}
        itemPredicate={filterCardSet}
        itemRenderer={(item: MtgSetDto, itemProps: ItemRendererProps) => cardSetItemRenderer(item, itemProps)}
        items={props.allCardSets}
        itemsEqual="id"
        key="card-sets-multi-select"
        noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
        onClear={() => onClear()}
        onItemSelect={(item: MtgSetDto) => onSelect(item)}
        onRemove={(item: MtgSetDto) => onRemove(item)}
        popoverProps={{ matchTargetWidth: true, minimal: true }}
        resetOnSelect={true}
        selectedItems={props.selectedCardSets}
        tagRenderer={(item: MtgSetDto) => cardSetTagRenderer(item)}
      />
    </FormGroup>
  );

  function cardSetItemRenderer(item: MtgSetDto, itemProps: ItemRendererProps): React.JSX.Element | null {
    if (!itemProps.modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={itemProps.modifiers.active}
        disabled={itemProps.modifiers.disabled}
        key={item.id}
        label={item.code}
        onClick={itemProps.handleClick}
        onFocus={itemProps.handleFocus}
        ref={itemProps.ref}
        roleStructure="listoption"
        selected={props.selectedCardSets.includes(item)}
        shouldDismissPopover={false}
        text={(
          <div>
            <i
              key={`icon-${item.keyruneCode}`}
              className={classNames("tree-view-image", "ss", "ss-" + item.keyruneCode.toLowerCase())}
            >
            </i>
            <HighlightText fullText={item.name["ENGLISH"]} toHighlight={itemProps.query} />
          </div>
        )}
      />
    );
  }

  function cardSetTagRenderer(item: MtgSetDto): React.ReactNode {
    return (
      <div key={item.id}>
        <i
          key={`icon-${item.keyruneCode}`}
          className={classNames("tree-view-image", "ss", "ss-" + item.keyruneCode.toLowerCase())}
        >
        </i>
        {item.name["ENGLISH"]}
      </div>
    );
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  function filterCardSet(query: string, item: MtgSetDto, _index?: number, exactMatch?: boolean): boolean {
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
