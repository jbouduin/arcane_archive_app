import { ControlGroup, FormGroup, InputGroup } from "@blueprintjs/core";
import { AuditFieldsProps } from "./audit-fields.props";

export function AuditFields(props: AuditFieldsProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        props.auditFields.id > 0 && (
          <FormGroup
            id="id-group"
            label="Id"
            labelFor="id-value"
          >
            <InputGroup
              id="id-value"
              inputMode="numeric"
              readOnly={true}
              size="small"
              value={props.auditFields.id.toString()}
            />
          </FormGroup>
        )
      }
      {/* TODO padding between the two formgroups (to be implemented in all dialogs) */}
      <ControlGroup
        key="created-control-group"
        fill={true}
        vertical={false}
      >
        <FormGroup
          id="created-at-group"
          label="Created at"
          labelFor="created-at"
        >
          <InputGroup
            id="created-at"
            inputMode="text"
            readOnly={true}
            size="small"
            type="text"
            value={props.auditFields.createdAt.toLocaleString()}
          />
        </FormGroup>
        <FormGroup
          id="created-by-group"
          label="By"
          labelFor="created-by"
        >
          <InputGroup
            id="created-by"
            inputMode="text"
            readOnly={true}
            size="small"
            type="text"
            value={props.auditFields.createdBy}
          />
        </FormGroup>
      </ControlGroup>
      <ControlGroup
        key="modified-control-group"
        fill={true}
        vertical={false}
      >
        <FormGroup
          id="modified-at-group"
          label="Modified at"
          labelFor="modified-at"
        >
          <InputGroup
            id="modified-at"
            inputMode="text"
            readOnly={true}
            size="small"
            type="text"
            value={props.auditFields.modifiedAt.toLocaleString()}
          />
        </FormGroup>
        <FormGroup
          id="modified-by-group"
          label="By"
          labelFor="modified-by"
        >
          <InputGroup
            id="modified-by"
            inputMode="text"
            readOnly={true}
            size="small"
            type="text"
            value={props.auditFields.modifiedBy}
          />
        </FormGroup>
      </ControlGroup>
    </>
  );
  // #endregion
}
