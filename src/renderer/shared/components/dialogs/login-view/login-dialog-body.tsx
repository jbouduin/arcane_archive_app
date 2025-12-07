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
        labelInfo="required"
      >
        <InputGroup
          id="user-name"
          inputMode="text"
          onChange={
            handleStringChange((newValue: string) => {
              (props.viewmodel as LoginViewmodel).user = newValue;
              props.viewModelChanged(props.viewmodel);
            })
          }
          size="small"
          value={(props.viewmodel as LoginViewmodel).user}
        />
      </FormGroup>
      <PasswordInput
        label="Password"
        value={((props.viewmodel as LoginViewmodel)).password}
        passwordChanged={
          (newValue: string) => {
            (props.viewmodel as LoginViewmodel).password = newValue;
            props.viewModelChanged(props.viewmodel);
          }
        }
      />
    </SectionCard>
  );
  // #endregion
}
