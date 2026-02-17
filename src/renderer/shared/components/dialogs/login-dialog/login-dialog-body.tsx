import "./login-dialog.css";

import { SectionCard, Tag } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { AaInput, AaPasswordInput } from "../../input";
import { LoginDialogBodyProps } from "./login-dialog.props";

export function LoginDialogBody(props: LoginDialogBodyProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { sessionService, ipcProxy, overlayService } = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSelectCredential(userName: string): void {
    props.viewmodel.dto["user"] = userName;
    void sessionService
      .getPassword(ipcProxy, userName)
      .then(
        (pwd: string) => {
          props.viewmodel.dto["password"] = pwd;
          props.viewmodel.selectedExistingPassword = pwd;
        },
        noop
      )
      .finally(() => props.viewmodelChanged());
  }

  function onRemoveCredential(username: string): void {
    overlayService.showAlert({
      isOpen: true,
      canEscapeKeyCancel: true,
      canOutsideClickCancel: true,
      confirmButtonText: "Delete",
      intent: "danger",
      cancelButtonText: "Cancel",
      icon: "trash",
      children: (
        <p>
          Are you sure you want to remove the credentials of
          <b>
            {username}
          </b>
          from the local storage? This can not be undone.
        </p>
      ),
      onConfirm: () => {
        sessionService
          .deleteSavedCredential(ipcProxy, username)
          .then(
            async () => {
              props.viewmodel.savedCredentials.delete(username);
              if (props.viewmodel.savedCredentials.size == 1) {
                const onlyCredential = Array.of(...props.viewmodel.savedCredentials)[0];
                const password = await sessionService.getPassword(ipcProxy, onlyCredential);
                props.viewmodel.dto["user"] = onlyCredential;
                props.viewmodel.dto["password"] = password;
                props.viewmodel.selectedExistingPassword = password;
              } else {
                props.viewmodel.dto["user"] = "";
                props.viewmodel.dto["password"] = "";
              }
            },
            noop)
          .finally(() => props.viewmodelChanged());
      },
    });
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <AaInput
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
      <AaPasswordInput
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
        props.viewmodel.savedCredentials.size > 1 && renderExistingUsers()
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
            Array.of(...props.viewmodel.savedCredentials).map((userName: string) => {
              return (
                <Tag
                  className="existing-user-name-tag"
                  interactive={true}
                  key={userName}
                  onClick={() => onSelectCredential(userName)}
                  onRemove={() => onRemoveCredential(userName)}
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
