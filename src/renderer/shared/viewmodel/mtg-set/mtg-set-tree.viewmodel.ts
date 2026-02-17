import { MtgSetTreeDto } from "../../dto";

export class MtgSetTreeViewmodel {
  //#region Private fields ----------------------------------------------------
  private readonly _dto: MtgSetTreeDto;
  //#endregion

  // #region Getters ----------------------------------------------------------
  public get id(): number {
    return this._dto.id;
  }

  public get cardSetName(): string {
    return this._dto.setName;
  }

  public get parentId(): number | null {
    return this._dto.parentId;
  }

  public get treeItemLabel(): string {
    return `${this._dto.setName} (${this._dto.baseSetSize})`;
  }

  public get cardSetType(): string {
    return this._dto.type;
  }

  public get releaseDateIsoString(): string {
    return new Date(this._dto.releaseDate).toISOString();
  }

  public get block(): string | null {
    return this._dto.block;
  }

  public get keyRuneCode(): string {
    return this._dto.keyruneCode;
  }

  public get code(): string {
    return this._dto.code;
  }

  public get partialPreview(): boolean {
    return this._dto.partialPreview;
  }

  public get dto(): MtgSetTreeDto {
    return this._dto;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: MtgSetTreeDto) {
    this._dto = dto;
  }
  // #endregion
}
