import { container, Lifecycle } from "tsyringe";
import { DatabaseService } from "./implementation/database.service";
import { ICardSymbolRepository, IDatabaseService } from "./interface";
import { DATABASE } from "../service.tokens";
import { CardSymbolRepository } from "./implementation/card-symbol.repository";

export class DatabaseDi {
  public static register(): void {
    // #region Services -------------------------------------------------------
    container.register<IDatabaseService>(DATABASE.DatabaseService, { useClass: DatabaseService }, { lifecycle: Lifecycle.Singleton });
    // #endregion

    // #region Repositories ---------------------------------------------------
    container.register<ICardSymbolRepository>(DATABASE.CardSymbolRepository, { useClass: CardSymbolRepository }, { lifecycle: Lifecycle.Singleton });
    // #endregion
  }
}
