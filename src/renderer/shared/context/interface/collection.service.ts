import { CollectionDto } from "../../dto";

export interface ICollectionService {
  createCollection(collection: CollectionDto): Promise<CollectionDto>;
  deleteCollection(collectionId: number): Promise<number>;
  updateCollection(collection: CollectionDto): Promise<CollectionDto>;
  // TODO use CollectionDetailDto
  getCollectionDetails(collectionId: number): Promise<CollectionDto>;
  getCollections(): Promise<Array<CollectionDto>>;
  // TODO use CollectionCardListDto
  getCollectionCards(collectionId: number): Promise<Array<unknown>>;
}
