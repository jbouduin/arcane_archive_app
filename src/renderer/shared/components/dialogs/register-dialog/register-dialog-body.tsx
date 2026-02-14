import { ControlGroup, SectionCard } from "@blueprintjs/core";
import { AaInput, AaPasswordInput, AaPasswordSecurityBar } from "../../input";
import { RegisterDialogBodyProps } from "./register-dialog.props";

export function RegisterDialogBody(props: RegisterDialogBodyProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <AaInput
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
        <AaInput
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
        <AaInput
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
        <AaPasswordInput
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
        <AaPasswordInput
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
      <AaPasswordSecurityBar
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
        <AaInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="firstName"
          label="First Name"
          inputProps={{
            placeholder: "Enter your first name..."
          }}
        />
        <AaInput
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
