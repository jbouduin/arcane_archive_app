import { noop } from "lodash";
import { CollectionDto, MtgSetDto, MtgSetTreeDto, SyncParamDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "../interface";
import { IMtgSetService } from "../interface/mtg-set.service";

export class MtgSetService implements IMtgSetService {
  // #region Private fields ---------------------------------------------------
  private arcaneArchiveProxy!: IArcaneArchiveProxy;
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

  public exportToExcel(id: number, collections: Array<CollectionDto>): void {
    const queryParameter = collections.map((c: CollectionDto) => c.id!);
    void this.arcaneArchiveProxy.downloadFile("library", `/auth/mtg-set/${id}/excel?collectionIds=${queryParameter}`);
  }

  public getSelectOptions(): Array<SelectOption<MtgSetTreeDto>> {
    return Array.of(...this.setMap.values())
      .sort((a: MtgSetTreeDto, b: MtgSetTreeDto) => a.setName.localeCompare(b.setName))
      .map((set: MtgSetTreeDto) => ({ label: set.setName, value: set }));
  }

  public getSetDetails(id: number): Promise<MtgSetDto> {
    return this.arcaneArchiveProxy.getData<MtgSetDto>("library", `/public/mtg-set/${id}`);
  }

  public getSetTreeDtoById(id: number): MtgSetTreeDto | undefined {
    return this.setMap.get(id);
  }

  public async initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void> {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
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

  public async synchronizeSet(setCode: string): Promise<void> {
    const postData: SyncParamDto = {
      tasks: [
        {
          target: "CARDS_OF_CARD_SET",
          subTarget: setCode,
          mode: "NORMAL",
          dumpData: true
        }
      ],
      allScryfallCatalogs: "SKIP",
      allCardSets: "SKIP"
    };
    void this.arcaneArchiveProxy.postData("library", "/admin/synchronization/partial", postData);
  }
  // #endregion
};
