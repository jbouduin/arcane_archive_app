import { Transaction } from "kysely";
import { inject, injectable } from "tsyringe";
import { IResult } from "../../base";
import { ILogService, IResultFactory } from "../../infra/interface";
import { DATABASE, INFRASTRUCTURE } from "../../service.tokens";
import { ICardSymbolRepository, IDatabaseService } from "../interface";
import { CacheDatabaseSchema, CardSymbolQueryDto } from "../schema";
import { BaseRepository } from "./base.repository";

@injectable()
export class CardSymbolRepository extends BaseRepository implements ICardSymbolRepository {
  // #region Constructor & C° -------------------------------------------------
  public constructor(
    @inject(DATABASE.DatabaseService) databaseService: IDatabaseService,
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(databaseService, logService, resultFactory);
  }
  // #endregion

  // #region ICardSymbolRepository Members ------------------------------------
  public getAll(): Promise<IResult<Array<CardSymbolQueryDto>>> {
    let result: Promise<IResult<Array<CardSymbolQueryDto>>>;
    try {
      result = this.database
        .selectFrom("card_symbol")
        .selectAll()
        .$castTo<CardSymbolQueryDto>()
        .execute()
        .then((queryResult: Array<CardSymbolQueryDto>) => this.resultFactory.createSuccessResult(queryResult));
    } catch (error: unknown) {
      result = this.resultFactory.createExceptionResultPromise<Array<CardSymbolQueryDto>>(error);
    }
    return result;
  }

  public upsert(code: string, svgUri: string): Promise<void> {
    return this.database
      .transaction()
      .execute(async (trx: Transaction<CacheDatabaseSchema>) => {
        const queryExisting = await trx
          .selectFrom("card_symbol")
          .selectAll()
          .where("code", "=", code)
          .executeTakeFirst();

        if (queryExisting) {
          await trx.updateTable("card_symbol")
            .set({ svg_uri: svgUri, last_synced_at: new Date().toISOString() })
            .where("code", "=", code)
            .executeTakeFirstOrThrow();
        } else {
          await trx.insertInto("card_symbol")
            .values({ code: code, svg_uri: svgUri, created_at: new Date().toISOString() })
            .executeTakeFirstOrThrow();
        }
      });
  }
  // #endregion
}
