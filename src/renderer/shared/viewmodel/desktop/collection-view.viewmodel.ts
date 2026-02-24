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
}
