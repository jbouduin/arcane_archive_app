import { ColumnType, Insertable, Selectable, Updateable } from "kysely";
import { Synchronized } from "./base-types";
import { CachedImageSize, ScryFallImageStatus } from "../../../../common/types";
import { CardSide } from "../../../../renderer/shared/types";

export interface CardfaceTable extends Synchronized {
  path: ColumnType<string, string, never>;
  side: ColumnType<CardSide, CardSide, never>;
  status: ColumnType<ScryFallImageStatus, ScryFallImageStatus, ScryFallImageStatus>;
  size: ColumnType<CachedImageSize, CachedImageSize, CachedImageSize>;
}

export type CardfaceQueryDto = Selectable<CardfaceTable>;
export type CardfaceUpdateDto = Updateable<CardfaceTable>;
export type CardfaceInsertDto = Insertable<CardfaceTable>;
