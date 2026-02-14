import { SectionCard } from "@blueprintjs/core";
import { AaPasswordInput, AaPasswordSecurityBar } from "../../input";
import { ChangePasswordDialogBodyProps } from "./change-password-dialog.props";

export function ChangePasswordDialogBody(props: ChangePasswordDialogBodyProps): JSX.Element {
  return (
    <SectionCard padded={false}>
      <AaPasswordInput
        viewmodel={props.viewmodel}
        fieldName="oldPassword"
        viewmodelChanged={props.viewmodelChanged}
        validation="synchronous"
        label="Old Password"
        labelInfo="*"
        inputProps={{
          required: true,
          placeholder: "Enter your old password...",
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
          placeholder: "Enter your new password",
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
          placeholder: "Repeat your new password...",
        }}
      />
    </SectionCard>
  );
}
