/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ColumnDefinitionBuilder, Kysely } from "kysely";
import { createTable, CreateTableOptions, IBaseMigration } from "../base-migration";

// TODO check if we can get rid of Kysely<any>
export class V0_0_1_CardSymbolMigration implements IBaseMigration {
  get keyName(): string {
    return "0001: v0.0.1 Card Symbol";
  }

  up(db: Kysely<any>): Promise<void> {
    return createV0_0_1_CardSymbol(db);
  }

  down(db: Kysely<any>): Promise<void> {
    return db.schema.dropTable("card_symbol").execute();
  }
}

async function createV0_0_1_CardSymbol(db: Kysely<any>): Promise<void> {
  const options: CreateTableOptions = {
    isSynced: true,
    tableName: "card_symbol",
    primaryKeyType: "custom",
    primaryKey: [{ columnName: "code", dataType: "text", callback: (col: ColumnDefinitionBuilder) => col.notNull() }]
  };
  await createTable(db, options)
    .addColumn("svg_uri", "text", (col: ColumnDefinitionBuilder) => col.notNull())
    .execute();
}
