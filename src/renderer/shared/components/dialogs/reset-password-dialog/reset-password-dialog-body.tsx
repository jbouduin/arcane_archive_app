import { SectionCard } from "@blueprintjs/core";
import { AaInput, AaPasswordInput, AaPasswordSecurityBar } from "../../input";
import { ResetPasswordDialogBodyProps } from "./reset-password-dialog.props";

export function ResetPasswordDialogBody(props: ResetPasswordDialogBodyProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <AaInput
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
      <AaPasswordInput
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
      <AaPasswordSecurityBar
        score={props.viewmodel.score}
        guessesLog10={props.viewmodel.guessesLog10}
        warning={props.viewmodel.warning}
        suggestions={props.viewmodel.suggestions}
      />
      <AaPasswordInput
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
