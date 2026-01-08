import { CollectionDto } from "../../dto";
import { ICollectionService } from "../interface/collection.service";
import { ArcaneArchiveProxyService } from "./arcane-archive-proxy.service";

const auditfields = {
  createdAt: new Date(),
  createdBy: "me",
  modifiedAt: new Date(),
  modifiedBy: "me"
};
const mockCollections: Array<CollectionDto> = [
  { id: 1, code: "main collection", folder: true, name: {}, parentId: null, ...auditfields },
  { id: 2, code: "box 1", folder: false, name: {}, parentId: 1, ...auditfields },
  { id: 3, code: "box 2", folder: false, name: {}, parentId: 1, ...auditfields },
  { id: 4, code: "foil collection", folder: false, name: {}, parentId: null, ...auditfields },
  { id: 5, code: "to sell", folder: true, name: {}, parentId: null, ...auditfields },
  { id: 6, code: "English", folder: true, name: {}, parentId: 5, ...auditfields },
  { id: 7, code: "non-foil", folder: false, name: {}, parentId: 6, ...auditfields },
  { id: 8, code: "foil", folder: false, name: {}, parentId: 6, ...auditfields },
  { id: 9, code: "Non English", folder: true, name: {}, parentId: 5, ...auditfields },
  { id: 10, code: "non-foil", folder: false, name: {}, parentId: 9, ...auditfields },
  { id: 11, code: "foil", folder: false, name: {}, parentId: 9, ...auditfields },
  { id: 12, code: "empty folder", folder: true, name: {}, parentId: null, ...auditfields },
  { id: 14, code: "folder with long name", folder: true, name: {}, parentId: 9, ...auditfields },
  { id: 15, code: "collection with long name in folder with long name", folder: false, name: {}, parentId: 14, ...auditfields },
];

export class CollectionService implements ICollectionService {
  // #region Private fields ---------------------------------------------------
  private _arcaneArchiveProxy!: ArcaneArchiveProxyService;
  // #endregion

  private idCounter = 100;
  // #region ICollectionService Members -------------------------------------------
  public createCollection(collection: CollectionDto): Promise<CollectionDto> {
    // TODO implement
    collection.id = this.idCounter++;
    return Promise.resolve(collection);
  }

  public deleteCollection(_collectionId: number): Promise<number> {
    // TODO implement
    return Promise.resolve(1);
  }

  public updateCollection(collection: CollectionDto): Promise<CollectionDto> {
    return Promise.resolve(collection);
  }

  public getCollectionDetails(_collectionId: number): Promise<CollectionDto> {
    throw new Error("Not implemented");
  }

  public getCollections(): Promise<Array<CollectionDto>> {
    return Promise.resolve(mockCollections);
  }

  public getCollectionCards(_collectionId: number): Promise<Array<unknown>> {
    throw new Error("Not implemented");
  }

  public initialize(arcaneArchiveProxy: ArcaneArchiveProxyService): void {
    this._arcaneArchiveProxy = arcaneArchiveProxy;
  }
  // #endregion
}
