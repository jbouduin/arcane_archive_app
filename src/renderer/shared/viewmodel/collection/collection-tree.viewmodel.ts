import { IBaseTreeNodeViewmodel } from "../../components/base/base-tree-view";
import { CollectionDto } from "../../dto";

export class CollectionTreeViewmodel implements IBaseTreeNodeViewmodel {
  private readonly _dto: CollectionDto;
  private readonly _path: Array<string>;

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

  public get code(): string {
    return this._dto.code;
  }

  public get folder(): boolean {
    return this._dto.type == "FOLDER";
  }

  public get dto(): CollectionDto {
    return this._dto;
  }

  public get path(): Array<string> {
    return this._path;
  }

  public set path(value: Array<string>) {
    this._path.push(...value);
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: CollectionDto) {
    this._dto = dto;
    this.isSelected = false;
    this.isExpanded = false;
    this._path = new Array<string>();
  }
  // #endregion
}
