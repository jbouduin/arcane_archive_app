import { CollectionCardDto, CollectionDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";
import { IIpcProxy } from "./ipc-proxy";
import { IOverlayService } from "./overlay.service";
import { ISessionService } from "./session.service";

export interface ICollectionService {
  //#region Service methods ---------------------------------------------------
  initialize(ipcProxy: IIpcProxy, arcaneArchiveProxy: IArcaneArchiveProxy): void;
  initializeSubscriptions(sessionService: ISessionService): void;
  //#endregion

  //#region Collection --------------------------------------------------------
  createCollection(collection: CollectionDto): Promise<CollectionDto>;
  deleteCollection(collectionId: number): Promise<number>;
  // TODO use CollectionDetailDto
  getCollectionDetails(collectionId: number): Promise<CollectionDto>;
  getCollections(): Promise<Array<CollectionDto>>;
  getRootCollection(): CollectionDto | null;
  getSelectOptions(): Array<SelectOption<CollectionDto>>;
  updateCollection(collection: CollectionDto): Promise<CollectionDto>;
  //#endregion

  //#region CollectionCard ----------------------------------------------------
  createCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto>;
  deleteCollectionCard(collectionCard: CollectionCardDto): Promise<number>;
  importCollectionData(overlayService: IOverlayService, cardConditions: Array<string>): Promise<void>;
  updateCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto>;
  //#endregion
}
