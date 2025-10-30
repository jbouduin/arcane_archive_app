import { CardSetGroupBy, CardSetSort } from "../../types";

export type MtgSetTreeViewConfigurationDto = {
  cardSetSort: CardSetSort;
  cardSetGroupBy: CardSetGroupBy;
  cardSetTypeFilter: Array<string>;
}
