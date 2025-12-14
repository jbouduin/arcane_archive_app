import { container, Lifecycle } from "tsyringe";
import { API } from "../service.tokens";
import { MtgCollectionClient } from "./implementation/mtg-collection.client";
import { ScryfallClient } from "./implementation/scryfall.client";
import { IMtgCollectionClient, IScryfallClient } from "./interface";

export class ApiDi {
  public static register(): void {
    // #region Services -------------------------------------------------------
    container.register<IMtgCollectionClient>(API.ApiClient, { useClass: MtgCollectionClient });
    container.register<IScryfallClient>(API.ScryfallClient, { useClass: ScryfallClient }, { lifecycle: Lifecycle.Singleton });
    // #endregion
  }
}
