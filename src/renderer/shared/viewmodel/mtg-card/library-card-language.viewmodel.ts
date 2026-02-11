import { ScryFallImageStatus } from "../../../../common/enums";
import { CardDetailDto } from "../../dto";
import { CardLanguageDetailDto } from "../../dto/card-language-detail.dto";
import { CardfaceDetailDto } from "../../dto/cardface-detail.dto";
import { LibraryCardfaceViewmodel } from "./library-cardface.viewmodel";

export class LibraryCardLanguageViewmodel {
  // #region Fields -----------------------------------------------------------
  public readonly cardLanguageId: number;
  public readonly imageStatus: ScryFallImageStatus;
  public readonly cardfaces: Map<number, LibraryCardfaceViewmodel>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: CardDetailDto, language: string) {
    const cardLanguage = dto.cardLanguages.find(
      (cardLanguageDto: CardLanguageDetailDto) => cardLanguageDto.language == language
    )!;
    this.cardLanguageId = cardLanguage.id;
    this.imageStatus = cardLanguage.imageStatus;
    this.cardfaces = this.createCardFaceviewmodels(dto, language);
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private createCardFaceviewmodels(dto: CardDetailDto, language: string): Map<number, LibraryCardfaceViewmodel> {
    const result = new Map<number, LibraryCardfaceViewmodel>();
    dto.cardfaces
      .forEach((faceDto: CardfaceDetailDto) => {
        const cardFaceViewmodel = new LibraryCardfaceViewmodel(faceDto, language);
        result.set(faceDto.sequence, cardFaceViewmodel);
      });
    return result;
  }
  // #endregion
}
