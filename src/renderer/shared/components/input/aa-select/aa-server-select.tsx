import { FormGroup, MenuItem } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect } from "@blueprintjs/select";
import { useEffect, useState } from "react";
import { useServices } from "../../../../hooks";
import { SelectOption } from "../../../types";
import { AaServerSelectProps } from "./aa-server-select.props";
import {
  getPopoverProps, itemRenderer, onClear, onItemSelect, onRemove, optionIsSelected, renderReadOnlyTags, tagRenderer
} from "./shared-select";

export function AaServerSelect<T, U, Dto extends object>(props: AaServerSelectProps<T, U, Dto>): JSX.Element {
  //#region Initialization -------------------------------------------------------
  const keyName = props.fieldName.toString();
  const dtoValue = props.viewmodel.dto[props.fieldName] as unknown as Array<U>;
  /**
   * Currently only catalog items are required, no real master data.
   * If more than just string values needs to be supported, next line is wrong
   */
  const selectedOptions: Array<SelectOption<T>> =
    dtoValue.map((v: U) => ({ value: v as unknown as T, label: v as unknown as string }));
  const validationResult = props.viewmodel.getValidation(props.fieldName);
  //#endregion

  //#region Hooks -------------------------------------------------------------
  const { arcaneArchiveProxy } = useServices();
  //#endregion

  //#region State -------------------------------------------------------------
  const [items, setItems] = useState(new Array<SelectOption<T>>());
  const [queryString, setQueryString] = useState<string>("");
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      if (queryString != "") {
        const timeOutId = setTimeout(
          () => {
            void arcaneArchiveProxy
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
              items={items}
              key={keyName + "-select"}
              noResults={<MenuItem disabled={true} roleStructure="listoption" text="No results." />}
              popoverProps={getPopoverProps()}
              resetOnSelect={true}
              selectedItems={selectedOptions}
              itemsEqual={
                (a: SelectOption<T>, b: SelectOption<T>) => props.idExtractor(a.value) === props.idExtractor(b.value)
              }
              itemRenderer={(item: SelectOption<T>, itemProps: ItemRendererProps) =>
                itemRenderer(
                  item, itemProps, optionIsSelected(item, selectedOptions, props.idExtractor), props.preTextElement
                )}
              onClear={() => onClear(props)}
              onItemSelect={(item: SelectOption<T>) => onItemSelect(item, selectedOptions, dtoValue, props)}
              onQueryChange={onQueryChange}
              onRemove={(removed: SelectOption<T>) => onRemove(removed, dtoValue, props)}
              tagRenderer={(item: SelectOption<T>) => tagRenderer(item, props.preTextElement)}
            >
            </MultiSelect>
          )
        }
        {
          props.readonly &&
          (
            <div className="disabled-tag-div">
              {renderReadOnlyTags(selectedOptions)}
            </div>
          )
        }
      </FormGroup>
    </div>
  );
  //#endregion

  // #region Auxiliary methods ------------------------------------------------
  function onQueryChange(query: string, _event?: React.ChangeEvent<HTMLInputElement>): void {
    setQueryString(query);
  }
  // #endregion
}
