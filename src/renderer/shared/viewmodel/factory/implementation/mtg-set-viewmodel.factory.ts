import { IBasicDataService } from "../../../context";
import { MtgSetDto, MtgSetTreeDto } from "../../../dto";
import { MtgSetDetailViewmodel, MtgSetTreeViewmodel } from "../../mtg-set";
import { IMtgSetViewmodelFactory } from "../interface";

export class MtgSetViewmodelFactory implements IMtgSetViewmodelFactory {
  // #region Private fields ---------------------------------------------------
  private readonly basicDataService: IBasicDataService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(basicDataService: IBasicDataService) {
    this.basicDataService = basicDataService;
  }
  // #endregion

  // #region IMtgSetViewmodelFactory Members ----------------------------------
  public getMtgSetTreeViewmodel(dto: MtgSetTreeDto): MtgSetTreeViewmodel {
    return new MtgSetTreeViewmodel(dto);
  }

  public getGroupMtgSetTreeViewmodel(group: string): MtgSetTreeViewmodel {
    const dto: MtgSetTreeDto = {
      id: 0,
      parentId: 0,
      baseSetSize: 0,
      block: null,
      partialPreview: false,
      type: "CORE",
      keyruneCode: "default",
      releaseDate: new Date(),
      setName: group,
      code: group,
      tokenSetCode: null
    };
    return new MtgSetTreeViewmodel(dto);
  }

  public getMtgSetDetailViewmodel(dto: MtgSetDto): MtgSetDetailViewmodel {
    return new MtgSetDetailViewmodel(this.basicDataService, dto);
  }
  // #endregion
}
