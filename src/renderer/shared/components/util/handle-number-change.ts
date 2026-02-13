import { ChangeEventHandler, FormEvent } from "react";

/** Event handler that exposes the target element's value as a number. */
export function handleIntChange(
  handler: (number: number) => void
): ChangeEventHandler<HTMLInputElement> {
  return (event: FormEvent<HTMLElement>) => {
    const stringValue = (event.target as HTMLInputElement).value;
    return handler(Number.parseInt(stringValue) || 0);
  };
}
