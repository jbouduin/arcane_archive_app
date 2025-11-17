import { ColorDto, MtgSetDto } from "../../dto";
import { CardSearchDto } from "../../dto/card-search.dto";
import { ColorType, SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class CardSearchViewmodel extends BaseViewmodel<CardSearchDto> {
  // #region Private fields ---------------------------------------------------
  private _selectedAbilities: Array<SelectOption<string>>;
  private _selectedActions: Array<SelectOption<string>>;
  private _selectedCardColors: Array<ColorDto>;
  private _selectedCardNames: Array<SelectOption<string>>;
  private _selectedIdentityColors: Array<ColorDto>;
  private _selectedGameFormats: Array<SelectOption<string>>;
  private _selectedPowers: Array<SelectOption<string>>;
  private _selectedProducedManaColors: Array<ColorDto>;
  private _selectedRarities: Array<SelectOption<string>>;
  private _selectedSets: Array<MtgSetDto>;
  private _selectedSubTypes: Array<SelectOption<string>>;
  private _selectedSuperTypes: Array<SelectOption<string>>;
  private _selectedToughnesses: Array<SelectOption<string>>;
  private _selectedTypes: Array<SelectOption<string>>;
  // #endregion

  // #region Getters - Setters --------------------------------------------------
  public get selectedAbilities(): Array<SelectOption<string>> {
    return this._selectedAbilities;
  }

  public get selectedActions(): Array<SelectOption<string>> {
    return this._selectedActions;
  }

  public get selectedCardColors(): Array<ColorDto> {
    return this._selectedCardColors;
  }

  public get selectedCardNames(): Array<SelectOption<string>> {
    return this._selectedCardNames;
  }

  public get selectedIdentityColors(): Array<ColorDto> {
    return this._selectedIdentityColors;
  }

  public get selectedProducedManaColors(): Array<ColorDto> {
    return this._selectedProducedManaColors;
  }

  public get selectedGameFormats(): Array<SelectOption<string>> {
    return this._selectedGameFormats;
  }

  public get selectedPowers(): Array<SelectOption<string>> {
    return this._selectedPowers;
  }

  public get selectedRarities(): Array<SelectOption<string>> {
    return this._selectedRarities;
  }

  public get selectedSets(): Array<MtgSetDto> {
    return this._selectedSets;
  }

  public get selectedSubTypes(): Array<SelectOption<string>> {
    return this._selectedSubTypes;
  }

  public get selectedSuperTypes(): Array<SelectOption<string>> {
    return this._selectedSuperTypes;
  }

  public get selectedToughnesses(): Array<SelectOption<string>> {
    return this._selectedToughnesses;
  }

  public get selectedTypes(): Array<SelectOption<string>> {
    return this._selectedTypes;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(initial: CardSearchDto) {
    super(initial);
    this._selectedAbilities = new Array<SelectOption<string>>();
    this._selectedActions = new Array<SelectOption<string>>();
    this._selectedSets = new Array<MtgSetDto>();
    this._selectedCardColors = new Array<ColorDto>();
    this._selectedCardNames = new Array<SelectOption<string>>();
    this._selectedGameFormats = new Array<SelectOption<string>>();
    this._selectedIdentityColors = new Array<ColorDto>();
    this._selectedPowers = new Array<SelectOption<string>>();
    this._selectedProducedManaColors = new Array<ColorDto>();
    this._selectedRarities = new Array<SelectOption<string>>();
    this._selectedSubTypes = new Array<SelectOption<string>>();
    this._selectedSuperTypes = new Array<SelectOption<string>>();
    this._selectedToughnesses = new Array<SelectOption<string>>();
    this._selectedTypes = new Array<SelectOption<string>>();
  }
  // #endregion

  // #region CardColors -------------------------------------------------------
  public addColor(type: ColorType, color: ColorDto): void {
    switch (type) {
      case "card":
        this._dto.selectedCardColors.push(color);
        this._selectedCardColors.push(color);
        this._selectedCardColors.sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence);
        break;
      case "identity":
        this._dto.selectedIdentityColors.push(color);
        this._selectedIdentityColors.push(color);
        this._selectedIdentityColors.sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence);
        break;
      case "produced_mana":
        this._dto.selectedProducedManaColors.push(color);
        this._selectedProducedManaColors.push(color);
        this._selectedProducedManaColors.sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence);
        break;
    }
  }

  public removeColor(type: ColorType, color: ColorDto): void {
    switch (type) {
      case "card": {
        let idx = this._dto.selectedCardColors.indexOf(color);
        this._dto.selectedCardColors.splice(idx, 1);
        idx = this._selectedCardColors.findIndex((c: ColorDto) => c.id == color.id);
        this._selectedCardColors.splice(idx, 1);
        break;
      }
      case "identity": {
        let idx = this._dto.selectedIdentityColors.indexOf(color);
        this._dto.selectedIdentityColors.splice(idx, 1);
        idx = this._selectedIdentityColors.findIndex((c: ColorDto) => c.id == color.id);
        this._selectedIdentityColors.splice(idx, 1);
        break;
      }
      case "produced_mana": {
        let idx = this._dto.selectedProducedManaColors.indexOf(color);
        this._dto.selectedProducedManaColors.splice(idx, 1);
        idx = this._selectedProducedManaColors.findIndex((c: ColorDto) => c.id == color.id);
        this._selectedProducedManaColors.splice(idx, 1);
        break;
      }
    }
  }

  public clearColorSelection(type: ColorType): void {
    switch (type) {
      case "card":
        this._dto.selectedCardColors.splice(0);
        this._selectedCardColors.splice(0);
        break;
      case "identity":
        this._dto.selectedIdentityColors.splice(0);
        this._selectedIdentityColors.splice(0);
        break;
      case "produced_mana":
        this._dto.selectedProducedManaColors.splice(0);
        this._selectedProducedManaColors.splice(0);
        break;
    }
  }
  // #endregion

  // #region Ability ----------------------------------------------------------
  public addAbility(ability: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedAbilities, this._selectedAbilities, ability);
  }

  public removeAbility(ability: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedAbilities, this._selectedAbilities, ability);
  }

  public clearAbilitySelection(): void {
    this.clearSelection(this._dto.selectedAbilities, this._selectedAbilities);
  }
  // #endregion

  // #region Actions ----------------------------------------------------------
  public addAction(action: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedActions, this._selectedActions, action);
  }

  public removeAction(action: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedActions, this._selectedActions, action);
  }

  public clearActionSelection(): void {
    this.clearSelection(this._dto.selectedActions, this._selectedActions);
  }
  // #endregion

  // #region CardName -----------------------------------------------------------
  public addCardName(cardName: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedCardNames, this._selectedCardNames, cardName);
  }

  public removeCardName(cardName: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedCardNames, this._selectedCardNames, cardName);
  }

  public clearCardNameSelection(): void {
    this.clearSelection(this._dto.selectedCardNames, this._selectedCardNames);
  }
  // #endregion

  // #region GameFormat -------------------------------------------------------
  public addGameFormat(gameFormat: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedGameFormats, this._selectedGameFormats, gameFormat);
  }

  public removeGameFormat(gameFormat: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedGameFormats, this._selectedGameFormats, gameFormat);
  }

  public clearGameFormatSelection(): void {
    this.clearSelection(this._dto.selectedGameFormats, this._selectedGameFormats);
  }
  // #endregion

  // #region Rarity -----------------------------------------------------------
  public addRarity(rarity: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedRarities, this._selectedRarities, rarity);
  }

  public removeRarity(rarity: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedRarities, this._selectedRarities, rarity);
  }

  public clearRaritiesSelection(): void {
    this.clearSelection(this._dto.selectedRarities, this._selectedRarities);
  }
  // #endregion

  // #region Card set ---------------------------------------------------------
  public addCardSet(cardSet: MtgSetDto): void {
    this._dto.selectedSets.push(cardSet.id);
    this._selectedSets.push(cardSet);
    this.selectedSets.sort((a: MtgSetDto, b: MtgSetDto) => a.name["ENGLISH"].localeCompare(b.name["ENGLISH"]));
  }

  public removeCardSet(cardSet: MtgSetDto): void {
    let idx = this._dto.selectedSets.indexOf(cardSet.id);
    this._dto.selectedSets.splice(idx, 1);
    idx = this._selectedSets.findIndex((cs: MtgSetDto) => cs.id == cardSet.id);
    this._selectedSets.splice(idx, 1);
  }

  public clearCardSetSelection(): void {
    this._dto.selectedSets.splice(0);
    this._selectedSets.splice(0);
  }
  // #endregion

  // #region Subtypes ---------------------------------------------------------
  public addSubType(subtype: SelectOption<string>): void {
    this._dto.selectedSubTypes.push();
    this._selectedSubTypes.push(subtype);
    this._selectedSubTypes.sort();
  }

  public removeSubType(subtype: SelectOption<string>): void {
    let idx = this._dto.selectedSubTypes.findIndex((s: string) => s == subtype.label);
    this._dto.selectedSubTypes.splice(idx, 1);
    idx = this._selectedSubTypes.indexOf(subtype);
    this._selectedSubTypes.splice(idx, 1);
  }

  public clearSubTypeSelection(): void {
    this._dto.selectedSubTypes.splice(0);
    this._selectedSubTypes.splice(0);
  }
  // #endregion

  // #region Card Types -------------------------------------------------------
  public addCardType(cardType: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedTypes, this._selectedTypes, cardType);
  }

  public removeCardType(cardType: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedTypes, this._selectedTypes, cardType);
  }

  public clearCardTypeSelection(): void {
    this.clearSelection(this._dto.selectedTypes, this._selectedTypes);
  }

  // #endregion

  // #region SuperTypes -------------------------------------------------------
  public addSuperType(superType: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedSuperTypes, this._selectedSuperTypes, superType);
  }

  public removeSuperType(superType: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedSuperTypes, this._selectedSuperTypes, superType);
  }

  public clearSuperTypeSelection(): void {
    this.clearSelection(this._dto.selectedSuperTypes, this._selectedSuperTypes);
  }
  // #endregion

  // #region Powers -----------------------------------------------------------
  public addPower(power: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedPowers, this.selectedPowers, power);
  }

  public removePower(power: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedPowers, this.selectedPowers, power);
  }

  public clearPowerSelection(): void {
    this.clearSelection(this._dto.selectedPowers, this.selectedPowers);
  }
  // #endregion

  // #region Toughnesses ------------------------------------------------------
  public addToughness(toughness: SelectOption<string>): void {
    this.addSelectOption(this._dto.selectedToughnesses, this._selectedToughnesses, toughness);
  }

  public removeToughness(toughness: SelectOption<string>): void {
    this.removeSelectOption(this._dto.selectedToughnesses, this._selectedToughnesses, toughness);
  }

  public clearToughnessSelection(): void {
    this.clearSelection(this._dto.selectedToughnesses, this._selectedToughnesses);
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private addSelectOption(dtoArray: Array<string>, viewModelArray: Array<SelectOption<string>>, option: SelectOption<string>): void {
    dtoArray.push(option.value);
    viewModelArray.push(option);
    viewModelArray.sort((a: SelectOption<string>, b: SelectOption<string>) => a.label.localeCompare(b.label));
  }

  private removeSelectOption(dtoArray: Array<string>, viewModelArray: Array<SelectOption<string>>, option: SelectOption<string>): void {
    let idx = dtoArray.indexOf(option.value);
    dtoArray.splice(idx, 1);
    idx = viewModelArray.findIndex((so: SelectOption<string>) => so.value == option.value);
    viewModelArray.splice(idx, 1);
  }

  private clearSelection(dtoArray: Array<string>, viewModelArray: Array<SelectOption<string>>): void {
    dtoArray.splice(0);
    viewModelArray.splice(0);
  }
  // #endregion
}
