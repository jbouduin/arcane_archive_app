import { ApiDi } from "./api/api.di";
import { InfraDi } from "./infra/infra.di";
import { LibraryDi } from "./library/library.di";

export class ServicesDI {
  public static register(): void {
    ApiDi.register();
    InfraDi.register();
    LibraryDi.register();
  }
}
