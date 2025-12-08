import { FormGroup, InputGroup, SectionCard } from "@blueprintjs/core";
import { LoginRequestDto } from "../../../dto";
import { LoginViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps } from "../../base/base-dialog";
import { PasswordInput } from "../../password-input/password-input";
import { handleStringChange } from "../../util";

export function LoginDialogBody(props: BaseDialogBodyProps<LoginRequestDto>) {
  // #region Rendering --------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <FormGroup
        key="User"
        label="Username or Email"
        labelFor="user-name"
        labelInfo="*"
      >
        <InputGroup
          id="user-name"
          inputMode="text"
          placeholder="Enter your username or email address..."
          onChange={
            handleStringChange((newValue: string) => {
              (props.viewmodel as LoginViewmodel).user = newValue;
              props.viewModelChanged(props.viewmodel);
            })
          }
          required={true}
          size="small"
          value={(props.viewmodel as LoginViewmodel).user}
        />
      </FormGroup>
      <PasswordInput
        keyPrefix="password"
        label="Password"
        labelInfo="*"
        value={((props.viewmodel as LoginViewmodel)).password}
        onChange={handleStringChange((newValue: string) => {
          (props.viewmodel as LoginViewmodel).password = newValue;
          props.viewModelChanged(props.viewmodel);
        })}
        validate={() => {
          return { helperText: undefined, intent: "none" };
        }}
      />
    </SectionCard>
  );
  // #endregion
}
