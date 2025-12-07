import { Props } from "@blueprintjs/core";
import { MtgServer, SelectOption } from "../../../types";

export interface BaseServerSelectProps<T> extends Props {
  keyString: string;
  label: string;
  selectedItems: Array<SelectOption<T>>;
  server: MtgServer;
  serverBaseUrl: string;

  itemSort?: (a: T, b: T) => number;
  itemLabel: (item: T) => string;
  onClearSelectedItems: () => void;
  onItemAdded: (item: SelectOption<T>) => void;
  onItemRemoved: (item: SelectOption<T>) => void;
}
