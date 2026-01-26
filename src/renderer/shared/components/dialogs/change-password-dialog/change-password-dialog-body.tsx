import { SectionCard } from "@blueprintjs/core";
import { PasswordInput } from "../../input";
import { PasswordSecurityBar } from "../shared";
import { ChangePasswordDialogBodyProps } from "./change-password-dialog.props";

export function ChangePasswordDialogBody(props: ChangePasswordDialogBodyProps) {
  return (
    <SectionCard padded={false}>
      <PasswordInput
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
      <PasswordInput
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
          placeholder: "Repeat your new password...",
        }}
      />
    </SectionCard>
  );
}
