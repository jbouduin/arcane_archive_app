import { Props } from "@blueprintjs/core";
import { SelectOption } from "../../../types";

export interface BaseMultiSelectProps<T> extends Props {
  allItems: Array<SelectOption<T>>;
  disabled?: boolean;
  formGroupLabel: string;
  selectedOptions: Array<SelectOption<T>>;
  readOnly?: boolean;

  itemComparer?: (a: T, b: T) => boolean;
  itemLabel?: (option: SelectOption<T>) => string;
  onClearSelectedOptions: () => void;
  onOptionAdded: (option: SelectOption<T>) => void;
  onOptionRemoved: (option: SelectOption<T>) => void;
  preTextElement?: (option: SelectOption<T>) => React.ReactNode;
}
