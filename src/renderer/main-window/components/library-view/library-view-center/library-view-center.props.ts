import { Props } from "@blueprintjs/core";
import { CardQueryParamsDto } from "../../../../shared/dto";
import { SortDirection } from "../../../../shared/components/base/base-table";
import { CardSortField } from "../../../../shared/types";

export interface LibraryViewCenterProps extends Props {
  cardQuery: CardQueryParamsDto;

  onCardSelected: (cardId: number | null) => void;
  onCurrentPageChanged: (newPage: number) => void;
  onCurrentPageSizeChanged: (newPageSize: number) => void;
  onSortChanged: (columnName: CardSortField, sortDirection: SortDirection) => void;
}
