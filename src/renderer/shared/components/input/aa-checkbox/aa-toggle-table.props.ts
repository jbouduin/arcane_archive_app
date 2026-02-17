import { SelectOption } from "../../../types";
import { BaseProps } from "../base.props";

/**
 * A Component with a table containing {@link AaToggle}
 */
export interface AaToggleTableProps<T, Dto extends object>
  extends Omit<BaseProps<Dto>, "label" | "labelInfo" | "fill"> {
  key: string;
  /**
   * _Default_ `true`
   */
  bordered?: boolean;
  /**
   * _Default_ `2`
   */
  columns: number;
  /**
   * _Default_ `true`
   */
  compact?: boolean;
  /**
   * Width of the table. _Default_ `100%`
   */
  width?: string | number;
  tableHeader?: string;
  allOptions: Array<SelectOption<T>>;
  disabled?: boolean;
  /**
   * Defaults to 'None'
   */
  validation?: "none" | "synchronous";

  /**
   *
   * @param optionValue A function extracting the string value from the array of strings.
   * @returns
   */
  value: (optionValue: T) => string;
}
