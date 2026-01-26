import { CollectionCardDto, CollectionDto } from "../../dto";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ICollectionService {
  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void;
  //#endregion

  //#region Collection --------------------------------------------------------
  createCollection(collection: CollectionDto): Promise<CollectionDto>;
  deleteCollection(collectionId: number): Promise<number>;
  // TODO use CollectionDetailDto
  getCollections(): Promise<Array<CollectionDto>>;
  getCollectionDetails(collectionId: number): Promise<CollectionDto>;
  updateCollection(collection: CollectionDto): Promise<CollectionDto>;
  //#endregion

  //#region CollectionCard ----------------------------------------------------
  createCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto>;
  deleteCollectionCard(collectionCard: CollectionCardDto): Promise<number>;
  // TODO use CollectionCardListDto
  getCollectionCards(collectionId: number): Promise<Array<unknown>>;
  updateCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto>;
  //#endregion
}
