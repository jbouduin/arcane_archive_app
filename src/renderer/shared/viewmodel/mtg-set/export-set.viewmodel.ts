import { ExportSetRequest } from "../../../../common/dto";
import { CollectionDto, LanguageDto, MtgSetDto } from "../../dto";
import { CardConditionDto } from "../../dto/card-condition.dto";
import { SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class ExportSetViewmodel extends BaseViewmodel<ExportSetRequest> {
  //#region Public properties -------------------------------------------------
  public readonly allCardConditions: Array<SelectOption<CardConditionDto>>;
  public readonly allLanguages: Array<SelectOption<LanguageDto>>;
  public readonly allCollections: Array<SelectOption<CollectionDto>>;
  //#endregion

  //#region Overrides ---------------------------------------------------------
  /**
   * Override the `hasChanges` getter, because the user does not have to change anything
   * in order to launch the export
   */
  override get hasChanges(): boolean {
    return true;
  }
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get openFile(): boolean {
    return this._dto.openFile;
  }

  public set openFile(value: boolean) {
    this._dto.openFile = value;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    set: MtgSetDto,
    allCardConditions: Array<SelectOption<CardConditionDto>>,
    allCollections: Array<SelectOption<CollectionDto>>,
    allLanguages: Array<SelectOption<LanguageDto>>
  ) {
    super({
      cardConditions: allCardConditions.map((so: SelectOption<CardConditionDto>) => so.value.condition),
      collectionIds: allCollections.map((c: SelectOption<CollectionDto>) => c.value.id!),
      fileName: "",
      languages: set.languages,
      setId: set.id!,
      openFile: true
    });
    this.allCardConditions = allCardConditions;
    this.allCollections = allCollections;
    this.allLanguages = allLanguages
      .filter((so: SelectOption<LanguageDto>) => set.languages.includes(so.value.language));
    // --- validations ---
    this.registerValidation("languages", () => this.validateLanguages());
    this.registerValidation("collectionIds", () => this.validateCollections());
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  private validateLanguages(): void {
    if (this._dto.languages.length == 0) {
      this.setFieldInvalid(
        "languages",
        { intent: "danger", helperText: "You have to select at least one language" }
      );
    } else {
      this.setFieldValid("languages");
    }
  }

  private validateCollections(): void {
    if (this._dto.collectionIds.length == 0) {
      this.setFieldInvalid(
        "collectionIds",
        { intent: "danger", helperText: "You have to select at least one collection" }
      );
    } else {
      this.setFieldValid("collectionIds");
    }
  }
  //#endregion
}
