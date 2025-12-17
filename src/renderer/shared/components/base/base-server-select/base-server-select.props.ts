import { Props } from "@blueprintjs/core";
import { MtgServer, SelectOption } from "../../../types";

export interface BaseServerSelectProps<T> extends Props {
  keyString: string;
  formGroupLabel: string;
  disabled?: boolean;
  selectedOptions: Array<SelectOption<T>>;
  server: MtgServer;
  serverBaseUrl: string;
  readOnly?: boolean;

  itemComparer?: (a: T, b: T) => boolean;
  itemSort?: (a: T, b: T) => number;
  itemLabel: (item: T) => string;
  onClearSelectedOptions: () => void;
  onOptionAdded: (item: SelectOption<T>) => void;
  onOptionsRemoved: (item: SelectOption<T>) => void;
}
