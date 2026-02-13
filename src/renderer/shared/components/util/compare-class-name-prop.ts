import { isEmpty, isNil, xor } from "lodash";

export function compareClassNameProp(prev: string | undefined, current: string | undefined): boolean {
  // both are null/undefined → equal
  if (isNil(prev) && isNil(current)) {
    return true;
  }

  // exactly one is null/undefined → not equal
  if (isNil(prev) || isNil(current)) {
    return false;
  }

  // raw string comparison → cheap and probably most of the cases
  if (prev === current) {
    return true;
  }

  // both defined → compare class name sets
  return isEmpty(xor(normalizeClassNames(prev), normalizeClassNames(current)));
}

function normalizeClassNames(value: string): Array<string> {
  // trim, split on any whitespace, drop empties, remove duplicates
  const unique = new Set(
    value
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );

  return Array.from(unique);
}
