import { IBasicDataService, ICollectionService, IMtgSetService } from "../../context";
import { CollectionCardListDto } from "../../dto";
import { CollectionViewDto } from "../../dto/desktop";
import { SearchCallback } from "../factory/interface";
import { BaseDesktopViewViewmodel } from "./base-desktop-view.viewmodel";

export class CollectionViewViewmodel extends BaseDesktopViewViewmodel<CollectionCardListDto, CollectionViewDto> {
  //#region BaseViewmodel Overrides -------------------------------------------
  public override get dtoToSave(): CollectionViewDto {
    return {
      ...this.baseDesktopDtoSnapshot,
      selectedCollection: this._dto.selectedCollection
    };
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    dto: CollectionViewDto,
    useCollections: boolean,
    basicDataService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService,
    searchCallback: SearchCallback<CollectionCardListDto, CollectionViewDto>
  ) {
    super(dto, useCollections, basicDataService, collectionService, mtgSetService, searchCallback);
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  /**
   * Update a {@link CollectionCardListDto} with the new total quantity and bump the table version.
   *
   * If the total quantity did not change, nothing happens.
   *
   * @param cardLanguageId the card language id
   * @param collectionId   the collection id
   * @param totalQuantity  the new total quantity
   */
  public updateCollectionCardQuantity(cardLanguageId: number, collectionId: number, totalQuantity: number): void {
    const changedOne: CollectionCardListDto | undefined =
      this._dto.queryResult.resultList
        .find((ccl: CollectionCardListDto) =>
          ccl.id == cardLanguageId && ccl.collectionId == collectionId);
    if (changedOne != null && changedOne.quantity != totalQuantity) {
      changedOne.quantity = totalQuantity;
      this.bumpTableVersion();
    }
  }
  //#endregion
}
