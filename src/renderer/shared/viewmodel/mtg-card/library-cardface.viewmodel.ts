import { ExternalReferenceDetailDto } from "../../dto";
import { CardfaceLanguageDetailDto } from "../../dto/cardface-language-detail.dto";
import { CardfaceDetailDto } from "../../dto/cardface-detail.dto";
import { AbstractCardViewmodel } from "../abstract-card.viewmodel";

export class LibraryCardfaceViewmodel extends AbstractCardViewmodel {
  // #region Fields Members ---------------------------------------------------
  public readonly id: number;
  public readonly artist: string;
  public readonly cmc: number;
  public readonly manaCost: Array<string>;
  public readonly oracleId: string;
  public readonly power: string;
  public readonly toughness: string;
  public readonly faceLanguageId: number;
  public readonly flavorText: string;
  public readonly printedName: string;
  public readonly printedTypeLine: string;
  public readonly printedText: string;
  public readonly imageUri: string | undefined;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: CardfaceDetailDto, language: string) {
    super();
    this.id = dto.id;
    this.artist = dto.artist;
    this.cmc = dto.cmc;
    this.manaCost = this.calculateCardManaCost([dto.manaCost]);
    this.oracleId = dto.oracleId;
    this.power = dto.power;
    this.toughness = dto.toughness;
    const faceLanguageDto = dto.cardfaceLanguages.find((fld: CardfaceLanguageDetailDto) => fld.language == language)!;
    this.faceLanguageId = faceLanguageDto.id;
    this.flavorText = faceLanguageDto.flavorText;
    this.printedName = faceLanguageDto.name;
    this.printedTypeLine = faceLanguageDto.typeLine;
    this.printedText = faceLanguageDto.text;
    /**
     * # LATER: large is not correct! size should come from preferences. To be corrected once the problem with
     * Aetherdrift emblems is solved. and we need to fall-back on another value if large is not there
     */
    this.imageUri = faceLanguageDto.externalReferences
      .find((extRef: ExternalReferenceDetailDto) => extRef.source == "SCRYFALL" && extRef.detail == "LARGE")
      ?.value;
  }
  // #endregion
}
