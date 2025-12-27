import { SectionCard, Tag } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { PasswordInput } from "../../password-input/password-input";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { LoginDialogBodyProps } from "./login-dialog.props";

export function LoginDialogBody(props: LoginDialogBodyProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSelectUser(userName: string): void {
    props.viewmodel.user = userName;
    void serviceContainer.sessionService
      .getPassword(serviceContainer, userName)
      .then(
        (pwd: string) => {
          props.viewmodel.password = pwd;
          props.viewmodel.selectedExistingPassword = pwd;
        },
        noop
      )
      .finally(() => props.viewmodelChanged(props.viewmodel));
  }

  function onRemoveUser(username: string) {
    void serviceContainer.sessionService
      .deleteSavedUser(serviceContainer, username)
      .then(
        async () => {
          props.viewmodel.savedUserNames.delete(username);
          if (props.viewmodel.savedUserNames.size == 1) {
            const onlyUser = Array.of(...props.viewmodel.savedUserNames)[0];
            const password = await serviceContainer.sessionService.getPassword(serviceContainer, onlyUser);
            props.viewmodel.user = onlyUser;
            props.viewmodel.password = password;
            props.viewmodel.selectedExistingPassword = password;
          } else {
            props.viewmodel.user = "";
            props.viewmodel.password = "";
          }
        },
        noop)
      .finally(() => props.viewmodelChanged(props.viewmodel));
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <ValidatedInput
        keyPrefix="user"
        label="Username or email"
        labelInfo="*"
        validate={() => props.viewmodel.validateUser()}
        inputProps={{
          required: true,
          inputMode: "text",
          placeholder: "Enter your username or email address...",
          onChange:
            handleStringChange((newValue: string) => {
              props.viewmodel.user = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
          value: props.viewmodel.user
        }}
      />
      <PasswordInput
        keyPrefix="password"
        label="Password"
        labelInfo="*"
        validate={() => props.viewmodel.validatePassword()}
        inputProps={{
          required: true,
          value: props.viewmodel.password,
          onChange: handleStringChange((newValue: string) => {
            props.viewmodel.password = newValue;
            props.viewmodelChanged(props.viewmodel);
          })
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
