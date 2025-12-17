import { SectionCard } from "@blueprintjs/core";
import { PasswordInput } from "../../password-input/password-input";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";
import { LoginDialogBodyProps } from "./login-dialog.props";

export function LoginDialogBody(props: LoginDialogBodyProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <ValidatedInput
        keyPrefix="user"
        label="Username or email"
        labelInfo="*"
        validate={() => props.viewmodel.validateUser()}
        inputProps={{
          required: true,
          inputMode: "text",
          placeholder: "Enter your username or email address...",
          onChange:
            handleStringChange((newValue: string) => {
              props.viewmodel.user = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
          value: props.viewmodel.user
        }}
      />
      <PasswordInput
        keyPrefix="password"
        label="Password"
        labelInfo="*"
        validate={() => props.viewmodel.validatePassword()}
        inputProps={{
          required: true,
          value: props.viewmodel.password,
          onChange: handleStringChange((newValue: string) => {
            props.viewmodel.password = newValue;
            props.viewmodelChanged(props.viewmodel);
          })
        }}
      />
    </SectionCard>
  );
  // #endregion
}
