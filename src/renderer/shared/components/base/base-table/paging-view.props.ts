import { Props } from "@blueprintjs/core";

export interface PagingViewProps extends Props {
  hasMore: boolean;
  currentPageNumber: number;
  currentPageSize: number;

  currentPageChanged: (newPage: number) => void;
  currentPageSizeChanged: (newPageSize: number) => void;
}
