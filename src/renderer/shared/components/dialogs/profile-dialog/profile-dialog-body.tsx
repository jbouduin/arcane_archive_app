import { Checkbox, ControlGroup, FormGroup, HTMLTable, InputGroup, Tab, Tabs } from "@blueprintjs/core";
import { useMemo } from "react";
import { useServices } from "../../../../hooks";
import { ApplicationRole, ROLES_SELECT_OPTIONS, SelectOption } from "../../../types";
import { BaseMultiSelect } from "../../base/base-multi-select/base-multi-select";
import { createAuditableLabelValueItems, LabelValuePanel, renderBoolean } from "../../base/label-value-panel";
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
          validationResult={props.viewmodel.getValidation("accountName")}
          validate={() => props.viewmodel.validateAccountName()}
          startValidation={() => props.viewmodel.startValidation()}
          endValidation={() => props.viewmodel.endValidation()}
          onValidationComplete={() => props.onValidationCompleted()}
          inputProps={{
            readOnly: true,
            required: true,
            value: props.viewmodel.accountName,
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.accountName = newValue;
              props.viewmodelChanged();
            }),
            placeholder: "Enter a username..."
          }}
        />
        <ValidatedInput
          keyPrefix="email"
          label="Email"
          labelInfo="*"
          touched={true}
          validationResult={props.viewmodel.getValidation("email")}
          validate={() => props.viewmodel.validateEmail()}
          startValidation={() => props.viewmodel.startValidation()}
          endValidation={() => props.viewmodel.endValidation()}
          onValidationComplete={() => props.onValidationCompleted()}
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Enter your email address...",
            onChange:
              handleStringChange((newValue: string) => {
                props.viewmodel.email = newValue;
                props.viewmodelChanged();
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
                  props.viewmodelChanged();
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
                  props.viewmodelChanged();
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
              props.viewmodelChanged();
            }
          }
          onOptionAdded={
            (role: SelectOption<ApplicationRole>) => {
              props.viewmodel.addRole(role);
              props.viewmodelChanged();
            }
          }
          onOptionRemoved={
            (role: SelectOption<ApplicationRole>) => {
              props.viewmodel.removeRole(role);
              props.viewmodelChanged();
            }
          }
          selectedOptions={props.viewmodel.selectedRoles}
        />
      </>
    );
  }

  function renderAdditionalInfoPanel(): React.JSX.Element {
    const accountItems = new Map<string, JSX.Element | null>();
    if (!isSysAdmin) {
      accountItems.set("Account Locked", renderBoolean(props.viewmodel.accountLocked));
      accountItems.set("Account active", renderBoolean(props.viewmodel.accountActive));
      accountItems.set("Account expired", renderBoolean(props.viewmodel.accountExpired));
      accountItems.set("Password Expired", renderBoolean(props.viewmodel.passwordExpired));
    }

    const items = new Map<string, JSX.Element | null>([
      ...accountItems.entries(),
      ...createAuditableLabelValueItems(props.viewmodel)
    ]);

    return (
      <>
        {
          isSysAdmin &&
          (
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
          )
        }
        <LabelValuePanel items={items} columns={2} style={{ padding: "0px" }} />
      </>
    );
  }
  // #endregion
}
