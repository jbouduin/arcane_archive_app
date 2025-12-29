import { CachedImageSize, ScryFallImageStatus } from "../../../../common/types";
import { CardSide } from "../../../../renderer/shared/types";
import { IResult } from "../../base";
import { CardfaceInsertDto, CardfaceQueryDto, CardfaceUpdateDto } from "../schema";
import { queryPageOptions } from "./query-page-options";
import { QueryPageResult } from "./query-page-result";

export interface ICardfaceRepository {
  deleteCardface(path: string, side: CardSide): Promise<IResult<bigint>>;
  findByPathAndSide(path: string, side: CardSide): Promise<IResult<CardfaceQueryDto>>;
  getByStatus(status: ScryFallImageStatus, options: queryPageOptions): Promise<IResult<QueryPageResult<CardfaceQueryDto>>>;
  getBySize(size: CachedImageSize, options: queryPageOptions): Promise<IResult<QueryPageResult<CardfaceQueryDto>>>;
  insertCardface(cardface: CardfaceInsertDto): Promise<IResult<bigint>>;
  updateCardface(path: string, side: CardSide, cardface: CardfaceUpdateDto): Promise<IResult<bigint>>;
}
