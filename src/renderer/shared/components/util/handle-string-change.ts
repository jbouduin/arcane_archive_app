/** Event handler that exposes the target element's value as a string. */
export function handleStringChange(handler: (value: string) => void) {
  return (event: React.FormEvent<HTMLElement>) => handler((event.target as HTMLInputElement).value);
}
