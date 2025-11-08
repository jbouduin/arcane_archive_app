import { LibraryRulingDto } from "../../dto";

export class LibraryRulingViewmodel {
  // #region Fields -----------------------------------------------------------
  public readonly source: string;
  public readonly publishedAt: Date;
  public readonly rulingText: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: LibraryRulingDto) {
    this.source = dto.source;
    this.publishedAt = new Date(dto.publishedAt);
    this.rulingText = dto.rulingText;
  }
  // #endregion
}
