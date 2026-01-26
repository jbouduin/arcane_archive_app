import { BaseInput } from "../../input";
import { RecoverPasswordDialogBodyProps } from "./recover-password-dialog.props";

export function RecoverPasswordDialogBody(props: RecoverPasswordDialogBodyProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <BaseInput
      viewmodel={props.viewmodel}
      fieldName="userNameOrEmail"
      viewmodelChanged={props.viewmodelChanged}
      validation="synchronous"
      label="User or Email"
      labelInfo="*"
      inputProps={{
        required: true,
        placeholder: "Enter username or email address..."
      }}
    />
  );
  // #endregion
}
