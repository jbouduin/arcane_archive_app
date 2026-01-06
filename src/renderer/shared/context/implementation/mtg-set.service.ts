import { noop } from "lodash";
import { MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxyService } from "../interface";
import { IMtgSetService } from "../interface/mtg-set.service";

export class MtgSetService implements IMtgSetService {
  // #region Private fields ---------------------------------------------------
  private setMap: Map<number, MtgSetTreeDto>;
  private selectOptions: Array<SelectOption<MtgSetTreeDto>>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.setMap = new Map<number, MtgSetTreeDto>();
    this.selectOptions = new Array<SelectOption<MtgSetTreeDto>>();
  }
  // #endregion

  // #region IMtgSetService Members -------------------------------------------
  public get allSets(): Array<MtgSetTreeDto> {
    return Array.of(...this.setMap.values());
  }

  public getSelectOptions(): Array<SelectOption<MtgSetTreeDto>> {
    return Array.of(...this.setMap.values())
      .sort((a: MtgSetTreeDto, b: MtgSetTreeDto) => a.setName.localeCompare(b.setName))
      .map((set: MtgSetTreeDto) => ({ label: set.setName, value: set }));
  }

  public getSetById(id: number): MtgSetTreeDto | undefined {
    return this.setMap.get(id);
  }

  public async initialize(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<void> {
    return arcaneArchiveProxy.getData<Array<MtgSetTreeDto>>("library", "/public/mtg-set")
      .then(
        (data: Array<MtgSetTreeDto>) => {
          data.forEach((set: MtgSetTreeDto) => this.setMap.set(set.id, set));
          this.selectOptions.push(
            ...data.sort((a: MtgSetTreeDto, b: MtgSetTreeDto) => a.setName.localeCompare(b.setName))
              .map((set: MtgSetTreeDto) => ({ label: set.setName, value: set }))
          );
        },
        noop
      );
  }
  // #endregion
};
