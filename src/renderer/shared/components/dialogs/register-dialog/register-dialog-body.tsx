import { ControlGroup, FormGroup, InputGroup, SectionCard } from "@blueprintjs/core";
import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { PasswordInput } from "../../password-input/password-input";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";

export function RegisterDialogBody(props: BaseDialogBodyProps<RegisterRequestDto>) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <ValidatedInput
        keyPrefix="user-name"
        label="Username"
        labelInfo="*"
        validate={() => (props.viewmodel as RegisterViewmodel).validateUserName()}
        inputProps={{
          required: true,
          value: (props.viewmodel as RegisterViewmodel).userName,
          onChange: handleStringChange((newValue: string) => {
            (props.viewmodel as RegisterViewmodel).userName = newValue;
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
          validate={() => (props.viewmodel as RegisterViewmodel).validateEmail()}
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Enter your email address...",
            onChange:
              handleStringChange((newValue: string) => {
                (props.viewmodel as RegisterViewmodel).email = newValue;
                props.viewmodelChanged(props.viewmodel);
              }),
            type: "email",
            value: (props.viewmodel as RegisterViewmodel).email
          }}
        />
        <ValidatedInput
          keyPrefix="repeat-email"
          label="Repeat Email"
          labelInfo="*"
          validate={() => (props.viewmodel as RegisterViewmodel).validateEmailRepeat()}
          inputProps={{
            required: true,
            inputMode: "email",
            placeholder: "Repeat your email address...",
            onChange:
              handleStringChange((newValue: string) => {
                (props.viewmodel as RegisterViewmodel).emailRepeat = newValue;
                props.viewmodelChanged(props.viewmodel);
              }),
            type: "email",
            value: (props.viewmodel as RegisterViewmodel).emailRepeat
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
          validate={() => (props.viewmodel as RegisterViewmodel).validatePassword()}
          inputProps={{
            required: true,
            onChange: handleStringChange((newValue: string) => {
              (props.viewmodel as RegisterViewmodel).password = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
            placeholder: "Enter your password",
            value: ((props.viewmodel as RegisterViewmodel)).password
          }}
        />
        <PasswordInput
          keyPrefix="repeat-password"
          label="Repeat Password"
          labelInfo="*"
          validate={() => (props.viewmodel as RegisterViewmodel).validatePasswordRepeat()}
          inputProps={{
            required: true,
            placeholder: "Repeat your password",
            value: ((props.viewmodel as RegisterViewmodel)).passwordRepeat,
            onChange: handleStringChange((newValue: string) => {
              (props.viewmodel as RegisterViewmodel).passwordRepeat = newValue;
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
                (props.viewmodel as RegisterViewmodel).firstName = newValue;
                props.viewmodelChanged(props.viewmodel);
              })
            }
            size="small"
            type="text"
            value={(props.viewmodel as RegisterViewmodel).firstName}
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
                (props.viewmodel as RegisterViewmodel).lastName = newValue;
                props.viewmodelChanged(props.viewmodel);
              })
            }
            size="small"
            type="text"
            value={(props.viewmodel as RegisterViewmodel).lastName}
          />
        </FormGroup>
      </ControlGroup>
    </SectionCard>
  );
  // #endregion
}
