import { addSelectOption, clearSelection, removeSelectOption } from "../../components/util";
import { ColorDto, MtgSetDto } from "../../dto";
import { CardSearchDto } from "../../dto/card-search.dto";
import { ColorType, SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class CardSearchViewmodel extends BaseViewmodel<CardSearchDto> {
  // #region Private fields ---------------------------------------------------
  private _selectedAbilities: Array<SelectOption<string>>;
  private _selectedActions: Array<SelectOption<string>>;
  private _selectedCardColors: Array<SelectOption<ColorDto>>;
  private _selectedCardNames: Array<SelectOption<string>>;
  private _selectedIdentityColors: Array<SelectOption<ColorDto>>;
  private _selectedGameFormats: Array<SelectOption<string>>;
  private _selectedPowers: Array<SelectOption<string>>;
  private _selectedProducedManaColors: Array<SelectOption<ColorDto>>;
  private _selectedRarities: Array<SelectOption<string>>;
  private _selectedSets: Array<SelectOption<MtgSetDto>>;
  private _selectedSubTypes: Array<SelectOption<string>>;
  private _selectedSuperTypes: Array<SelectOption<string>>;
  private _selectedToughnesses: Array<SelectOption<string>>;
  private _selectedTypes: Array<SelectOption<string>>;
  // #endregion

  // #region BaseViewmodel Members ----------------------------------------------
  public get isValid(): boolean {
    return true;
  }
  // #endregion

  // #region Getters - Setters --------------------------------------------------
  public get selectedAbilities(): Array<SelectOption<string>> {
    return this._selectedAbilities;
  }

  public get selectedActions(): Array<SelectOption<string>> {
    return this._selectedActions;
  }

  public get selectedCardColors(): Array<SelectOption<ColorDto>> {
    return this._selectedCardColors;
  }

  public get selectedCardNames(): Array<SelectOption<string>> {
    return this._selectedCardNames;
  }

  public get selectedIdentityColors(): Array<SelectOption<ColorDto>> {
    return this._selectedIdentityColors;
  }

  public get selectedProducedManaColors(): Array<SelectOption<ColorDto>> {
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

  public get selectedSets(): Array<SelectOption<MtgSetDto>> {
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
    this._selectedSets = new Array<SelectOption<MtgSetDto>>();
    this._selectedCardColors = new Array<SelectOption<ColorDto>>();
    this._selectedCardNames = new Array<SelectOption<string>>();
    this._selectedGameFormats = new Array<SelectOption<string>>();
    this._selectedIdentityColors = new Array<SelectOption<ColorDto>>();
    this._selectedPowers = new Array<SelectOption<string>>();
    this._selectedProducedManaColors = new Array<SelectOption<ColorDto>>();
    this._selectedRarities = new Array<SelectOption<string>>();
    this._selectedSubTypes = new Array<SelectOption<string>>();
    this._selectedSuperTypes = new Array<SelectOption<string>>();
    this._selectedToughnesses = new Array<SelectOption<string>>();
    this._selectedTypes = new Array<SelectOption<string>>();
  }
  // #endregion

  // #region CardColors -------------------------------------------------------
  public addColor(type: ColorType, color: SelectOption<ColorDto>): void {
    switch (type) {
      case "card":
        addSelectOption(
          this._dto.selectedCardColors,
          this._selectedCardColors,
          color,
          (a: SelectOption<ColorDto>, b: SelectOption<ColorDto>) => a.value.sequence - b.value.sequence
        );
        break;
      case "identity":
        addSelectOption(
          this._dto.selectedIdentityColors,
          this._selectedIdentityColors,
          color,
          (a: SelectOption<ColorDto>, b: SelectOption<ColorDto>) => a.value.sequence - b.value.sequence
        );
        break;
      case "produced_mana":
        addSelectOption(
          this._dto.selectedProducedManaColors,
          this._selectedProducedManaColors,
          color,
          (a: SelectOption<ColorDto>, b: SelectOption<ColorDto>) => a.value.sequence - b.value.sequence
        );
        break;
    }
  }

  public removeColor(type: ColorType, color: SelectOption<ColorDto>): void {
    switch (type) {
      case "card": {
        removeSelectOption(
          this._dto.selectedCardColors,
          this._selectedCardColors,
          color);
        break;
      }
      case "identity": {
        removeSelectOption(
          this._dto.selectedIdentityColors,
          this._selectedIdentityColors,
          color);
        break;
      }
      case "produced_mana": {
        removeSelectOption(
          this._dto.selectedProducedManaColors,
          this._selectedProducedManaColors,
          color);
        break;
      }
    }
  }

  public clearColorSelection(type: ColorType): void {
    switch (type) {
      case "card":
        clearSelection(this._dto.selectedCardColors, this._selectedCardColors);
        break;
      case "identity":
        clearSelection(this._dto.selectedIdentityColors, this._selectedIdentityColors);
        break;
      case "produced_mana":
        clearSelection(this._dto.selectedProducedManaColors, this._selectedProducedManaColors);
        break;
    }
  }
  // #endregion

  // #region Ability ----------------------------------------------------------
  public addAbility(ability: SelectOption<string>): void {
    addSelectOption(this._dto.selectedAbilities, this._selectedAbilities, ability);
  }

  public removeAbility(ability: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedAbilities, this._selectedAbilities, ability);
  }

  public clearAbilitySelection(): void {
    clearSelection(this._dto.selectedAbilities, this._selectedAbilities);
  }
  // #endregion

  // #region Actions ----------------------------------------------------------
  public addAction(action: SelectOption<string>): void {
    addSelectOption(this._dto.selectedActions, this._selectedActions, action);
  }

  public removeAction(action: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedActions, this._selectedActions, action);
  }

  public clearActionSelection(): void {
    clearSelection(this._dto.selectedActions, this._selectedActions);
  }
  // #endregion

  // #region CardName -----------------------------------------------------------
  public addCardName(cardName: SelectOption<string>): void {
    addSelectOption(this._dto.selectedCardNames, this._selectedCardNames, cardName);
  }

  public removeCardName(cardName: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedCardNames, this._selectedCardNames, cardName);
  }

  public clearCardNameSelection(): void {
    clearSelection(this._dto.selectedCardNames, this._selectedCardNames);
  }
  // #endregion

  // #region GameFormat -------------------------------------------------------
  public addGameFormat(gameFormat: SelectOption<string>): void {
    addSelectOption(this._dto.selectedGameFormats, this._selectedGameFormats, gameFormat);
  }

  public removeGameFormat(gameFormat: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedGameFormats, this._selectedGameFormats, gameFormat);
  }

  public clearGameFormatSelection(): void {
    clearSelection(this._dto.selectedGameFormats, this._selectedGameFormats);
  }
  // #endregion

  // #region Rarity -----------------------------------------------------------
  public addRarity(rarity: SelectOption<string>): void {
    addSelectOption(this._dto.selectedRarities, this._selectedRarities, rarity);
  }

  public removeRarity(rarity: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedRarities, this._selectedRarities, rarity);
  }

  public clearRaritiesSelection(): void {
    clearSelection(this._dto.selectedRarities, this._selectedRarities);
  }
  // #endregion

  // #region Card set ---------------------------------------------------------
  public addCardSet(cardSet: SelectOption<MtgSetDto>): void {
    addSelectOption(this._dto.selectedSets, this._selectedSets, cardSet);
  }

  public removeCardSet(cardSet: SelectOption<MtgSetDto>): void {
    removeSelectOption(this._dto.selectedSets, this._selectedSets, cardSet);
  }

  public clearCardSetSelection(): void {
    clearSelection(this._dto.selectedSets, this._selectedSets);
  }
  // #endregion

  // #region Subtypes ---------------------------------------------------------
  public addSubType(subtype: SelectOption<string>): void {
    addSelectOption(this._dto.selectedSubTypes, this._selectedSubTypes, subtype);
  }

  public removeSubType(subtype: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedSubTypes, this._selectedSubTypes, subtype);
  }

  public clearSubTypeSelection(): void {
    clearSelection(this._dto.selectedSubTypes, this._selectedSubTypes);
  }
  // #endregion

  // #region Card Types -------------------------------------------------------
  public addCardType(cardType: SelectOption<string>): void {
    addSelectOption(this._dto.selectedTypes, this._selectedTypes, cardType);
  }

  public removeCardType(cardType: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedTypes, this._selectedTypes, cardType);
  }

  public clearCardTypeSelection(): void {
    clearSelection(this._dto.selectedTypes, this._selectedTypes);
  }

  // #endregion

  // #region SuperTypes -------------------------------------------------------
  public addSuperType(superType: SelectOption<string>): void {
    addSelectOption(this._dto.selectedSuperTypes, this._selectedSuperTypes, superType);
  }

  public removeSuperType(superType: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedSuperTypes, this._selectedSuperTypes, superType);
  }

  public clearSuperTypeSelection(): void {
    clearSelection(this._dto.selectedSuperTypes, this._selectedSuperTypes);
  }
  // #endregion

  // #region Powers -----------------------------------------------------------
  public addPower(power: SelectOption<string>): void {
    addSelectOption(this._dto.selectedPowers, this.selectedPowers, power);
  }

  public removePower(power: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedPowers, this.selectedPowers, power);
  }

  public clearPowerSelection(): void {
    clearSelection(this._dto.selectedPowers, this.selectedPowers);
  }
  // #endregion

  // #region Toughnesses ------------------------------------------------------
  public addToughness(toughness: SelectOption<string>): void {
    addSelectOption(this._dto.selectedToughnesses, this._selectedToughnesses, toughness);
  }

  public removeToughness(toughness: SelectOption<string>): void {
    removeSelectOption(this._dto.selectedToughnesses, this._selectedToughnesses, toughness);
  }

  public clearToughnessSelection(): void {
    clearSelection(this._dto.selectedToughnesses, this._selectedToughnesses);
  }
  // #endregion
}
