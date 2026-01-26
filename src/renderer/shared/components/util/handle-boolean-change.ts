import { ChangeEventHandler, FormEvent } from "react";

/** Event handler that exposes the target element's value as a boolean. */
export function handleBooleanChange(
  handler: (checked: boolean) => void
): ChangeEventHandler<HTMLInputElement> {
  return (event: FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).checked);
}
