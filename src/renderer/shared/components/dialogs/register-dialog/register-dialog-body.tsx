import { ControlGroup, FormGroup, InputGroup, SectionCard } from "@blueprintjs/core";
import { PasswordInput } from "../../password-input/password-input";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { RegisterDialogBodyProps } from "./register-dialog-props";

export function RegisterDialogBody(props: RegisterDialogBodyProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <ValidatedInput
        keyPrefix="user-name"
        label="Username"
        labelInfo="*"
        validate={() => props.viewmodel.validateUserName()}
        inputProps={{
          required: true,
          value: props.viewmodel.userName,
          onChange: handleStringChange((newValue: string) => {
            props.viewmodel.userName = newValue;
            props.viewmodelChanged(props.viewmodel);
          }),
          placeholder: "Enter a username..."
        }}
      />
      <ControlGroup
        key="emails-group"
        fill={true}
        vertical={false}
      >
        <ValidatedInput
          keyPrefix="email"
          label="Email"
          labelInfo="*"
          validate={() => props.viewmodel.validateEmail()}
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Enter your email address...",
            onChange:
              handleStringChange((newValue: string) => {
                props.viewmodel.email = newValue;
                props.viewmodelChanged(props.viewmodel);
              }),
            type: "email",
            value: props.viewmodel.email
          }}
        />
        <ValidatedInput
          keyPrefix="repeat-email"
          label="Repeat Email"
          labelInfo="*"
          validate={() => props.viewmodel.validateEmailRepeat()}
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Repeat your email address...",
            onChange:
              handleStringChange((newValue: string) => {
                props.viewmodel.emailRepeat = newValue;
                props.viewmodelChanged(props.viewmodel);
              }),
            type: "email",
            value: props.viewmodel.emailRepeat
          }}
        />
      </ControlGroup>
      <ControlGroup
        key="pwds-group"
        fill={true}
        vertical={false}
      >
        <PasswordInput
          keyPrefix="password"
          label="Password"
          labelInfo="*"
          validate={() => props.viewmodel.validatePassword()}
          inputProps={{
            required: true,
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.password = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            placeholder: "Enter your password",
            value: (props.viewmodel).password
          }}
        />
        <PasswordInput
          keyPrefix="repeat-password"
          label="Repeat Password"
          labelInfo="*"
          validate={() => props.viewmodel.validatePasswordRepeat()}
          inputProps={{
            required: true,
            placeholder: "Repeat your password",
            value: (props.viewmodel).passwordRepeat,
            onChange: handleStringChange((newValue: string) => {
              props.viewmodel.passwordRepeat = newValue;
              props.viewmodelChanged(props.viewmodel);
            })
          }}
        />
      </ControlGroup>
      <ControlGroup
        key="name-group"
        fill={true}
        vertical={false}
      >
        <FormGroup
          key="fn-group"
          label="First Name"
          labelFor="first-name"
        >
          <InputGroup
            id="first-name"
            inputMode="text"
            placeholder="Enter your first name..."
            onChange={
              handleStringChange((newValue: string) => {
                props.viewmodel.firstName = newValue;
                props.viewmodelChanged(props.viewmodel);
              })
            }
            size="small"
            type="text"
            value={props.viewmodel.firstName}
          />
        </FormGroup>
        <FormGroup
          key="ln-group"
          label="Last Name"
          labelFor="last-name"
        >
          <InputGroup
            id="last-name"
            inputMode="text"
            placeholder="Enter your last name..."
            onChange={
              handleStringChange((newValue: string) => {
                props.viewmodel.lastName = newValue;
                props.viewmodelChanged(props.viewmodel);
              })
            }
            size="small"
            type="text"
            value={props.viewmodel.lastName}
          />
        </FormGroup>
      </ControlGroup>
    </SectionCard>
  );
  // #endregion
}
