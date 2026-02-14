import { ControlGroup, HTMLTable, Tab, Tabs } from "@blueprintjs/core";
import { useSession } from "../../../../hooks";
import { ApplicationRole } from "../../../types";
import { createAuditableLabelValueItems, LabelValueItem, LabelValuePanel } from "../../base/label-value-panel";
import { AaCheckbox, AaInput, AaMultiSelect } from "../../input";
import { ProfileDialogBodyProps } from "./profile-dialog.props";

export function ProfileDialogBody(props: ProfileDialogBodyProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { isSysAdmin } = useSession();
  //#endregion

  //#region Rendering ---------------------------------------------------------
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
        <AaInput
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
        <AaInput
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
          <AaInput
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName="firstname"
            label="First Name"
            validation="none"
            inputProps={{
              placeholder: "Enter your first name..."
            }}
          />
          <AaInput
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
        <AaMultiSelect
          key="roles"
          viewmodel={props.viewmodel.accountViewmodel}
          viewmodelChanged={props.viewmodelChanged}
          readonly={!isSysAdmin}
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
                    <AaCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="accountLocked"
                    >
                      Account Locked
                    </AaCheckbox>
                  </td>
                  <td>
                    <AaCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="accountActive"
                    >
                      Account Active
                    </AaCheckbox>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "0px" }}>
                    <AaCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="accountExpired"
                    >
                      Account Expired
                    </AaCheckbox>
                  </td>
                  <td>
                    <AaCheckbox
                      viewmodel={props.viewmodel.accountViewmodel}
                      viewmodelChanged={props.viewmodelChanged}
                      fieldName="passwordExpired"
                    >
                      Password Expired
                    </AaCheckbox>
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
  //#endregion
}
