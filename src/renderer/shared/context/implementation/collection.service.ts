import { noop } from "lodash";
import { ImportCollectionRequest } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { CollectionCardDto, CollectionDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy, ICollectionService, IIpcProxy, IOverlayService, ISessionService } from "../interface";

export class CollectionService implements ICollectionService {
  //#region Private fields ----------------------------------------------------
  private arcaneArchiveProxy!: IArcaneArchiveProxy;
  private ipcProxy!: IIpcProxy;
  private collections: Map<number, CollectionDto> | null;
  private rootCollection: CollectionDto | null;
  private selectOptions: Map<number, SelectOption<CollectionDto>> | null;
  private unsubscribeSession: (() => void) | null;
  // #endregion

  //#region Constructor & C° ---------------------------------------------------
  public constructor() {
    this.collections = null;
    this.selectOptions = null;
    this.rootCollection = null;
    this.unsubscribeSession = null;
  }
  //#endregion

  //#region ICollectionService Members - service methods ----------------------
  public initialize(ipcProxy: IIpcProxy, arcaneArchiveProxy: IArcaneArchiveProxy): void {
    this.ipcProxy = ipcProxy;
    this.arcaneArchiveProxy = arcaneArchiveProxy;
  }

  public initializeSubscriptions(sessionService: ISessionService): void {
    if (this.unsubscribeSession == null) {
      this.unsubscribeSession = sessionService.subscribeSessionChangeListener(
        () => {
          this.collections = null;
          this.selectOptions = null;
          this.rootCollection = null;
        }
      );
    }
  }
  //#endregion

  //#region ICollectionService Members - Collection ---------------------------
  public createCollection(collection: CollectionDto): Promise<CollectionDto> {
    return this.arcaneArchiveProxy
      .postData<Omit<CollectionDto, "id">, CollectionDto>(
        "collection",
        "/auth/collection",
        collection
      ).then((resp: CollectionDto) => {
        if (this.collections == null) {
          this.collections = new Map<number, CollectionDto>();
        }
        if (this.selectOptions == null) {
          this.selectOptions = new Map<number, SelectOption<CollectionDto>>();
        }
        this.collections.set(resp.id!, resp);
        this.selectOptions.set(resp.id!, { value: resp, label: resp.collectionName });
        return resp;
      });
  }

  public deleteCollection(collectionId: number): Promise<number> {
    return this.arcaneArchiveProxy
      .delete("collection", `/auth/collection/${collectionId}`)
      .then((resp: number) => {
        if (this.collections != null && this.collections.has(collectionId)) {
          this.collections.delete(collectionId);
        }
        if (this.selectOptions != null && this.selectOptions.has(collectionId)) {
          this.selectOptions.delete(collectionId);
        }
        return resp;
      });
  }

  public getCollectionById(collectionId: number): CollectionDto | undefined {
    const result: CollectionDto | undefined = this.collections != null
      ? this.collections.get(collectionId)
      : undefined;
    return result;
  }

  public getCollectionDetails(_collectionId: number): Promise<CollectionDto> {
    throw new Error("Not implemented");
  }

  public getCollections(): Array<CollectionDto> {
    const result: Array<CollectionDto> = this.collections != null
      ? new Array<CollectionDto>(...this.collections.values())
      : new Array<CollectionDto>();
    return result;
  }

  public getRootCollection(): CollectionDto | null {
    return this.rootCollection;
  }

  public getSelectOptions(): Array<SelectOption<CollectionDto>> {
    if (this.selectOptions != null) {
      return [...this.selectOptions.values()];
    } else {
      return new Array<SelectOption<CollectionDto>>();
    }
  }

  public loadCollections(): Promise<Array<CollectionDto>> {
    return this.arcaneArchiveProxy
      .getData<Array<CollectionDto>>("collection", "/auth/collection/all")
      .then((resp: Array<CollectionDto>) => {
        this.collections = new Map<number, CollectionDto>();
        this.selectOptions = new Map<number, SelectOption<CollectionDto>>();
        resp.forEach((c: CollectionDto) => {
          this.collections!.set(c.id!, c);
          this.selectOptions!.set(c.id!, { value: c, label: c.code });
          if (c.parentId == null) {
            this.rootCollection = c;
          }
        });
        return [...this.collections.values()];
      });
  }

  public updateCollection(collection: CollectionDto): Promise<CollectionDto> {
    return this.arcaneArchiveProxy
      .putData<CollectionDto, CollectionDto>(
        "collection",
        `/auth/collection/${collection.id}`,
        collection
      ).then((resp: CollectionDto) => {
        if (this.collections == null) {
          this.collections = new Map<number, CollectionDto>();
        }
        this.collections.set(resp.id!, resp);
        return resp;
      });
  }
  //#endregion

  //#region ICollectionService Members - Collection Card ----------------------
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

  public importCollectionData(overlayService: IOverlayService, cardConditions: Array<string>): Promise<void> {
    return overlayService.selectFile(this.ipcProxy, "collection-import")
      .then(
        (file: string | undefined) => {
          if (file) {
            overlayService.showSplashScreen("Importing data");
            const options: ImportCollectionRequest = {
              fileName: file,
              cardConditions: cardConditions
            };
            this.ipcProxy.postData<ImportCollectionRequest, object>(IpcPaths.IMPORT_COLLECTION_DATA, options)
              .then(
                () => overlayService.hideSplashSceen(),
                () => overlayService.hideSplashSceen()
              );
          }
        },
        noop
      );
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
