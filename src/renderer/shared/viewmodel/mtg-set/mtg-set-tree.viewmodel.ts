import { IBaseTreeNodeViewmodel } from "../../components/base/base-tree-view";
import { MtgSetDto } from "../../dto";

export class MtgSetTreeViewmodel implements IBaseTreeNodeViewmodel {
  // #region IBaseTreeNodeViewmodel Members -----------------------------------
  public isSelected: boolean;
  public isExpanded: boolean;
  // #endregion

  // #region MtgSet fields ----------------------------------------------------
  public readonly id: number;
  public readonly cardSetName: string;
  public readonly parentId: number | null;
  public readonly treeItemLabel: string;
  public readonly cardSetType: string;
  public readonly releaseDateIsoString: string;
  public readonly block: string | null;
  public readonly keyRuneCode: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: MtgSetDto) {
    this.id = dto.id;
    this.parentId = dto.parentId;
    this.cardSetName = dto.name["ENGLISH"] || dto.code;
    this.treeItemLabel = `${this.cardSetName} (${dto.baseSetSize})`;
    this.releaseDateIsoString = new Date(dto.releaseDate).toISOString();
    this.cardSetType = dto.type;
    this.block = dto.block;
    this.keyRuneCode = dto.keyruneCode;
    this.isSelected = false;
    this.isExpanded = false;
  }
  // #endregion
}
