import { Boundary, BreadcrumbProps, Breadcrumbs, FormGroup, InputGroup, Text } from "@blueprintjs/core";
import { useEffect, useMemo, useState } from "react";
import { ValidationResult } from "../../../types";
import { LabelValuePanel } from "../../base/label-value-panel";
import { handleStringChange } from "../../util";
import { CollectionDialogBodyProps } from "./collection-dialog.props";

export function CollectionDialogBody(props: CollectionDialogBodyProps) {
  // #region State ------------------------------------------------------------
  const [validation, setValidation] = useState<ValidationResult>({ intent: "none" });
  const [touched, setTouched] = useState<boolean>(false);
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      if (!touched) {
        return;
      }
      const handler = setTimeout(
        () => {
          setValidation(props.viewmodel.validateCode());
        },
        100
      );

      return () => clearTimeout(handler);
    },
    [touched, props.viewmodel.code]
  );
  // #endregion

  // #region Memo -------------------------------------------------------------
  const breadcrumbProps = useMemo(
    () => {
      const result = props.viewmodel.parentPath.map((s: string) => {
        const b: BreadcrumbProps = {
          text: s,
          icon: "folder-close"
        };
        return b;
      });
      // add a dummy as current, so we can render an input
      result.push({ current: true, text: "" });
      return result;
    },
    [props.viewmodel.parentPathJoin]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  const items = new Map<string, JSX.Element | null>([
    ["Id", (<Text>{props.viewmodel.id}</Text>)],
    ["Empty", null],
    ["Created at", (<Text>{props.viewmodel.createdAtString}</Text>)],
    ["Created by", (<Text>{props.viewmodel.createdBy}</Text>)],
    ["Modified at", (<Text>{props.viewmodel.modifiedAtString}</Text>)],
    ["Modified by", (<Text>{props.viewmodel.modifiedBy}</Text>)]
  ]);

  return (
    <>
      <FormGroup
        label={props.viewmodel.isFolder ? "Folder Name" : "Collection Name"}
        key="bc-group"
        labelInfo="*"
        fill={true}
        helperText={validation.helperText}
        intent={validation.intent}
      >
        <Breadcrumbs
          key="bc-crumbs"
          items={breadcrumbProps}
          collapseFrom={Boundary.START}
          // BUG list does not collapse
          overflowListProps={{ alwaysRenderOverflow: false }}
          currentBreadcrumbRenderer={
            (_crumbProps: BreadcrumbProps) => {
              return (
                <InputGroup
                  key="bc-input"
                  fill={true}
                  value={props.viewmodel.code}
                  onChange={handleStringChange((newValue: string) => {
                    props.viewmodel.code = newValue;
                    props.viewmodelChanged(props.viewmodel);
                  })}
                  onBlur={() => {
                    setTouched(true);
                  }}
                />
              );
            }
          }
        />
      </FormGroup>
      <LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />
    </>
  );
  // #endregion
}
