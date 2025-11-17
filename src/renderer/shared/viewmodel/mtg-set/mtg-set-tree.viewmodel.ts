import { IBaseTreeNodeViewmodel } from "../../components/base/base-tree-view";
import { MtgSetDto } from "../../dto";

export class MtgSetTreeViewmodel implements IBaseTreeNodeViewmodel {
  private readonly _dto: MtgSetDto;

  // #region IBaseTreeNodeViewmodel Members -----------------------------------
  public isSelected: boolean;
  public isExpanded: boolean;
  // #endregion

  // #region Getters ----------------------------------------------------------
  public get id(): number {
    return this._dto.id;
  }

  public get cardSetName(): string {
    return this._dto.name["ENGLISH"] || this._dto.code;
  }

  public get parentId(): number | null {
    return this._dto.parentId;
  }

  public get treeItemLabel(): string {
    return `${this.cardSetName} (${this._dto.baseSetSize})`;
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

  public get dto(): MtgSetDto {
    return this._dto;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: MtgSetDto) {
    this._dto = dto;
    this.isSelected = false;
    this.isExpanded = false;
  }
  // #endregion
}
