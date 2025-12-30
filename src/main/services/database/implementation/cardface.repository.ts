import { DeleteResult, InsertResult, UpdateResult } from "kysely";
import { inject, injectable } from "tsyringe";
import { CachedImageSize } from "../../../../common/types";
import { CardSide } from "../../../../renderer/shared/types";
import { IResult } from "../../base";
import { ILogService, IResultFactory } from "../../infra/interface";
import { DATABASE, INFRASTRUCTURE } from "../../service.tokens";
import { ICardfaceRepository, IDatabaseService, queryPageOptions, QueryPageResult } from "../interface";
import { CardfaceInsertDto, CardfaceQueryDto, CardfaceUpdateDto } from "../schema";
import { BaseRepository } from "./base.repository";
import { traceCompilable } from "./log-compilable";
import { ScryFallImageStatus } from "../../../../common/enums";

@injectable()
export class CardfaceRepository extends BaseRepository implements ICardfaceRepository {
  // #region Constructor & C° -------------------------------------------------
  public constructor(
    @inject(DATABASE.DatabaseService) databaseService: IDatabaseService,
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(databaseService, logService, resultFactory);
  }
  // #endregion

  // #region ICardFaceRepository Members --------------------------------------
  public deleteCardface(path: string, side: CardSide): Promise<IResult<bigint>> {
    return this.database
      .deleteFrom("cardface")
      .where(eb => eb.and([eb("cardface.path", "=", path), eb("cardface.side", "=", side)]))
      .executeTakeFirst()
      .then(
        (result: DeleteResult) => result.numDeletedRows > 0
          ? this.resultFactory.createSuccessResult(result.numDeletedRows)
          : this.resultFactory.createNotFoundResult(`cardface with path '${path}' and side '${side}'`)
      );
  }

  public findByPathAndSide(path: string, side: CardSide): Promise<IResult<CardfaceQueryDto>> {
    return this.database
      .selectFrom("cardface")
      .selectAll()
      .where(eb => eb.and([eb("cardface.path", "=", path), eb("cardface.side", "=", side)]))
      .$castTo<CardfaceQueryDto>()
      .$call(sqb => traceCompilable(this.logService, sqb))
      .executeTakeFirst()
      .then(
        (result: CardfaceQueryDto | undefined) => result != undefined
          ? this.resultFactory.createSuccessResult(result)
          : this.resultFactory.createNotFoundResult(`cardface with path '${path}' and side '${side}'`)
      );
  }

  public getByStatus(status: ScryFallImageStatus, options: queryPageOptions): Promise<IResult<QueryPageResult<CardfaceQueryDto>>> {
    return this.database
      .selectFrom("cardface")
      .selectAll()
      .where("cardface.status", "=", status)
      .top(options.pageSize + 1)
      .offset(options.pageNum * options.pageSize)
      .$castTo<CardfaceQueryDto>()
      .execute()
      .then(
        (queryResult: Array<CardfaceQueryDto>) => {
          const hasMore = queryResult.length > options.pageSize;
          if (hasMore) {
            queryResult.pop();
          }
          const result: QueryPageResult<CardfaceQueryDto> = {
            data: queryResult,
            hasMore: hasMore
          };
          return this.resultFactory.createSuccessResult(result);
        }
      );
  }

  public getBySize(size: CachedImageSize, options: queryPageOptions): Promise<IResult<QueryPageResult<CardfaceQueryDto>>> {
    return this.database
      .selectFrom("cardface")
      .selectAll()
      .where("cardface.size", "=", size)
      .top(options.pageSize + 1)
      .offset(options.pageNum * options.pageSize)
      .$castTo<CardfaceQueryDto>()
      .execute()
      .then(
        (queryResult: Array<CardfaceQueryDto>) => {
          const hasMore = queryResult.length > options.pageSize;
          if (hasMore) {
            queryResult.pop();
          }
          const result: QueryPageResult<CardfaceQueryDto> = {
            data: queryResult,
            hasMore: hasMore
          };
          return this.resultFactory.createSuccessResult(result);
        }
      );
  }

  public insertCardface(cardface: CardfaceInsertDto): Promise<IResult<bigint>> {
    return this.database
      .insertInto("cardface")
      .values(cardface)
      .$call(sqb => traceCompilable(this.logService, sqb))
      .executeTakeFirst()
      .then((result: InsertResult) => result.numInsertedOrUpdatedRows && result.numInsertedOrUpdatedRows > 0
        ? this.resultFactory.createSuccessResult(result.numInsertedOrUpdatedRows)
        : this.resultFactory.createErrorResult("Could not insert cardface")
      );
  }

  public updateCardface(path: string, side: CardSide, cardface: CardfaceUpdateDto): Promise<IResult<bigint>> {
    return this.database
      .updateTable("cardface")
      .where(eb => eb.and([eb("cardface.path", "=", path), eb("cardface.side", "=", side)]))
      .set(cardface)
      .$call(sqb => traceCompilable(this.logService, sqb))
      .executeTakeFirst()
      .then((result: UpdateResult) => result.numUpdatedRows > 0
        ? this.resultFactory.createSuccessResult(result.numUpdatedRows)
        : this.resultFactory.createErrorResult("Could not update cardface")
      );
  }
  // #endregion
}
