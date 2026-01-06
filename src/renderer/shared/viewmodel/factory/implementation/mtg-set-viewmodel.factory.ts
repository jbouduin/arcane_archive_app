import { IDisplayValueService, ILanguageService } from "../../../context";
import { MtgSetDto, MtgSetTreeDto } from "../../../dto";
import { MtgSetDetailViewmodel, MtgSetTreeViewmodel } from "../../mtg-set";
import { IMtgSetViewmodelFactory } from "../interface";

export class MtgSetViewmodelFactory implements IMtgSetViewmodelFactory {
  // #region Private fields ---------------------------------------------------
  private readonly displayValueService: IDisplayValueService;
  private readonly languageService: ILanguageService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(displayValueService: IDisplayValueService, languageService: ILanguageService) {
    this.displayValueService = displayValueService;
    this.languageService = languageService;
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
    return new MtgSetDetailViewmodel(this.displayValueService, this.languageService, dto);
  }
  // #endregion
}
