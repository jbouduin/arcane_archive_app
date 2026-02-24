import { IBasicDataService, ICollectionService, IMtgSetService } from "../../../context";
import { CollectionCardListDto, LibraryCardListDto } from "../../../dto";
import { CollectionViewDto, LibraryViewDto } from "../../../dto/desktop";
import { CollectionViewViewmodel } from "../../desktop";
import { LibraryViewViewmodel } from "../../desktop/library-view.viewmodel";
import { IDesktopViewmodelFactory, SearchCallback } from "../interface";

export class DesktopViewmodelFactory implements IDesktopViewmodelFactory {
  // #region Private fields ---------------------------------------------------
  private readonly basicDataService: IBasicDataService;
  private readonly collectionService: ICollectionService;
  private readonly mtgSetService: IMtgSetService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    basicDataService: IBasicDataService, collectionService: ICollectionService, mtgSetService: IMtgSetService
  ) {
    this.basicDataService = basicDataService;
    this.collectionService = collectionService;
    this.mtgSetService = mtgSetService;
  }
  // #endregion

  //#region IDesktopViewmodelFactory Members ----------------------------------
  public getLibraryViewViewmodel(
    dto: LibraryViewDto,
    searchCallback: SearchCallback<LibraryCardListDto, LibraryViewDto>
  ): LibraryViewViewmodel {
    return new LibraryViewViewmodel(
      dto,
      false,
      this.basicDataService,
      this.collectionService,
      this.mtgSetService,
      searchCallback
    );
  }

  public getCollectionViewViewmodel(
    dto: CollectionViewDto,
    searchCallback: SearchCallback<CollectionCardListDto, CollectionViewDto>
  ): CollectionViewViewmodel {
    return new CollectionViewViewmodel(
      dto,
      true,
      this.basicDataService,
      this.collectionService,
      this.mtgSetService,
      searchCallback
    );
  }
  //#endregion
}
