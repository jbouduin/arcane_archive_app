import { addSelectOption, clearSelection, removeSelectOption } from "../../components/util";
import { IServiceContainer } from "../../context";
import { AdvancedCardSearchDto, ColorDto, MtgSetTreeDto } from "../../dto";
import { ColorType, SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

// TODO check why this is a BaseViewmodel descendant. Is this really needed
export class AdvancedCardSearchViewmodel extends BaseViewmodel<AdvancedCardSearchDto, string> {
  // #region Private fields ---------------------------------------------------
  private _allCardSets: Array<SelectOption<MtgSetTreeDto>>;
  private _allColors: Array<SelectOption<ColorDto>>;
  private _allRarities: Array<SelectOption<string>>;
  private _allGameFormats: Array<SelectOption<string>>;
  private _allSuperTypes: Array<SelectOption<string>>;
  private _allCardTypes: Array<SelectOption<string>>;
  private _allPowers: Array<SelectOption<string>>;
  private _allToughnesses: Array<SelectOption<string>>;
  private _selectedAbilities: Array<SelectOption<string>>;
  private _selectedActions: Array<SelectOption<string>>;
  private _selectedCardColors: Array<SelectOption<ColorDto>>;
  private _selectedCardNames: Array<SelectOption<string>>;
  private _selectedIdentityColors: Array<SelectOption<ColorDto>>;
  private _selectedGameFormats: Array<SelectOption<string>>;
  private _selectedPowers: Array<SelectOption<string>>;
  private _selectedProducedManaColors: Array<SelectOption<ColorDto>>;
  private _selectedRarities: Array<SelectOption<string>>;
  private _selectedSets: Array<SelectOption<MtgSetTreeDto>>;
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

  public get selectedSets(): Array<SelectOption<MtgSetTreeDto>> {
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

  public get allCardSets(): Array<SelectOption<MtgSetTreeDto>> {
    return this._allCardSets;
  }

  public get allColors(): Array<SelectOption<ColorDto>> {
    return this._allColors;
  }

  public get allRarities(): Array<SelectOption<string>> {
    return this._allRarities;
  }

  public get allFormats(): Array<SelectOption<string>> {
    return this._allGameFormats;
  }

  public get allCardTypes(): Array<SelectOption<string>> {
    return this._allCardTypes;
  }

  public get allSuperTypes(): Array<SelectOption<string>> {
    return this._allSuperTypes;
  }

  public get allPowers(): Array<SelectOption<string>> {
    return this._allPowers;
  }

  public get allToughnesses(): Array<SelectOption<string>> {
    return this._allToughnesses;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: AdvancedCardSearchDto, serviceContainer: IServiceContainer) {
    super(dto);
    this._allCardSets = serviceContainer.mtgSetService.getSelectOptions();
    this._allColors = serviceContainer.colorService.getSelectOptions();
    this._allRarities = serviceContainer.displayValueService.getSelectOptions("rarity");
    this._allGameFormats = serviceContainer.displayValueService.getSelectOptions("gameFormat");
    this._allSuperTypes = serviceContainer.cardSearchService.getCardSuperTypeSelectOptions();
    this._allCardTypes = serviceContainer.cardSearchService.getCardTypeSelectOptions();
    this._allPowers = serviceContainer.cardSearchService.getPowerValueSelectOptions();
    this._allToughnesses = serviceContainer.cardSearchService.getToughnessValueSelectOptions();
    this._selectedAbilities = dto.cardFilterParams.abilities.map((value: string) => ({ value: value, label: value }));
    this._selectedActions = dto.cardFilterParams.actions.map((value: string) => ({ value: value, label: value }));
    this._selectedCardColors = this.initializeSelected(this._allColors, dto.cardFilterParams.cardColors);
    this._selectedCardNames = dto.cardFilterParams.cardNames.map((value: string) => ({ value: value, label: value }));
    this._selectedGameFormats = this.initializeSelected(this._allGameFormats, dto.cardFilterParams.gameFormats);
    this._selectedIdentityColors = this.initializeSelected(this._allColors, dto.cardFilterParams.identityColors);
    this._selectedPowers = this.initializeSelected(this._allPowers, dto.cardFilterParams.powers);
    this._selectedProducedManaColors = this.initializeSelected(this._allColors, dto.cardFilterParams.producedManaColors);
    this._selectedRarities = this.initializeSelected(this._allRarities, dto.cardFilterParams.rarities);
    this._selectedSets = this.initializeSelected(this._allCardSets, dto.cardSetFilter);
    this._selectedSubTypes = dto.cardFilterParams.subTypes.map((value: string) => ({ value: value, label: value }));
    this._selectedSuperTypes = this.initializeSelected(this._allSuperTypes, dto.cardFilterParams.superTypes);
    this._selectedToughnesses = this.initializeSelected(this._allToughnesses, dto.cardFilterParams.toughnesses);
    this._selectedTypes = dto.cardFilterParams.types.map((value: string) => ({ value: value, label: value }));
  }

  private initializeSelected<T>(allValues: Array<SelectOption<T>>, selected: Array<T>): Array<SelectOption<T>> {
    const result = new Array<SelectOption<T>>();
    result.push(...allValues.filter((o: SelectOption<T>) => selected.includes(o.value)));
    return result;
  }
  // #endregion

  // #region CardColors -------------------------------------------------------
  public addColor(type: ColorType, color: SelectOption<ColorDto>): void {
    switch (type) {
      case "card":
        addSelectOption(
          this._dto.cardFilterParams.cardColors,
          this._selectedCardColors,
          color,
          (a: SelectOption<ColorDto>, b: SelectOption<ColorDto>) => a.value.sequence - b.value.sequence
        );
        break;
      case "identity":
        addSelectOption(
          this._dto.cardFilterParams.identityColors,
          this._selectedIdentityColors,
          color,
          (a: SelectOption<ColorDto>, b: SelectOption<ColorDto>) => a.value.sequence - b.value.sequence
        );
        break;
      case "produced_mana":
        addSelectOption(
          this._dto.cardFilterParams.producedManaColors,
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
          this._dto.cardFilterParams.cardColors,
          this._selectedCardColors,
          color);
        break;
      }
      case "identity": {
        removeSelectOption(
          this._dto.cardFilterParams.identityColors,
          this._selectedIdentityColors,
          color);
        break;
      }
      case "produced_mana": {
        removeSelectOption(
          this._dto.cardFilterParams.producedManaColors,
          this._selectedProducedManaColors,
          color);
        break;
      }
    }
  }

  public clearColorSelection(type: ColorType): void {
    switch (type) {
      case "card":
        clearSelection(this._dto.cardFilterParams.cardColors, this._selectedCardColors);
        break;
      case "identity":
        clearSelection(this._dto.cardFilterParams.identityColors, this._selectedIdentityColors);
        break;
      case "produced_mana":
        clearSelection(this._dto.cardFilterParams.producedManaColors, this._selectedProducedManaColors);
        break;
    }
  }
  // #endregion

  // #region Ability ----------------------------------------------------------
  public addAbility(ability: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.abilities, this._selectedAbilities, ability);
  }

  public removeAbility(ability: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.abilities, this._selectedAbilities, ability);
  }

  public clearAbilitySelection(): void {
    clearSelection(this._dto.cardFilterParams.abilities, this._selectedAbilities);
  }
  // #endregion

  // #region Actions ----------------------------------------------------------
  public addAction(action: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.actions, this._selectedActions, action);
  }

  public removeAction(action: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.actions, this._selectedActions, action);
  }

  public clearActionSelection(): void {
    clearSelection(this._dto.cardFilterParams.actions, this._selectedActions);
  }
  // #endregion

  // #region CardName -----------------------------------------------------------
  public addCardName(cardName: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.cardNames, this._selectedCardNames, cardName);
  }

  public removeCardName(cardName: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.cardNames, this._selectedCardNames, cardName);
  }

  public clearCardNameSelection(): void {
    clearSelection(this._dto.cardFilterParams.cardNames, this._selectedCardNames);
  }
  // #endregion

  // #region GameFormat -------------------------------------------------------
  public addGameFormat(gameFormat: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.gameFormats, this._selectedGameFormats, gameFormat);
  }

  public removeGameFormat(gameFormat: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.gameFormats, this._selectedGameFormats, gameFormat);
  }

  public clearGameFormatSelection(): void {
    clearSelection(this._dto.cardFilterParams.gameFormats, this._selectedGameFormats);
  }
  // #endregion

  // #region Rarity -----------------------------------------------------------
  public addRarity(rarity: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.rarities, this._selectedRarities, rarity);
  }

  public removeRarity(rarity: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.rarities, this._selectedRarities, rarity);
  }

  public clearRaritiesSelection(): void {
    clearSelection(this._dto.cardFilterParams.rarities, this._selectedRarities);
  }
  // #endregion

  // #region Card set ---------------------------------------------------------
  public addCardSet(cardSet: SelectOption<MtgSetTreeDto>): void {
    addSelectOption(this._dto.cardSetFilter, this._selectedSets, cardSet);
  }

  public removeCardSet(cardSet: SelectOption<MtgSetTreeDto>): void {
    removeSelectOption(this._dto.cardSetFilter, this._selectedSets, cardSet);
  }

  public clearCardSetSelection(): void {
    clearSelection(this._dto.cardSetFilter, this._selectedSets);
  }
  // #endregion

  // #region Subtypes ---------------------------------------------------------
  public addSubType(subtype: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.subTypes, this._selectedSubTypes, subtype);
  }

  public removeSubType(subtype: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.subTypes, this._selectedSubTypes, subtype);
  }

  public clearSubTypeSelection(): void {
    clearSelection(this._dto.cardFilterParams.subTypes, this._selectedSubTypes);
  }
  // #endregion

  // #region Card Types -------------------------------------------------------
  public addCardType(cardType: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.types, this._selectedTypes, cardType);
  }

  public removeCardType(cardType: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.types, this._selectedTypes, cardType);
  }

  public clearCardTypeSelection(): void {
    clearSelection(this._dto.cardFilterParams.types, this._selectedTypes);
  }

  // #endregion

  // #region SuperTypes -------------------------------------------------------
  public addSuperType(superType: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.superTypes, this._selectedSuperTypes, superType);
  }

  public removeSuperType(superType: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.superTypes, this._selectedSuperTypes, superType);
  }

  public clearSuperTypeSelection(): void {
    clearSelection(this._dto.cardFilterParams.superTypes, this._selectedSuperTypes);
  }
  // #endregion

  // #region Powers -----------------------------------------------------------
  public addPower(power: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.powers, this.selectedPowers, power);
  }

  public removePower(power: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.powers, this.selectedPowers, power);
  }

  public clearPowerSelection(): void {
    clearSelection(this._dto.cardFilterParams.powers, this.selectedPowers);
  }
  // #endregion

  // #region Toughnesses ------------------------------------------------------
  public addToughness(toughness: SelectOption<string>): void {
    addSelectOption(this._dto.cardFilterParams.toughnesses, this._selectedToughnesses, toughness);
  }

  public removeToughness(toughness: SelectOption<string>): void {
    removeSelectOption(this._dto.cardFilterParams.toughnesses, this._selectedToughnesses, toughness);
  }

  public clearToughnessSelection(): void {
    clearSelection(this._dto.cardFilterParams.toughnesses, this._selectedToughnesses);
  }
  // #endregion
}
