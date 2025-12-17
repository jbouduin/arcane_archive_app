import { Checkbox, ControlGroup, FormGroup, HTMLTable, InputGroup, Tab, Tabs } from "@blueprintjs/core";
import { useMemo } from "react";
import { useServices } from "../../../../hooks";
import { ApplicationRole, ROLES_SELECT_OPTIONS, SelectOption } from "../../../types";
import { AuditFields } from "../../base/audit-fields/audit-fields";
import { BaseMultiSelect } from "../../base/base-multi-select/base-multi-select";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { ProfileDialogBodyProps } from "./profile-dialog-props";

export function ProfileDialogBody(props: ProfileDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Memo -------------------------------------------------------------
  const isSysAdmin = useMemo(
    () => serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN"),
    [serviceContainer.sessionService]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Tabs animate={true} defaultSelectedTabId="basic" renderActiveTabPanelOnly={true}>
      <Tab
        id="basic"
        key="basic"
        title="User Details"
        panel={renderUserDetailsPanel()}
      />
      <Tab
        id="additional"
        key="additional"
        title="Additional Info"
        panel={renderAdditionalInfoPanel()}
      />
    </Tabs>
  );

  function renderUserDetailsPanel(): React.JSX.Element {
    return (
      <>
        <ValidatedInput
          keyPrefix="user-name"
          label="Username"
          labelInfo="*"
          validate={() => props.viewmodel.validateAccountName()}
          inputProps={{
            readOnly: true,
            required: true,
            value: props.viewmodel.accountName,
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.accountName = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            placeholder: "Enter a username..."
          }}
        />
        <ValidatedInput
          keyPrefix="email"
          label="Email"
          labelInfo="*"
          validate={() => props.viewmodel.validateEmail()}
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Enter your email address...",
            onChange:
              handleStringChange((newValue: string) => {
                props.viewmodel.email = newValue;
                props.viewmodelChanged(props.viewmodel);
              }),
            type: "email",
            value: props.viewmodel.email
          }}
        />
        <ControlGroup
          key="name-group"
          fill={true}
          vertical={false}
        >
          <FormGroup
            key="fn-group"
            label="First Name"
            labelFor="first-name"
          >
            <InputGroup
              id="first-name"
              inputMode="text"
              placeholder="Enter your first name..."
              onChange={
                handleStringChange((newValue: string) => {
                  props.viewmodel.firstName = newValue;
                  props.viewmodelChanged(props.viewmodel);
                })
              }
              size="small"
              type="text"
              value={props.viewmodel.firstName}
            />
          </FormGroup>
          <FormGroup
            key="ln-group"
            label="Last Name"
            labelFor="last-name"
          >
            <InputGroup
              id="last-name"
              inputMode="text"
              placeholder="Enter your last name..."
              onChange={
                handleStringChange((newValue: string) => {
                  props.viewmodel.lastName = newValue;
                  props.viewmodelChanged(props.viewmodel);
                })
              }
              size="small"
              type="text"
              value={props.viewmodel.lastName}
            />
          </FormGroup>
        </ControlGroup>
        <BaseMultiSelect<ApplicationRole>
          key="roles"
          disabled={!isSysAdmin}
          allItems={ROLES_SELECT_OPTIONS}
          formGroupLabel="Roles"
          onClearOptions={
            () => {
              props.viewmodel.clearSelectedRoles();
              props.viewmodelChanged(props.viewmodel);
            }
          }
          onOptionAdded={
            (role: SelectOption<ApplicationRole>) => {
              props.viewmodel.addRole(role);
              props.viewmodelChanged(props.viewmodel);
            }
          }
          onOptionRemoved={
            (role: SelectOption<ApplicationRole>) => {
              props.viewmodel.removeRole(role);
              props.viewmodelChanged(props.viewmodel);
            }
          }
          selectedItems={props.viewmodel.selectedRoles}
        />
      </>
    );
  }

  function renderAdditionalInfoPanel(): React.JSX.Element {
    return (
      <>
        <HTMLTable
          bordered={false}
          compact={true}
          width="100%"
        >
          <tbody>
            <tr>
              <td style={{ paddingLeft: "0px" }}>
                <Checkbox
                  checked={props.viewmodel.accountLocked}
                  readOnly={!isSysAdmin}
                >
                  Account Locked
                </Checkbox>
              </td>
              <td>
                <Checkbox
                  checked={props.viewmodel.accountActive}
                  readOnly={!isSysAdmin}
                >
                  Account Active
                </Checkbox>
              </td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "0px" }}>
                <Checkbox
                  checked={props.viewmodel.accountExpired}
                  readOnly={!isSysAdmin}
                >
                  Account Expired
                </Checkbox>
              </td>
              <td>
                <Checkbox
                  checked={props.viewmodel.passwordExpired}
                  readOnly={!isSysAdmin}
                >
                  Password Expired
                </Checkbox>
              </td>
            </tr>
          </tbody>
        </HTMLTable>
        <AuditFields auditFields={props.viewmodel} />
      </>
    );
  }
  // #endregion
}
