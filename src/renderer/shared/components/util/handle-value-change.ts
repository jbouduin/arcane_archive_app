import { ChangeEventHandler, FormEvent } from "react";

/** Event handler that exposes the target element's value as an inferred generic type. */
export function handleValueChange<T>(
  handler: (value: T) => void
): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> {
  return (event: FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).value as unknown as T);
}
