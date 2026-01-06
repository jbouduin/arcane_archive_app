/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual, merge } from "lodash";

/**
 * Represents the result of merging two objects, including change detection and added keys.
 *
 * @template T - The type of the merged object.
 */
export type MergeResultWithNewKeys<T> = {
  /** The resulting object after merging base and overlay. */
  merged: T;
  /** Indicates whether the merged object differs from the original overlay. */
  changed: boolean;
  /** A list of keys (including nested keys in dot notation) that were missing in the overlay and added from the base. */
  addedKeys: Array<string>;
};

/**
 * Deeply merges two objects and provides details about changes.
 *
 * @template T - The type of the base object.
 * @param {T} base - The base object that acts as the starting point (e.g., defaults, previous state).
 * @param {Partial<T>} overlay - The object that provides overrides or additions (e.g., user input, updates).
 * @returns {MergeResultWithNewKeys<T>} An object containing:
 *   - `merged`: The resulting object after merging `base` and `overlay`.
 *   - `changed`: A boolean indicating whether the merged object differs from the original overlay.
 *   - `addedKeys`: A list of keys (including nested keys in dot notation) that were missing in the overlay and added from the base.
 *
 * @description
 * This function:
 * - Deep merges `base` and `overlay` using lodash's merge behavior (arrays are replaced, not concatenated).
 * - Detects if any changes occurred compared to the original overlay.
 * - Collects all keys that were missing in the overlay and added from the base.
 *
 * @example
 * const base = {
 *   theme: 'dark',
 *   layout: { sidebar: true, width: 250 },
 *   shortcuts: { save: 'Ctrl+S', open: 'Ctrl+O' }
 * };
 *
 * const overlay = { layout: { width: 300 } };
 *
 * const { merged, changed, addedKeys } = mergeWithChangeDetails(base, overlay);
 *
 * console.log(merged);
 * // {
 * //   theme: 'dark',
 * //   layout: { sidebar: true, width: 300 },
 * //   shortcuts: { save: 'Ctrl+S', open: 'Ctrl+O' }
 * // }
 *
 * console.log(changed); // true
 * console.log(addedKeys); // ['theme', 'layout.sidebar', 'shortcuts', 'shortcuts.save', 'shortcuts.open']
 */
export function mergeWithChangeDetails<T extends Record<string, any>>(
  base: T,
  overlay: Partial<T>
): MergeResultWithNewKeys<T> {
  const merged = merge({}, base, overlay);
  const addedKeys = getAddedKeys(base, overlay);
  const changed = !isEqual(merged, overlay);
  return { merged, changed, addedKeys };
}

/**
 * Recursively collects keys that exist in `base` but are missing in `overlay`.
 *
 * @param {Record<string, any>} base - The base object.
 * @param {Record<string, any>} overlay - The overlay object.
 * @returns {string[]} A list of missing keys in dot notation.
 *
 * @example
 * getAddedKeys({ a: 1, b: { x: 10, y: 20 } }, { b: { y: 30 } });
 * // ['a', 'b.x']
 */
function getAddedKeys(base: Record<string, any>, overlay: Record<string, any>): string[] {
  const keys: string[] = [];
  for (const key in base) {
    if (!(key in overlay)) {
      keys.push(key);
    } else if (
      typeof base[key] === "object" &&
      !Array.isArray(base[key]) &&
      typeof overlay[key] === "object"
    ) {
      const nested = getAddedKeys(base[key], overlay[key]);
      keys.push(...nested.map(nk => `${key}.${nk}`));
    }
  }
  return keys;
}
