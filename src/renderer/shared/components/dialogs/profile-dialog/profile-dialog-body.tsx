import { Checkbox, ControlGroup, FormGroup, HTMLTable, InputGroup, Tab, Tabs, Text } from "@blueprintjs/core";
import { useMemo } from "react";
import { useServices } from "../../../../hooks";
import { ApplicationRole, ROLES_SELECT_OPTIONS, SelectOption } from "../../../types";
import { BaseMultiSelect } from "../../base/base-multi-select/base-multi-select";
import { LabelValuePanel } from "../../label-value-panel/label-value-panel";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { ProfileDialogBodyProps } from "./profile-dialog.props";

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
          onClearSelectedOptions={
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
          selectedOptions={props.viewmodel.selectedRoles}
        />
      </>
    );
  }

  function renderAdditionalInfoPanel(): React.JSX.Element {
    const items = new Map<string, JSX.Element | null>([
      ["Id", (<Text>{props.viewmodel.id}</Text>)],
      ["empty", null],
      ["Created at", (<Text>{props.viewmodel.createdAt.toLocaleString()}</Text>)],
      ["Created by", (<Text>{props.viewmodel.createdBy}</Text>)],
      ["Modified at", (<Text>{props.viewmodel.modifiedAt.toLocaleString()}</Text>)],
      ["Modified by", (<Text>{props.viewmodel.modifiedBy}</Text>)]
    ]);
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
        <LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />
      </>
    );
  }
  // #endregion
}
