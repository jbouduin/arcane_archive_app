import { SectionCard } from "@blueprintjs/core";
import { BaseInput, PasswordInput } from "../../input";
import { PasswordSecurityBar } from "../shared";
import { ResetPasswordDialogBodyProps } from "./reset-password-dialog.props";

export function ResetPasswordDialogBody(props: ResetPasswordDialogBodyProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <BaseInput
        viewmodel={props.viewmodel}
        fieldName="resetToken"
        viewmodelChanged={props.viewmodelChanged}
        validation="synchronous"
        label="Code"
        inputProps={{
          required: true,
          placeholder: "Enter the code you received..."
        }}
      />
      <PasswordInput
        viewmodel={props.viewmodel}
        fieldName="password"
        viewmodelChanged={props.viewmodelChanged}
        validation="synchronous"
        label="New Password"
        labelInfo="*"
        inputProps={{
          required: true,
          placeholder: "Enter your password..."
        }}
      />
      <PasswordSecurityBar
        score={props.viewmodel.score}
        guessesLog10={props.viewmodel.guessesLog10}
        warning={props.viewmodel.warning}
        suggestions={props.viewmodel.suggestions}
      />
      <PasswordInput
        viewmodel={props.viewmodel}
        fieldName="passwordRepeat"
        viewmodelChanged={props.viewmodelChanged}
        validation="synchronous"
        label="Repeat Password"
        labelInfo="*"
        inputProps={{
          required: true,
          placeholder: "Repeat your password..."
        }}
      />
    </SectionCard>
  );
  // #endregion
}
