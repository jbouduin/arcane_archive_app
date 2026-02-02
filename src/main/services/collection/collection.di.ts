import { container } from "tsyringe";
import { IRouter } from "../base";
import { COLLECTION, INFRASTRUCTURE } from "../service.tokens";
import { CollectionService } from "./implementation/collection.service";
import { ICollectionService } from "./interface";
import { CollectionRouter } from "./router";

export class CollectionDi {
  public static register(): void {
    //#region Services --------------------------------------------------------
    container.register<ICollectionService>(COLLECTION.CollectionService, { useClass: CollectionService });
    //#endregion

    //#region Routers ---------------------------------------------------------
    container.register<IRouter>(INFRASTRUCTURE.Router, { useClass: CollectionRouter });
    //#endregion
  }
}
