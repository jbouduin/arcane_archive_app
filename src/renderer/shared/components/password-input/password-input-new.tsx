import { Button, Intent, Tooltip } from "@blueprintjs/core";
import { useCallback, useState } from "react";
import { BaseInput } from "../validated-input/base-input";
import { BaseInputProps } from "../validated-input/base-input.props";
import { PasswordInputNewProps } from "./password-input-new.props";

export function PasswordInputNew<Dto extends object>(props: PasswordInputNewProps<Dto>) {
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
