import { Icon } from "@blueprintjs/core";

export function renderBoolean(value: boolean): JSX.Element {
  return (
    <Icon
      icon={value ? "tick" : "cross"}
      intent={value ? "success" : "danger"}
    />
  );
}
