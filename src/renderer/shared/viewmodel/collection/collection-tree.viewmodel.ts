import { IBaseTreeNodeViewmodel } from "../../components/base/base-tree-view";
import { CollectionDto } from "../../dto";

export class CollectionTreeViewmodel implements IBaseTreeNodeViewmodel {
  private readonly _dto: CollectionDto;

  // #region IBaseTreeNodeViewmodel Members -----------------------------------
  public isSelected: boolean;
  public isExpanded: boolean;
  // #endregion

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
    this.isSelected = false;
    this.isExpanded = false;
  }
  // #endregion
}
