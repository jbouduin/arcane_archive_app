import { IArcaneArchiveProxy, IColorService, IDisplayValueService, ILanguageService, IMtgSetService, IServiceContainer } from "../../../context";
import { AdvancedCardSearchDto, LibraryCardDto, LibraryCardListDto, LibraryRulingDto } from "../../../dto";
import { AdvancedCardSearchViewmodel, LibraryCardListViewmodel, LibraryCardViewmodel, LibraryRulingViewmodel } from "../../mtg-card";
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
  public getLibraryCardDetailViewmodel(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    cardId: number
  ): Promise<LibraryCardViewmodel> {
    return arcaneArchiveProxy
      .getData<LibraryCardDto>("library", "/public/card/" + cardId)
      .then((dto: LibraryCardDto) => new LibraryCardViewmodel(
        this.colorService,
        this.displayValueService,
        this.languageService,
        this.mtgSetService, dto
      ));
  }

  public getMtgCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel {
    return new LibraryCardListViewmodel(
      this.colorService, this.displayValueService, this.languageService, this.mtgSetService, dto
    );
  }

  public getRulingsViewmodel(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    oracleId: string
  ): Promise<Array<LibraryRulingViewmodel>> {
    return arcaneArchiveProxy
      .getData<Array<LibraryRulingDto>>("library", "/public/ruling/" + oracleId)
      .then((dtos: Array<LibraryRulingDto>) => dtos
        .map((dto: LibraryRulingDto) => new LibraryRulingViewmodel(dto))
        .sort((a: LibraryRulingViewmodel, b: LibraryRulingViewmodel) =>
          b.publishedAtDate.getTime() - a.publishedAtDate.getTime()
        )
      );
  }

  public getAdvancedCardSearchViewmodel(
    advancedCardSearch: AdvancedCardSearchDto,
    serviceContainer: IServiceContainer
  ): AdvancedCardSearchViewmodel {
    return new AdvancedCardSearchViewmodel(advancedCardSearch, serviceContainer);
  }
  // #endregion
}
