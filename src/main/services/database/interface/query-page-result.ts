import { Selectable } from "kysely";

export interface QueryPageResult<T extends Selectable<unknown>> {
  data: Array<T>;
  hasMore: boolean;
}
