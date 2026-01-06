import { container, Lifecycle } from "tsyringe";
import { API } from "../service.tokens";
import { ArcaneArchiveClient } from "./implementation/arcane-archive.client";
import { ScryfallClient } from "./implementation/scryfall.client";
import { IArcaneArchiveClient, IScryfallClient } from "./interface";

export class ApiDi {
  public static register(): void {
    // #region Services -------------------------------------------------------
    container.register<IArcaneArchiveClient>(API.ArcaneArchiveClient, { useClass: ArcaneArchiveClient });
    container.register<IScryfallClient>(API.ScryfallClient, { useClass: ScryfallClient }, { lifecycle: Lifecycle.Singleton });
    // #endregion
  }
}
