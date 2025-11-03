import { ApiConfigurationDto } from "../../../../common/dto";
import { ResultDto } from "../../../../common/dto/mtg-collection";
import { MtgSetDto } from "../../dto/mtg-set.dto";
import { IMtgSetService } from "../interface/mtg-set.service";

export class MtgSetService implements IMtgSetService {
  // #region Private fields ---------------------------------------------------
  private setMap: Map<number, MtgSetDto>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.setMap = new Map<number, MtgSetDto>();
  }
  // #endregion

  // #region IMtgSetService Members -------------------------------------------
  public get allSets(): Readonly<Array<MtgSetDto>> {
    return Array.of(...this.setMap.values());
  }

  public getSetById(id: number): MtgSetDto | undefined {
    return this.setMap.get(id);
  }

  public async initialize(apiConfiguration: ApiConfigurationDto): Promise<void> {
    const response = await fetch(apiConfiguration.mtgCollectionApiRoot + "/mtg-set");
    const result: ResultDto<Array<MtgSetDto>> = await response.json();
    result.data.forEach((set: MtgSetDto) => this.setMap.set(set.id, set));
  }
  // #endregion
};
