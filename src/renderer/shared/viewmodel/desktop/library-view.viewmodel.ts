import { SetTreeSettingsDto } from "../../../../common/dto";
import { IBasicDataService, ICollectionService, IMtgSetService } from "../../context";
import { LibraryCardListDto } from "../../dto";
import { LibraryViewDto } from "../../dto/desktop";
import { SearchCallback } from "../factory/interface";
import { MtgSetTreeConfigurationViewmodel } from "../mtg-set";
import { BaseDesktopViewViewmodel } from "./base-desktop-view.viewmodel";

export class LibraryViewViewmodel extends BaseDesktopViewViewmodel<LibraryCardListDto, LibraryViewDto> {
  //#region Private fields ----------------------------------------------------
  private readonly _treeConfiguration: MtgSetTreeConfigurationViewmodel;
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get treeConfiguration(): MtgSetTreeConfigurationViewmodel {
    return this._treeConfiguration;
  }
  //#endregion

  //#region BaseViewmodel Overrides -------------------------------------------
  public override get dtoToSave(): LibraryViewDto {
    const treeConfig: SetTreeSettingsDto = {
      cardSetSort: this._treeConfiguration.cardSetSort,
      cardSetGroupBy: this._treeConfiguration.cardSetGroupBy,
      cardSetTypeFilter: new Array<string>(...this._treeConfiguration.cardSetTypeFilter)
    };

    return {
      ...this.baseDesktopDtoSnapshot,
      treeConfiguration: treeConfig
    };
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    dto: LibraryViewDto,
    useCollections: boolean,
    basicDataService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService,
    searchCallback: SearchCallback<LibraryCardListDto, LibraryViewDto>
  ) {
    super(dto, useCollections, basicDataService, collectionService, mtgSetService, searchCallback);
    this._treeConfiguration = new MtgSetTreeConfigurationViewmodel(dto.treeConfiguration);
  }
  //#endregion
}
