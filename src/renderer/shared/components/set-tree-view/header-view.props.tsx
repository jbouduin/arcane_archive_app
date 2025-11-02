import { Props } from "@blueprintjs/core";
import { CardSetGroupBy, CardSetSort } from "../../../../common/types";

export interface HeaderViewProps extends Props {
  cardSetSort: CardSetSort;
  cardSetGroupBy: CardSetGroupBy;
  cardSetTypeFilter: Array<string>;

  onCardSetSortChanged: (cardSetSort: CardSetSort) => void;
  onCardSetGroupByChanged: (cardSetGroupBy: CardSetGroupBy) => void;
  onCardSetTypeFilterChanged: (cardSetType: string) => void;
  onTextFilterChanged: (filter: string) => void;
}
