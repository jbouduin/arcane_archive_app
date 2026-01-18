import { Button, Intent, Tooltip } from "@blueprintjs/core";
import { useCallback, useState } from "react";
import { BaseInput } from "./base-input";
import { BaseInputProps } from "./base-input.props";
import { PasswordInputProps } from "./password-input.props";

export function PasswordInput<Dto extends object>(props: PasswordInputProps<Dto>): JSX.Element {
  // #region State ------------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  // #endregion

  // #region Event handling ---------------------------------------------------
  const handleLockClick = useCallback(() => setShowPassword(value => !value), []);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <BaseInput
      {...buildValidatedInputProps()}
    />
  );
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  function buildValidatedInputProps(): BaseInputProps<Dto> {
    const result: BaseInputProps<Dto> = {
      ...props
    };
    result.inputProps!.rightElement = (
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
