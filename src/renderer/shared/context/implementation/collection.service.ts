import { CollectionDto } from "../../dto";
import { IArcaneArchiveProxyService } from "../interface";
import { ICollectionService } from "../interface/collection.service";

export class CollectionService implements ICollectionService {
  // #region Private fields ---------------------------------------------------
  private arcaneArchiveProxy!: IArcaneArchiveProxyService;
  // #endregion

  private idCounter = 100;
  // #region ICollectionService Members -------------------------------------------
  public createCollection(collection: CollectionDto): Promise<CollectionDto> {
    return this.arcaneArchiveProxy.postData<Omit<CollectionDto, "id">, CollectionDto>(
      "collection",
      "/app/collection",
      collection
    );
  }

  public deleteCollection(collectionId: number): Promise<number> {
    return this.arcaneArchiveProxy.delete("collection", `/app/collection/${collectionId}`);
  }

  public updateCollection(collection: CollectionDto): Promise<CollectionDto> {
    return this.arcaneArchiveProxy.putData<CollectionDto, CollectionDto>(
      "collection",
      `/app/collection/${collection.id}`,
      collection);
  }

  public getCollectionDetails(_collectionId: number): Promise<CollectionDto> {
    throw new Error("Not implemented");
  }

  public getCollections(): Promise<Array<CollectionDto>> {
    return this.arcaneArchiveProxy.getData<Array<CollectionDto>>("collection", "/app/collection");
  }

  public getCollectionCards(_collectionId: number): Promise<Array<unknown>> {
    throw new Error("Not implemented");
  }

  public initialize(arcaneArchiveProxy: IArcaneArchiveProxyService): void {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
  }
  // #endregion
}
