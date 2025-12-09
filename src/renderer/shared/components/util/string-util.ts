export function stringNotNullOrEmpty(value: string | null) {
  return value != null && value.trim().length > 0;
}

export function stringsNotNullOrEmpty(...values: Array<string | null>) {
  return values.every((v: string | null) => stringNotNullOrEmpty(v), undefined);
}

export function stringHasMinimalLength(value: string | null, minLength: number) {
  return value != null && value.trim().length >= minLength;
}

export function stringCouldBeEmail(input: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(input);
}
