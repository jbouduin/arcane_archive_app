import { ApiDi } from "./api/api.di";
import { CollectionDi } from "./collection/collection.di";
import { DatabaseDi } from "./database/database.di";
import { InfraDi } from "./infra/infra.di";
import { LibraryDi } from "./library/library.di";

export class ServicesDI {
  public static register(): void {
    ApiDi.register();
    CollectionDi.register();
    InfraDi.register();
    LibraryDi.register();
    DatabaseDi.register();
  }
}
