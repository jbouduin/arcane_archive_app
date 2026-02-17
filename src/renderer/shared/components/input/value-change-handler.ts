import { ChangeEventHandler, FormEvent } from "react";

/** Event handler that exposes the target element's value as a boolean. */
export function handleBooleanChange(
  handler: (checked: boolean) => void
): ChangeEventHandler<HTMLInputElement> {
  return (event: FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).checked);
}

export function handleIntChange(
  handler: (number: number) => void
): ChangeEventHandler<HTMLInputElement> {
  return (event: FormEvent<HTMLElement>) => {
    const stringValue = (event.target as HTMLInputElement).value;
    return handler(Number.parseInt(stringValue) || 0);
  };
}

export function handleStringChange(
  handler: (value: string) => void
): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
  return (event: FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).value);
}

export function handleValueChange<T>(
  handler: (value: T) => void
): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> {
  return (event: FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).value as unknown as T);
}
