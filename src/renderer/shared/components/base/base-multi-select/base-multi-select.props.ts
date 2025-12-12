import { Props } from "@blueprintjs/core";
import { SelectOption } from "../../../types";

export interface BaseMultiSelectProps<T> extends Props {
  allItems: Array<SelectOption<T>>;
  disabled?: boolean;
  formGroupLabel: string;
  selectedItems: Array<SelectOption<T>>;
  readOnly?: boolean;

  itemLabel?: (option: SelectOption<T>) => string;
  onClearOptions: () => void;
  onOptionAdded: (option: SelectOption<T>) => void;
  onOptionRemoved: (option: SelectOption<T>) => void;
  preTextElement?: (option: SelectOption<T>) => React.ReactNode;
}
