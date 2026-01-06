export type QueryResultDto<T> = {
  hasMore: boolean;
  resultList: Array<T>;
  currentPageNumber: number;
  currentPageSize: number;
};
