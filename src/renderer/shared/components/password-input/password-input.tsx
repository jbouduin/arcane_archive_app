import { Button, Intent, Tooltip } from "@blueprintjs/core";
import React from "react";
import { ValidatedInput } from "../validated-input/validated-input";
import { ValidatedInputProps } from "../validated-input/validated-input.props";
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
      {...buildValidatedInputProps()}
    />
  );
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  function buildValidatedInputProps(): ValidatedInputProps {
    const result: ValidatedInputProps = { ...props };
    props.inputProps!.rightElement = (
      <Tooltip
        content={`${showPassword ? "Hide" : "Show"} Password`}
      >
        <Button
          disabled={props.inputProps!.disabled}
          icon={showPassword ? "unlock" : "lock"}
          intent={Intent.WARNING}
          onClick={handleLockClick}
          variant="minimal"
        />
      </Tooltip>
    );
    props.inputProps!.type = showPassword ? "text" : "password";
    return result;
  }
  // #endregion
}
