import { container, Lifecycle } from "tsyringe";
import { IRouter } from "../base";
import { INFRASTRUCTURE, LIBRARY } from "../service.tokens";
import { CardSymbolService } from "./implementation/card-symbol.service";
import { ICardImageService, ICardSymbolService } from "./interface";
import { CardSymbolRouter } from "./router";
import { CardImageService } from "./implementation/card-image.service";

export class LibraryDi {
  public static register(): void {
    // #region Services -------------------------------------------------------
    container.register<ICardImageService>(LIBRARY.CardImageService, { useClass: CardImageService });
    container.register<ICardSymbolService>(LIBRARY.CardSymbolService, { useClass: CardSymbolService });
    // #endregion

    // #region Routers --------------------------------------------------------
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: CardSymbolRouter }, { lifecycle: Lifecycle.Singleton });
    // #endregion
  }
}
