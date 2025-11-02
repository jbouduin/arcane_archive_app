import { IDisplayValueService } from "../../../context";
import { MtgSetDto } from "../../../dto";
import { MtgSetTreeViewmodel } from "../../mtg-set/mtg-set-tree.viewmodel";
import { IMtgSetViewmodelFactory } from "../interface/mtg-set-viewmodel.factory";

export class MtgSetViewmodelFactory implements IMtgSetViewmodelFactory {
  // #region Private fields ---------------------------------------------------
  private _displayValueService: IDisplayValueService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(displayValueService: IDisplayValueService) {
    this._displayValueService = displayValueService;
  }
  // #endregion

  // #region IMtgSetViewmodelFactory Members ----------------------------------
  public getMtgSetTreeViewmodel(dto: MtgSetDto): MtgSetTreeViewmodel {
    return new MtgSetTreeViewmodel(dto);
  }

  public getGroupMtgSetTreeViewmodel(group: string): MtgSetTreeViewmodel {
    const dto: MtgSetDto = {
      id: 0,
      parentId: 0,
      baseSetSize: 0,
      totalSetSize: 0,
      block: null,
      foilOnly: false,
      foreignOnly: false,
      nonFoilOnly: false,
      onlineOnly: false,
      partialPreview: false,
      paperOnly: false,
      tokenSetCode: null,
      type: "CORE",
      keyruneCode: "default",
      releaseDate: new Date(),
      name: { ENGLISH: group },
      code: group,
      createdAt: new Date(),
      createdBy: "",
      modifiedAt: new Date(),
      modifiedBy: ""
    };
    return new MtgSetTreeViewmodel(dto);
  }
  // #endregion
}
