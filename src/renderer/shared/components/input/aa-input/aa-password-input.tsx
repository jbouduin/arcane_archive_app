import { Button, Intent, Tooltip } from "@blueprintjs/core";
import { useCallback, useState } from "react";
import { AaInput } from "./aa-input";
import { AaInputProps } from "./aa-input.props";
import { AaPasswordInputProps } from "./aa-password-input.props";

export function AaPasswordInput<Dto extends object>(props: AaPasswordInputProps<Dto>): JSX.Element {
  // #region State ------------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  // #endregion

  // #region Event handling ---------------------------------------------------
  const handleLockClick = useCallback(() => setShowPassword(value => !value), []);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <AaInput
      {...buildValidatedInputProps()}
    />
  );
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  function buildValidatedInputProps(): AaInputProps<Dto> {
    const result: AaInputProps<Dto> = {
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
