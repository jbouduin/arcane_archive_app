import { CardSetGroupBy, CardSetSort } from "../../types";

export type SetTreeSettingsDto = {
  cardSetSort: CardSetSort;
  cardSetGroupBy: CardSetGroupBy;
  cardSetTypeFilter: Array<string>;
};
