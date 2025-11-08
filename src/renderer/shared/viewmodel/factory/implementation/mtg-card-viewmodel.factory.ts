import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService } from "../../../context";
import { LibraryCardDto, LibraryCardListDto, LibraryRulingDto } from "../../../dto";
import { LibraryCardViewmodel, LibraryCardListViewmodel, LibraryRulingViewmodel } from "../../mtg-card";
import { IMtgCardViewmodelFactory } from "../interface";

export class MtgCardViewmodelFactory implements IMtgCardViewmodelFactory {
  // #region Private fields ---------------------------------------------------
  private readonly colorService: IColorService;
  private readonly displayValueService: IDisplayValueService;
  private readonly languageService: ILanguageService;
  private readonly mtgSetService: IMtgSetService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService
  ) {
    this.colorService = colorService;
    this.displayValueService = displayValueService;
    this.languageService = languageService;
    this.mtgSetService = mtgSetService;
  }
  // #endregion

  // #region IMtgCardViewmodelFactory Members ---------------------------------
  public getMtgCardDetailViewmodel(dto: LibraryCardDto): LibraryCardViewmodel {
    return new LibraryCardViewmodel(this.colorService, this.displayValueService, this.languageService, this.mtgSetService, dto);
  }

  public getMtgCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel {
    return new LibraryCardListViewmodel(this.colorService, this.displayValueService, this.languageService, this.mtgSetService, dto);
  }

  public getRulingsViewmodel(dtos: Array<LibraryRulingDto>): Array<LibraryRulingViewmodel> {
    return dtos
      .map((dto: LibraryRulingDto) => new LibraryRulingViewmodel(dto))
      .sort((a: LibraryRulingViewmodel, b: LibraryRulingViewmodel) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }
  // #endregion
}
