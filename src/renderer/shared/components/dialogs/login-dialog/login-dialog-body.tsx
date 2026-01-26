import { SectionCard, Tag } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { BaseInput, PasswordInput } from "../../input";
import { LoginDialogBodyProps } from "./login-dialog.props";

export function LoginDialogBody(props: LoginDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSelectUser(userName: string): void {
    props.viewmodel.dto["user"] = userName;
    void serviceContainer.sessionService
      .getPassword(serviceContainer.ipcProxy, userName)
      .then(
        (pwd: string) => {
          props.viewmodel.dto["password"] = pwd;
          props.viewmodel.selectedExistingPassword = pwd;
        },
        noop
      )
      .finally(() => props.viewmodelChanged());
  }

  function onRemoveUser(username: string) {
    void serviceContainer.sessionService
      .deleteSavedUser(serviceContainer.ipcProxy, username)
      .then(
        async () => {
          props.viewmodel.savedUserNames.delete(username);
          if (props.viewmodel.savedUserNames.size == 1) {
            const onlyUser = Array.of(...props.viewmodel.savedUserNames)[0];
            const password = await serviceContainer.sessionService.getPassword(serviceContainer.ipcProxy, onlyUser);
            props.viewmodel.dto["user"] = onlyUser;
            props.viewmodel.dto["password"] = password;
            props.viewmodel.selectedExistingPassword = password;
          } else {
            props.viewmodel.dto["user"] = "";
            props.viewmodel.dto["password"] = "";
          }
        },
        noop)
      .finally(() => props.viewmodelChanged());
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <BaseInput
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        fieldName="user"
        validation="synchronous"
        label="Username or email"
        labelInfo="*"
        inputProps={{
          required: true,
          placeholder: "Enter your username or email address..."
        }}
      />
      <PasswordInput
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        fieldName="password"
        validation="synchronous"
        label="Password"
        labelInfo="*"
        inputProps={{
          required: true,
          placeholder: "Enter your password ..."
        }}
      />
      {
        props.viewmodel.savedUserNames.size > 1 && renderExistingUsers()
      }
    </SectionCard>
  );

  function renderExistingUsers(): JSX.Element {
    return (
      <div className="existing-users-wrap">
        <p>
          Enter your data or select one of the following known users:
        </p>
        <div className="existing-users-div">
          {
            Array.of(...props.viewmodel.savedUserNames).map((userName: string) => {
              return (
                <Tag
                  className="user-name-tag"
                  interactive={true}
                  key={userName}
                  onClick={() => onSelectUser(userName)}
                  onRemove={() => onRemoveUser(userName)}
                >
                  {userName}
                </Tag>
              );
            })
          }
        </div>
      </div>
    );
  }
  // #endregion
}
