import { Checkbox, ControlGroup, FormGroup, HTMLTable, InputGroup, Tab, Tabs } from "@blueprintjs/core";
import { useMemo } from "react";
import { useServices } from "../../../../hooks";
import { UserDto } from "../../../dto";
import { ApplicationRole, ROLES_SELECT_OPTIONS, SelectOption } from "../../../types";
import { UserViewmodel } from "../../../viewmodel";
import { AuditFields } from "../../base/audit-fields/audit-fields";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { BaseSelect } from "../../base/base-select/base-select";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";

export function ProfileDialogBody(props: BaseDialogBodyProps<UserDto>) {
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
          validate={() => (props.viewmodel as UserViewmodel).validateAccountName()}
          inputProps={{
            readOnly: true,
            required: true,
            value: (props.viewmodel as UserViewmodel).accountName,
            onChange: handleStringChange((newValue: string) => {
              (props.viewmodel as UserViewmodel).accountName = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            placeholder: "Enter a username..."
          }}
        />
        <ValidatedInput
          keyPrefix="email"
          label="Email"
          labelInfo="*"
          validate={() => (props.viewmodel as UserViewmodel).validateEmail()}
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Enter your email address...",
            onChange:
              handleStringChange((newValue: string) => {
                (props.viewmodel as UserViewmodel).email = newValue;
                props.viewmodelChanged(props.viewmodel);
              }),
            type: "email",
            value: (props.viewmodel as UserViewmodel).email
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
                  (props.viewmodel as UserViewmodel).firstName = newValue;
                  props.viewmodelChanged(props.viewmodel);
                })
              }
              size="small"
              type="text"
              value={(props.viewmodel as UserViewmodel).firstName}
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
                  (props.viewmodel as UserViewmodel).lastName = newValue;
                  props.viewmodelChanged(props.viewmodel);
                })
              }
              size="small"
              type="text"
              value={(props.viewmodel as UserViewmodel).lastName}
            />
          </FormGroup>
        </ControlGroup>
        <BaseSelect<ApplicationRole>
          key="roles"
          disabled={!isSysAdmin}
          allItems={ROLES_SELECT_OPTIONS}
          formGroupLabel="Roles"
          onClearOptions={
            () => {
              (props.viewmodel as UserViewmodel).clearSelectedRoles();
              props.viewmodelChanged(props.viewmodel);
            }
          }
          onOptionAdded={
            (role: SelectOption<ApplicationRole>) => {
              (props.viewmodel as UserViewmodel).addRole(role);
              props.viewmodelChanged(props.viewmodel);
            }
          }
          onOptionRemoved={
            (role: SelectOption<ApplicationRole>) => {
              (props.viewmodel as UserViewmodel).removeRole(role);
              props.viewmodelChanged(props.viewmodel);
            }
          }
          selectedItems={(props.viewmodel as UserViewmodel).selectedRoles}
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
                  checked={(props.viewmodel as UserViewmodel).accountLocked}
                  readOnly={!isSysAdmin}
                >
                  Account Locked
                </Checkbox>
              </td>
              <td>
                <Checkbox
                  checked={(props.viewmodel as UserViewmodel).accountActive}
                  readOnly={!isSysAdmin}
                >
                  Account Active
                </Checkbox>
              </td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "0px" }}>
                <Checkbox
                  checked={(props.viewmodel as UserViewmodel).accountExpired}
                  readOnly={!isSysAdmin}
                >
                  Account Expired
                </Checkbox>
              </td>
              <td>
                <Checkbox
                  checked={(props.viewmodel as UserViewmodel).passwordExpired}
                  readOnly={!isSysAdmin}
                >
                  Password Expired
                </Checkbox>
              </td>
            </tr>
          </tbody>
        </HTMLTable>
        <AuditFields auditFields={(props.viewmodel as UserViewmodel)} />
      </>
    );
  }
  // #endregion
}
