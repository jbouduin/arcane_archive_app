import { DependencyContainer, Lifecycle } from "tsyringe";
import { DATABASE } from "../../../service.tokens";
import { IBaseMigration } from "../base-migration";
import { V0_0_1_CardSymbolMigration } from "./0001.v.0.0.1.card-symbol.migration";
import { V0_0_1_CardfaceMigration } from "./0002.v.0.0.1.cardface.migration";

export class V0_0_1_Di {
  public static registerMigrations(container: DependencyContainer): DependencyContainer {
    // #region Register Migration ---------------------------------------------
    container.register<IBaseMigration>(DATABASE.Migration, { useClass: V0_0_1_CardSymbolMigration }, { lifecycle: Lifecycle.ResolutionScoped });
    container.register<IBaseMigration>(DATABASE.Migration, { useClass: V0_0_1_CardfaceMigration }, { lifecycle: Lifecycle.ResolutionScoped });
    // #endregion
    return container;
  }
}
