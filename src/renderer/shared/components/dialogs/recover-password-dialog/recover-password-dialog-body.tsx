import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { RecoverPasswordDialogBodyProps } from "./recover-password-dialog.props";

export function RecoverPasswordDialogBody(props: RecoverPasswordDialogBodyProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <ValidatedInput
      keyPrefix="user-name"
      label="User or Email"
      labelInfo="*"
      validationResult={props.viewmodel.getValidation("userNameOrEmail")}
      validate={() => props.viewmodel.validateUserNameOrEmail()}
      startValidation={() => props.viewmodel.startValidation()}
      endValidation={() => props.viewmodel.endValidation()}
      onValidationComplete={() => props.onValidationCompleted()}
      inputProps={{
        required: true,
        value: props.viewmodel.userNameOrEmail,
        onChange: handleStringChange((newValue: string) => {
          props.viewmodel.userNameOrEmail = newValue;
          props.viewmodelChanged();
        }),
        placeholder: "Enter a username or email address..."
      }}
    >
    </ValidatedInput>
  );
  // #endregion
}
