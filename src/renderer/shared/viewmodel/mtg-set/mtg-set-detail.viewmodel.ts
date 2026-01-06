import { IDisplayValueService, ILanguageService } from "../../context";
import { LanguageDto, MtgSetDto } from "../../dto";
import { IAuditFieldsViewmodel } from "../audit-fields.viewmodel";
import { BaseViewmodel } from "../base.viewmodel";

export class MtgSetDetailViewmodel extends BaseViewmodel<MtgSetDto> implements IAuditFieldsViewmodel {
  // #region Private fields ---------------------------------------------------
  private readonly sortedLanguages: Array<LanguageDto>;
  private readonly _name: Map<string, string>;
  private readonly _setType: string;
  // #endregion

  // #region Readonly Members -------------------------------------------------
  public get id(): number {
    return this._dto.id;
  }

  public get code(): string {
    return this._dto.code;
  }

  public get baseSetSize(): number {
    return this._dto.baseSetSize;
  }

  public get totalSetSize(): number {
    return this._dto.totalSetSize;
  }

  public get block(): string | null {
    return this._dto.block;
  }

  public get foilOnly(): boolean {
    return this._dto.foilOnly;
  }

  public get foreignOnly(): boolean {
    return this._dto.foreignOnly;
  }

  public get nonFoilOnly(): boolean {
    return this._dto.nonFoilOnly;
  }

  public get onlineOnly(): boolean {
    return this._dto.onlineOnly;
  }

  public get partialPreview(): boolean {
    return this._dto.partialPreview;
  }

  public get paperOnly(): boolean {
    return this._dto.paperOnly;
  }

  public get tokenSetCode(): string | null {
    return this._dto.tokenSetCode;
  }

  public get type(): string {
    return this._setType;
  }

  public get keyruneCode(): string {
    return this._dto.keyruneCode;
  }

  public get releaseDate(): Date {
    return new Date(this.dto.releaseDate);
  }

  public get setName(): string {
    return this._dto.setName;
  }

  public get createdAt(): Date {
    return new Date(this.dto.createdAt);
  }

  public get createdBy(): string {
    return this._dto.createdBy;
  }

  public get modifiedAt(): Date {
    return new Date(this.dto.modifiedAt);
  }

  public get modifiedBy(): string {
    return this._dto.modifiedBy;
  }

  public get languages(): Array<LanguageDto> {
    return this.sortedLanguages;
  }

  public get name(): Map<string, string> {
    return this._name;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(displayValueService: IDisplayValueService, languageService: ILanguageService, setDto: MtgSetDto) {
    super(setDto);
    this.sortedLanguages = setDto.languages
      .map((lng: string) => languageService.getLanguage(lng))
      .filter((lng: LanguageDto | undefined) => lng != undefined)
      .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence);
    this._name = new Map<string, string>(Object.entries(setDto.name));
    this._setType = displayValueService.getDisplayValue("setType", setDto.type) ?? setDto.type;
  }
}
