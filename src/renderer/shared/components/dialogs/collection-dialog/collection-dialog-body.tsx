import { Boundary, BreadcrumbProps, Breadcrumbs, FormGroup, InputGroup, Label, TextArea } from "@blueprintjs/core";
import { useMemo } from "react";
import { createAuditableLabelValueItems, LabelValuePanel } from "../../base/label-value-panel";
import { handleStringChange } from "../../util";
import { CollectionDialogBodyProps } from "./collection-dialog.props";

export function CollectionDialogBody(props: CollectionDialogBodyProps) {
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
  const items = createAuditableLabelValueItems(props.viewmodel.dto);
  return (
    <>
      <FormGroup
        label={props.viewmodel.type == "FOLDER" ? "Folder Name" : "Collection Name"}
        key="bc-group"
        labelInfo="*"
        fill={true}
        helperText={props.viewmodel.getValidation("code").helperText}
        intent={props.viewmodel.getValidation("code").intent}
      >
        <Breadcrumbs
          key="bc-crumbs"
          items={breadcrumbProps}
          collapseFrom={Boundary.START}
          // BUG list does not collapse. If it does not work at all, consider displaying path and name as two components.
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
                    props.viewmodel.validate("code");
                    props.viewmodelChanged();
                  })}
                  onBlur={() => {
                    props.viewmodel.markTouched("code");
                    props.viewmodelChanged();
                  }}
                />
              );
            }
          }
        />
      </FormGroup>
      <Label>
        Description
        <TextArea
          fill={true}
          maxLength={2048}
          onChange={handleStringChange((value: string) => {
            props.viewmodel.description = value;
            props.viewmodelChanged();
          })}
          placeholder="Enter description"
          value={props.viewmodel.description}
        />
      </Label>
      <LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />
    </>
  );
  // #endregion
}
