import { SectionCard } from "@blueprintjs/core";
import { LoginRequestDto } from "../../../dto";
import { LoginViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { PasswordInput } from "../../password-input/password-input";
import { handleStringChange } from "../../util";
import { ValidatedInput } from "../../validated-input/validated-input";

export function LoginDialogBody(props: BaseDialogBodyProps<LoginRequestDto>) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <ValidatedInput
        keyPrefix="user"
        label="Username or email"
        labelInfo="*"
        validate={() => (props.viewmodel as LoginViewmodel).validateUser()}
        inputProps={{
          required: true,
          inputMode: "text",
          placeholder: "Enter your username or email address...",
          onChange:
            handleStringChange((newValue: string) => {
              (props.viewmodel as LoginViewmodel).user = newValue;
              props.viewmodelChanged(props.viewmodel);
            }),
          value: ((props.viewmodel as LoginViewmodel)).user
        }}
      />
      <PasswordInput
        keyPrefix="password"
        label="Password"
        labelInfo="*"
        validate={() => (props.viewmodel as LoginViewmodel).validatePassword()}
        inputProps={{
          required: true,
          value: ((props.viewmodel as LoginViewmodel)).password,
          onChange: handleStringChange((newValue: string) => {
            (props.viewmodel as LoginViewmodel).password = newValue;
            props.viewmodelChanged(props.viewmodel);
          })
        }}
      />
    </SectionCard>
  );
  // #endregion
}
