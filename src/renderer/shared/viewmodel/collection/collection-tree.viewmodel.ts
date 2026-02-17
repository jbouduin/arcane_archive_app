import { CollectionDto } from "../../dto";

export class CollectionTreeViewmodel {
  //#region Private fields ----------------------------------------------------
  private readonly _dto: CollectionDto;
  //#endregion

  // #region Getters/Setters ---------------------------------------------------
  public get id(): number {
    return this._dto.id!;
  }

  public get parentId(): number | null {
    return this._dto.parentId;
  }

  public get folder(): boolean {
    return this._dto.type == "FOLDER";
  }

  public get path(): string {
    return this._dto.code;
  }

  public get name(): string {
    return this._dto.collectionName;
  }

  public get dto(): CollectionDto {
    return this._dto;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: CollectionDto) {
    this._dto = dto;
  }
  // #endregion
}
