import { SectionCard } from "@blueprintjs/core";
import { PasswordInput } from "../../password-input/password-input";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { PwdSecurityBar } from "../register-dialog/pwd-security-bar";
import { ResetPasswordDialogBodyProps } from "./reset-password-dialog.props";

export function ResetPasswordDialogBody(props: ResetPasswordDialogBodyProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <ValidatedInput
        keyPrefix="reset-token"
        label="Code"
        validationResult={props.viewmodel.getValidation("resetToken")}
        startValidation={() => props.viewmodel.startValidation()}
        endValidation={() => props.viewmodel.endValidation()}
        onValidationComplete={() => props.onValidationCompleted()}
        validate={() => props.viewmodel.validateResetToken()}
        inputProps={{
          required: true,
          placeholder: "Enter the code you received...",
          value: props.viewmodel.resetToken,
          onChange: handleStringChange((newValue: string) => {
            props.viewmodel.resetToken = newValue;
            props.viewmodelChanged();
          })
        }}
      />
      <PasswordInput
        keyPrefix="new-password"
        label="New Password"
        labelInfo="*"
        validationResult={props.viewmodel.getValidation("password")}
        startValidation={() => props.viewmodel.startValidation()}
        endValidation={() => props.viewmodel.endValidation()}
        onValidationComplete={() => props.onValidationCompleted()}
        inputProps={{
          required: true,
          placeholder: "Enter your old password",
          value: props.viewmodel.password,
          onChange: handleStringChange((newValue: string) => {
            props.viewmodel.password = newValue;
            props.viewmodelChanged();
          })
        }}
      />
      <PwdSecurityBar
        score={props.viewmodel.score}
        guessesLog10={props.viewmodel.guessesLog10}
        warning={props.viewmodel.warning}
        suggestions={props.viewmodel.suggestions}
      />
      <PasswordInput
        keyPrefix="repeat-password"
        label="Repeat Password"
        labelInfo="*"
        validationResult={props.viewmodel.getValidation("passwordRepeat")}
        validate={() => props.viewmodel.validatePasswordRepeat()}
        startValidation={() => props.viewmodel.startValidation()}
        endValidation={() => props.viewmodel.endValidation()}
        onValidationComplete={() => props.onValidationCompleted()}
        touched={true}
        inputProps={{
          required: true,
          placeholder: "Repeat your password",
          value: props.viewmodel.passwordRepeat,
          onChange: handleStringChange((newValue: string) => {
            props.viewmodel.passwordRepeat = newValue;
            props.viewmodelChanged();
          })
        }}
      />
    </SectionCard>
  );
  // #endregion
}
