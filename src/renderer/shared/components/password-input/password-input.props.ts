import { Props } from "@blueprintjs/core";

export interface PasswordInputProps extends Props {
  label?: string;
  placeHolder?: string;
  disabled?: boolean;
  value: string;
  passwordChanged: (newValue: string) => void;
}
