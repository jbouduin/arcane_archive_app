import { LibraryRulingDto } from "../../dto";

export class LibraryRulingViewmodel {
  // #region Fields -----------------------------------------------------------
  public readonly source: string;
  public readonly publishedAtDate: Date;
  public readonly publishedAtString: string;
  public readonly rulingText: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: LibraryRulingDto) {
    this.source = dto.source;
    this.publishedAtDate = new Date(dto.publishedAt);
    this.publishedAtString = new Date(dto.publishedAt).toLocaleDateString(navigator.language, { day: "2-digit", month: "2-digit", year: "numeric" });
    this.rulingText = dto.rulingText;
  }
  // #endregion
}
