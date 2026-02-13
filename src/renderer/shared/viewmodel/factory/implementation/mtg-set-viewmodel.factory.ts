import { IBasicDataService } from "../../../context";
import { CollectionDto, MtgSetDto, MtgSetTreeDto } from "../../../dto";
import { CardConditionDto } from "../../../dto/card-condition.dto";
import { SelectOption } from "../../../types";
import { ExportSetViewmodel, MtgSetDetailViewmodel, MtgSetTreeViewmodel } from "../../mtg-set";
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
  public getExportSetViewmodel(
    dto: MtgSetDto,
    cardConditions: Array<string>,
    allCollections: Array<SelectOption<CollectionDto>>
  ): ExportSetViewmodel {
    return new ExportSetViewmodel(
      dto,
      this.basicDataService
        .getCardConditionSelectOptions()
        .filter((so: SelectOption<CardConditionDto>) => cardConditions.includes(so.value.condition)),
      allCollections,
      this.basicDataService.getLanguageSelectOptions());
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

  public getMtgSetTreeViewmodel(dto: MtgSetTreeDto): MtgSetTreeViewmodel {
    return new MtgSetTreeViewmodel(dto);
  }
  // #endregion
}
