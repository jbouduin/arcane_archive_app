export function stringNotNullOrEmpty(value: string | null): boolean {
  return value != null && value.trim().length > 0;
}

export function stringsNotNullOrEmpty(...values: Array<string | null>): boolean {
  return values.every((v: string | null) => stringNotNullOrEmpty(v), undefined);
}

export function stringHasMinimalLength(value: string | null, minLength: number): boolean {
  return value != null && value.trim().length >= minLength;
}

export function stringCouldBeEmail(input: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(input);
}

export function stringCouldBeUrl(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}
