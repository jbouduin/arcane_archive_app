import { BaseTableViewProps } from "../base/base-table";

export type CardTableViewProps<T> = BaseTableViewProps<T> & {
  version: number;
};
