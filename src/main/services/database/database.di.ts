import { container, Lifecycle } from "tsyringe";
import { DATABASE } from "../service.tokens";
import { CardSymbolRepository } from "./implementation/card-symbol.repository";
import { CardfaceRepository } from "./implementation/cardface.repository";
import { DatabaseService } from "./implementation/database.service";
import { ICardfaceRepository, ICardSymbolRepository, IDatabaseService } from "./interface";

export class DatabaseDi {
  public static register(): void {
    // #region Services -------------------------------------------------------
    container.register<IDatabaseService>(
      DATABASE.DatabaseService,
      { useClass: DatabaseService },
      { lifecycle: Lifecycle.Singleton }
    );
    // #endregion

    // #region Repositories ---------------------------------------------------
    container.register<ICardfaceRepository>(
      DATABASE.CardfaceRepository,
      { useClass: CardfaceRepository },
      { lifecycle: Lifecycle.Singleton }
    );
    container.register<ICardSymbolRepository>(
      DATABASE.CardSymbolRepository,
      { useClass: CardSymbolRepository },
      { lifecycle: Lifecycle.Singleton }
    );
    // #endregion
  }
}
