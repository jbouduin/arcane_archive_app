import { ChangeEventHandler, FormEvent } from "react";

/** Event handler that exposes the target element's value as a string. */
export function handleStringChange(
  handler: (value: string) => void
): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
  return (event: FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).value);
}
