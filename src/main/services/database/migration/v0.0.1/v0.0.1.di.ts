import { DependencyContainer, Lifecycle } from "tsyringe";
import { DATABASE } from "../../../service.tokens";
import { IBaseMigration } from "../base-migration";
import { V0_0_1_CardSymbolMigration } from "./0001.v.0.0.1.card-symbol.migration";

export class V0_0_1_Di {
  public static registerMigrations(container: DependencyContainer): DependencyContainer {
    container.register<IBaseMigration>(DATABASE.Migration, { useClass: V0_0_1_CardSymbolMigration }, { lifecycle: Lifecycle.ResolutionScoped });
    return container;
  }
}
