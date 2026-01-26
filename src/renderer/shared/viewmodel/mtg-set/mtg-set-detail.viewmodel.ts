import { IDisplayValueService, ILanguageService } from "../../context";
import { LanguageDto, MtgSetDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";

/**
 * SetDetailViewmodel, implemented as BaseViewmodel because it is used in a dialog
 */
export class MtgSetDetailViewmodel extends BaseViewmodel<MtgSetDto> {
  // #region Private fields ---------------------------------------------------
  private readonly sortedLanguages: Array<LanguageDto>;
  private readonly _name: Map<string, string>;
  private readonly _setType: string;
  // #endregion

  // #region Readonly Members -------------------------------------------------
  public get type(): string {
    return this._setType;
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
  //#endregion
}
