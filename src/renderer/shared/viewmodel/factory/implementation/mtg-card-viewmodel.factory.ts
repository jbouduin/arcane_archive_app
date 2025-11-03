import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService } from "../../../context";
import { MtgLibraryCardListDto } from "../../../dto";
import { MtgLibraryCardListViewmodel } from "../../mtg-card/mtg-library-card-list.viewmodel";
import { IMtgCardViewmodelFactory } from "../interface";

export class MtgCardViewmodelFactory implements IMtgCardViewmodelFactory {
  private readonly colorService: IColorService;
  private readonly displayValueService: IDisplayValueService;
  private readonly languageService: ILanguageService;
  private readonly mtgSetService: IMtgSetService;

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

  public getMtgCardListViewmodel(dto: MtgLibraryCardListDto): MtgLibraryCardListViewmodel {
    return new MtgLibraryCardListViewmodel(this.colorService, this.displayValueService, this.languageService, this.mtgSetService, dto);
  }
}
