import { CollectionCardDto, CollectionDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";
import { ISessionService } from "./session.service";

export interface ICollectionService {
  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void;
  initializeSubscriptions(sessionService: ISessionService): void;
  //#endregion

  //#region Collection --------------------------------------------------------
  createCollection(collection: CollectionDto): Promise<CollectionDto>;
  deleteCollection(collectionId: number): Promise<number>;
  // TODO use CollectionDetailDto
  getCollections(): Promise<Array<CollectionDto>>;
  getCollectionDetails(collectionId: number): Promise<CollectionDto>;
  getSelectOptions(): Array<SelectOption<CollectionDto>>;
  updateCollection(collection: CollectionDto): Promise<CollectionDto>;
  //#endregion

  //#region CollectionCard ----------------------------------------------------
  createCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto>;
  deleteCollectionCard(collectionCard: CollectionCardDto): Promise<number>;
  updateCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto>;
  //#endregion
}
