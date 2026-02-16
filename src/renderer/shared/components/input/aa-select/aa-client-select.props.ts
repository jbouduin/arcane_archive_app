import { SelectOption } from "../../../types";
import { BaseProps } from "../base.props";

export interface AaClientSelectProps<T, U, Dto extends object> extends BaseProps<Dto> {
  readonly?: boolean;
  /**
   * Defaults to 'None'
   */
  validation?: "none" | "synchronous";

  idExtractor: (value: T) => U;
  itemSort?: (a: T, b: T) => number;
  preTextElement?: (option: SelectOption<T>) => React.ReactNode;
}
