import SQLite from "better-sqlite3";
import { Kysely, MigrationInfo, MigrationProvider, MigrationResultSet, Migrator, ParseJSONResultsPlugin, SqliteDialect } from "kysely";
import { inject, singleton } from "tsyringe";
import { ProgressCallback } from "../../../../common/ipc";
import { runSerial } from "../../../../common/util";
import { IConfigurationService } from "../../infra/interface";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IDatabaseService } from "../interface";
import { CacheDatabaseSchema } from "../schema";
import { SqliteKyselyPlugin } from "./sqlite-kysely.plugin";

@singleton()
export class DatabaseService implements IDatabaseService {
  private readonly configurationService: IConfigurationService;
  private _database!: Kysely<CacheDatabaseSchema>;

  public get database(): Kysely<CacheDatabaseSchema> {
    return this._database;
  }

  public constructor(@inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService) {
    this.configurationService = configurationService;
  }

  public connect(): IDatabaseService {
    const database = new SQLite(this.configurationService.cacheDatabaseFilePath);
    database.pragma("foreign_keys = ON");
    const dialect = new SqliteDialect({
      database: database
    });
    this._database = new Kysely<CacheDatabaseSchema>({
      dialect: dialect,
      plugins: [new ParseJSONResultsPlugin(), new SqliteKyselyPlugin()]
    });
    return this;
  }

  public async migrateToLatest(migrationProvider: MigrationProvider, progressCallback: ProgressCallback): Promise<IDatabaseService> {
    const dialect = new SqliteDialect({
      database: new SQLite(this.configurationService.cacheDatabaseFilePath)
    });
    const connection = new Kysely<CacheDatabaseSchema>({
      dialect: dialect
    });

    const migrator = new Migrator({ db: connection, provider: migrationProvider });
    const migrationsToExecute = (await migrator.getMigrations()).filter((migration: MigrationInfo) => !migration.executedAt);

    const result = await runSerial<MigrationInfo>(
      migrationsToExecute,
      async (mig: MigrationInfo, index: number, total: number) => {
        progressCallback(`Performing Migration ${mig.name} (${index + 1}/${total})`);
        await migrator.migrateTo(mig.name)
          .then((migrationResultSet: MigrationResultSet) => {
            if (migrationResultSet.error) {
              throw migrationResultSet.error;
            }
          });
      }
    )
      .then(() => this);
    return result;
  }
}
