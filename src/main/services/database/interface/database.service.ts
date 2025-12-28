import { Kysely, MigrationProvider } from "kysely";
import { ProgressCallback } from "../../../../common/ipc";
import { CacheDatabaseSchema } from "../schema";

export interface IDatabaseService {
  readonly database: Kysely<CacheDatabaseSchema>;
  connect(): IDatabaseService;
  migrateToLatest(migrationProvider: MigrationProvider, progressCallback: ProgressCallback): Promise<IDatabaseService>;
}
