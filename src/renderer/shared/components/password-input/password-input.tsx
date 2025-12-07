import { Button, FormGroup, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import React from "react";
import { handleStringChange } from "../util";
import { PasswordInputProps } from "./password-input.props";

export function PasswordInput(props: PasswordInputProps) {
  // #region State ------------------------------------------------------------
  const [showPassword, setShowPassword] = React.useState(false);
  // #endregion

  // #region Event handling ---------------------------------------------------
  const handleLockClick = React.useCallback(() => setShowPassword(value => !value), []);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <FormGroup
      key={props.label || "password"}
      label="Password"
      labelFor="password"
    >
      <InputGroup
        key="password"
        size="small"
        placeholder={props.placeHolder || "Enter your password..."}
        rightElement={
          (
            <Tooltip
              content={`${showPassword ? "Hide" : "Show"} Password`}
            >
              <Button
                disabled={props.disabled}
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                onClick={handleLockClick}
                variant="minimal"
              />
            </Tooltip>
          )
        }
        type={showPassword ? "text" : "password"}
        value={props.value}
        onChange={
          handleStringChange((newValue: string) => {
            props.passwordChanged(newValue);
          })
        }
      />
    </FormGroup>
  );
  // #endregion
}
