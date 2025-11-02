import { ApiConfigurationDto } from "../../../../common/dto";
import { ResultDto } from "../../dto";
import { MtgSetDto } from "../../dto/mtg-set.dto";
import { IMtgSetService } from "../interface/mtg-set.service";

export class MtgSetService implements IMtgSetService {
  // #region Private fields ---------------------------------------------------
  private _allSets: Array<MtgSetDto>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._allSets = new Array<MtgSetDto>();
  }
  // #endregion

  // #region IMtgSetService Members -------------------------------------------
  public get allSets(): Array<MtgSetDto> {
    return this._allSets;
  }

  public async initialize(apiConfiguration: ApiConfigurationDto): Promise<void> {
    const response = await fetch(apiConfiguration.mtgCollectionApiRoot + "/mtg-set");
    const result: ResultDto<Array<MtgSetDto>> = await response.json();
    this._allSets = result.data;
  }
  // #endregion
};
