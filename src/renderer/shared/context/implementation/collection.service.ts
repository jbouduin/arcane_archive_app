import { CollectionCardDto, CollectionDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy, ICollectionService } from "../interface";

export class CollectionService implements ICollectionService {
  // #region Private fields ---------------------------------------------------
  private arcaneArchiveProxy!: IArcaneArchiveProxy;
  // #endregion

  // #region ICollectionService Members - service methods ---------------------
  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
  }
  //#endregion

  // #region ICollectionService Members - Collection --------------------------
  public createCollection(collection: CollectionDto): Promise<CollectionDto> {
    return this.arcaneArchiveProxy.postData<Omit<CollectionDto, "id">, CollectionDto>(
      "collection",
      "/auth/collection",
      collection
    );
  }

  public deleteCollection(collectionId: number): Promise<number> {
    return this.arcaneArchiveProxy.delete("collection", `/auth/collection/${collectionId}`);
  }

  public getCollections(): Promise<Array<CollectionDto>> {
    return this.arcaneArchiveProxy.getData<Array<CollectionDto>>("collection", "/auth/collection");
  }

  public getCollectionDetails(_collectionId: number): Promise<CollectionDto> {
    throw new Error("Not implemented");
  }

  public updateCollection(collection: CollectionDto): Promise<CollectionDto> {
    return this.arcaneArchiveProxy.putData<CollectionDto, CollectionDto>(
      "collection",
      `/auth/collection/${collection.id}`,
      collection);
  }
  //#endregion

  // #region ICollectionService Members - Collection Card ---------------------
  public createCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto> {
    return this.arcaneArchiveProxy.postData<CollectionCardDto, CollectionCardDto>(
      "collection",
      `/auth/collection/${collectionCard.collectionId}/card`,
      collectionCard
    );
  }

  public deleteCollectionCard(collectionCard: CollectionCardDto): Promise<number> {
    return this.arcaneArchiveProxy.delete(
      "collection",
      `/auth/collection/${collectionCard.collectionId}/card/${collectionCard.id}`
    );
  }

  public getCollectionCards(_collectionId: number): Promise<Array<unknown>> {
    throw new Error("Not implemented");
  }

  public updateCollectionCard(collectionCard: CollectionCardDto): Promise<CollectionCardDto> {
    return this.arcaneArchiveProxy.putData<CollectionCardDto, CollectionCardDto>(
      "collection",
      `/auth/collection/${collectionCard.collectionId}/card/${collectionCard.id}`,
      collectionCard
    );
  }
  // #endregion
}
