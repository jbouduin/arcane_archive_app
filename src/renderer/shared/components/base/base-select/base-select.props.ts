import { Props } from "@blueprintjs/core";
import { SelectOption } from "../../../types";

export interface BaseSelectProps<T> extends Props {
  allItems: Array<SelectOption<T>>;
  formGroupLabel: string;
  selectedItems: Array<SelectOption<T>>;

  itemLabel?: (option: SelectOption<T>) => string;
  onClearOptions: () => void;
  onOptionAdded: (option: SelectOption<T>) => void;
  onOptionRemoved: (option: SelectOption<T>) => void;
  preTextElement?: (option: SelectOption<T>) => React.ReactNode;
}
