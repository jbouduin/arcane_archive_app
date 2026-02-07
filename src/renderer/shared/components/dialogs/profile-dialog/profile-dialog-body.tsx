import { ControlGroup, HTMLTable, Tab, Tabs } from "@blueprintjs/core";
import { useSession } from "../../../../hooks";
import { ApplicationRole } from "../../../types";
import { createAuditableLabelValueItems, LabelValueItem, LabelValuePanel } from "../../base/label-value-panel";
import { BaseCheckbox, BaseInput, BaseMultiSelect } from "../../input";
import { ProfileDialogBodyProps } from "./profile-dialog.props";

export function ProfileDialogBody(props: ProfileDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const { isSysAdmin } = useSession();
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
        <BaseInput
          viewmodel={props.viewmodel.accountViewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="accountName"
          label="Username"
          labelInfo="*"
          validation="synchronous"
          inputProps={{
            readOnly: true,
            required: true,
            placeholder: "Enter a username..."
          }}
        />
        <BaseInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="email"
          label="Email"
          labelInfo="*"
          validation="synchronous"
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Enter your email address...",
            type: "email",
          }}
        />
        <ControlGroup
          key="name-group"
          fill={true}
          vertical={false}
        >
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="firstname"
            label="First Name"
            validation="none"
            inputProps={{
              placeholder: "Enter your first name..."
            }}
          />
          <BaseInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="lastName"
            label="Last Name"
            validation="none"
            inputProps={{
              placeholder: "Enter your last name..."

            }}
          />
        </ControlGroup>
        <BaseMultiSelect
          key="roles"
          viewmodel={props.viewmodel.accountViewmodel}
          viewmodelChanged={props.viewmodelChanged}
          disabled={!isSysAdmin}
          allItems={props.viewmodel.accountViewmodel.allRoles}
          fieldName="roles"
          label="Roles"
          labelInfo="*"
          validation="synchronous"
          idExtractor={(role: ApplicationRole) => role}
        />
      </>
    );
  }

  function renderAdditionalInfoPanel(): React.JSX.Element {
    const accountItems = new Map<string, JSX.Element | null>();
    if (!isSysAdmin) {
      accountItems.set("Account Locked", (<LabelValueItem viewmodel={props.viewmodel.accountViewmodel} fieldName="accountLocked" fieldType="boolean" />));
      accountItems.set("Account active", (<LabelValueItem viewmodel={props.viewmodel.accountViewmodel} fieldName="accountActive" fieldType="boolean" />));
      accountItems.set("Account expired", (<LabelValueItem viewmodel={props.viewmodel.accountViewmodel} fieldName="accountExpired" fieldType="boolean" />));
      accountItems.set("Password Expired", (<LabelValueItem viewmodel={props.viewmodel.accountViewmodel} fieldName="passwordExpired" fieldType="boolean" />));
    }

    const items = new Map<string, JSX.Element | null>([
      ...accountItems.entries(),
      ...createAuditableLabelValueItems({
        id: props.viewmodel.accountViewmodel.dto.id,
        ...props.viewmodel.dto
      })
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
                    <BaseCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="accountLocked"
                    >
                      Account Locked
                    </BaseCheckbox>
                  </td>
                  <td>
                    <BaseCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="accountActive"
                    >
                      Account Active
                    </BaseCheckbox>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "0px" }}>
                    <BaseCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="accountExpired"
                    >
                      Account Expired
                    </BaseCheckbox>
                  </td>
                  <td>
                    <BaseCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="passwordExpired"
                    >
                      Password Expired
                    </BaseCheckbox>
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
