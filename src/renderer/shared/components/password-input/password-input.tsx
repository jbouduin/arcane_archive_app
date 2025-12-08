import { Button, Intent, Tooltip } from "@blueprintjs/core";
import React from "react";
import { ValidatedInput } from "../validated-input/validated-input";
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
    <ValidatedInput
      {...props}
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
    />
  );
  // #endregion
}
