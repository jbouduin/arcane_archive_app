import { ScryFallImageStatus } from "../../../../common/enums";
import { LibraryCardDto } from "../../dto";
import { LibraryCardLanguageDto } from "../../dto/library-card-language.dto";
import { LibraryCardfaceDto } from "../../dto/library-cardface.dto";
import { LibraryCardfaceViewmodel } from "./library-cardface.viewmodel";

export class LibraryCardLanguageViewmodel {
  // #region Fields -----------------------------------------------------------
  public readonly cardLanguageId: number;
  public readonly imageStatus: ScryFallImageStatus;
  public readonly cardfaces: Map<number, LibraryCardfaceViewmodel>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: LibraryCardDto, language: string) {
    const cardLanguage = dto.cardLanguages.find(
      (cardLanguageDto: LibraryCardLanguageDto) => cardLanguageDto.language == language
    )!;
    this.cardLanguageId = cardLanguage.id;
    this.imageStatus = cardLanguage.imageStatus;
    this.cardfaces = this.createCardFaceviewmodels(dto, language);
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private createCardFaceviewmodels(dto: LibraryCardDto, language: string): Map<number, LibraryCardfaceViewmodel> {
    const result = new Map<number, LibraryCardfaceViewmodel>();
    dto.cardfaces
      .forEach((faceDto: LibraryCardfaceDto) => {
        const cardFaceViewmodel = new LibraryCardfaceViewmodel(faceDto, language);
        result.set(faceDto.sequence, cardFaceViewmodel);
      });
    return result;
  }
  // #endregion
}
