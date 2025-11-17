import { noop } from "lodash";
import { MtgSetDto } from "../../dto/mtg-set.dto";
import { SelectOption } from "../../types";
import { ICollectionManagerProxyService } from "../interface";
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
  public get allSets(): Array<MtgSetDto> {
    return Array.of(...this.setMap.values());
  }

  public getSelectOptions(): Array<SelectOption<MtgSetDto>> {
    return Array.of(...this.setMap.values())
      .sort((a: MtgSetDto, b: MtgSetDto) => a.name["ENGLISH"].localeCompare(b.name["ENGLISH"]))
      .map((set: MtgSetDto) => ({ label: set.name["ENGLISH"], value: set }));
  }

  public getSetById(id: number): MtgSetDto | undefined {
    return this.setMap.get(id);
  }

  public async initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void> {
    return collectionManagerProxy.getData<Array<MtgSetDto>>("/mtg-set")
      .then(
        (data: Array<MtgSetDto>) => data.forEach((set: MtgSetDto) => this.setMap.set(set.id, set)),
        noop
      );
  }
  // #endregion
};
