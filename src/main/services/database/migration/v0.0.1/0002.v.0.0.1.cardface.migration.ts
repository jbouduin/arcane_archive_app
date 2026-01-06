/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ColumnDefinitionBuilder, Kysely } from "kysely";
import { createTable, CreateTableOptions, IBaseMigration } from "../base-migration";

export class V0_0_1_CardfaceMigration implements IBaseMigration {
  // #region IBaseMigration Members -------------------------------------------
  get keyName(): string {
    return "0002: v0.0.1 Cardface";
  }

  up(db: Kysely<any>): Promise<void> {
    return createV0_0_2_CardFace(db);
  }

  down(db: Kysely<any>): Promise<void> {
    return db.schema.dropTable("cardface").execute();
  }
}
// #endregion

// #region Auxiliary Methods ------------------------------------------------
async function createV0_0_2_CardFace(db: Kysely<any>): Promise<void> {
  const options: CreateTableOptions = {
    isSynced: true,
    tableName: "cardface",
    primaryKeyType: "custom",
    primaryKey: [
      { columnName: "path", dataType: "text", callback: (col: ColumnDefinitionBuilder) => col.notNull() },
      { columnName: "side", dataType: "text", callback: (col: ColumnDefinitionBuilder) => col.notNull() }
    ]
  };
  await createTable(db, options)
    .addColumn("status", "text", (col: ColumnDefinitionBuilder) => col.notNull())
    .addColumn("size", "text", (col: ColumnDefinitionBuilder) => col.notNull())
    .execute()
    .then(async () => await db.schema
      .createIndex("cardface_status_idx")
      .on("cardface")
      .column("status")
      .execute()
    )
    .then(async () => await db.schema
      .createIndex("cardface_size_idx")
      .on("cardface")
      .column("size")
      .execute()
    );
}
// #endregion
