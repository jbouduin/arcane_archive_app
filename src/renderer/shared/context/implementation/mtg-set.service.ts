import { noop } from "lodash";
import { MtgSetDto } from "../../dto/mtg-set.dto";
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
  public get allSets(): Readonly<Array<MtgSetDto>> {
    return Array.of(...this.setMap.values());
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
