import { ControlGroup, SectionCard } from "@blueprintjs/core";
import { BaseInput, PasswordInput } from "../../input";
import { PwdSecurityBar } from "./pwd-security-bar";
import { RegisterDialogBodyPropsNew } from "./register-dialog.props";

export function RegisterDialogBodyNew(props: RegisterDialogBodyPropsNew) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <BaseInput
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        validation="asynchronous"
        fieldName="userName"
        label="Username"
        labelInfo="*"
        debounceMs={500}
        useRightElement={true}
        inputProps={{
          required: true,
          placeholder: "Enter a username..."
        }}
      />
      <ControlGroup
        key="emails-group"
        fill={true}
        vertical={false}
      >
        <BaseInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="email"
          label="Email"
          labelInfo="*"
          validation="synchronous"
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Enter your email address...",
            type: "email"
          }}
        />
        <BaseInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="emailRepeat"
          label="Repeat Email"
          labelInfo="*"
          validation="synchronous"
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Repeat your email address...",
            type: "email"
          }}
        />
      </ControlGroup>
      <ControlGroup
        key="pwds-group"
        fill={true}
        vertical={false}
      >
        <PasswordInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="password"
          label="Password"
          labelInfo="*"
          validation="synchronous"
          inputProps={{
            required: true,
            placeholder: "Enter your password..."
          }}
        />
        <PasswordInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="passwordRepeat"
          label="Repeat Password"
          labelInfo="*"
          validation="synchronous"
          inputProps={{
            required: true,
            placeholder: "Repeat your password..."
          }}
        />
      </ControlGroup>
      <PwdSecurityBar
        score={props.viewmodel.score}
        guessesLog10={props.viewmodel.guessesLog10}
        warning={props.viewmodel.warning}
        suggestions={props.viewmodel.suggestions}
      />
      <ControlGroup
        key="name-group"
        fill={true}
        vertical={false}
      >
        <BaseInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="firstName"
          label="First Name"
          inputProps={{
            placeholder: "Enter your first name..."
          }}
        />
        <BaseInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="lastName"
          label="Last Name"
          inputProps={{
            placeholder: "Enter your last name..."
          }}
        />
      </ControlGroup>
    </SectionCard>
  );
  // #endregion
}
