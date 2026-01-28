import { Button } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { useServices } from "../../../hooks";
import { ColorDto, MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { AdvancedCardSearchViewmodel } from "../../viewmodel";
import { BaseMultiSelect } from "../base/base-multi-select/base-multi-select";
import { BaseServerSelect } from "../base/base-server-select/base-server-select";
import { CardSymbolRenderer } from "../card-symbol-renderer";
import { AdvancedCardSearchViewProps } from "./advanced-card-search-view.props";

export function AdvancedCardSearchView(props: AdvancedCardSearchViewProps): JSX.Element {
  // #region Context ----------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region State ------------------------------------------------------------
  const searchViewmodel = serviceContainer.viewmodelFactoryService.mtgCardViewmodelFactory
    .getAdvancedCardSearchViewmodel(props.advancedCardSearch, serviceContainer);
  /**
   * # BUG ResizeObserver (errors!): when scrolling open drop downs out of view the solution to force the dropdown
   * to be closed when scrolling does not work. In order to close dropdowns, we use scrollVersion and use it to
   * re-render the selects
   */
  const [scrollVersion, setScrollVersion] = React.useState(0);
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      const container = document.querySelector(".left-panel-search-panel");
      const handleScroll: () => void = () => {
        setScrollVersion(v => v + 1); // triggers re-render
      };
      container?.addEventListener("scroll", handleScroll);
      return () => container?.removeEventListener("scroll", handleScroll);
    },
    []
  );
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSelectOptionEvent(callBack: (viewModel: AdvancedCardSearchViewmodel) => void): void {
    callBack(searchViewmodel);
    props.cardFilterParamsChanged(searchViewmodel.dto.cardFilterParams);
  }

  function onSelectSetOptionEvent(callBack: (viewModel: AdvancedCardSearchViewmodel) => void): void {
    callBack(searchViewmodel);
    props.cardSetsChanged(searchViewmodel.dto.cardSetFilter);
  }
  // #endregion

  // #region Memo -------------------------------------------------------------
  const setImageRenderer = React.useCallback(
    (option: SelectOption<MtgSetTreeDto>) => (
      <i
        key={`icon-${option.value.keyruneCode}`}
        className={classNames("ss", "ss-" + option.value.keyruneCode.toLowerCase())}
        style={{ paddingRight: "5px" }}
      >
      </i>
    ),
    []
  );
  const colorSymbolRenderer = React.useCallback(
    (option: SelectOption<ColorDto>) => (
      <CardSymbolRenderer cardSymbols={[option.value.manaSymbol]} className="mana-cost-image-in-text" />
    ),
    []
  );
  // #endregion

  // NEXT add collections to advanced search

  // #region Rendering --------------------------------------------------------
  return (
    <div className="left-panel-search-panel">
      <BaseMultiSelect<MtgSetTreeDto>
        allItems={searchViewmodel.allCardSets}
        key={`card-set-select-${scrollVersion}`}
        formGroupLabel="Set"
        itemComparer={(a: MtgSetTreeDto, b: MtgSetTreeDto) => a.id == b.id}
        selectedOptions={searchViewmodel.selectedSets}
        onClearSelectedOptions={() =>
          onSelectSetOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearCardSetSelection())}
        onOptionAdded={(item: SelectOption<MtgSetTreeDto>) =>
          onSelectSetOptionEvent((v: AdvancedCardSearchViewmodel) => v.addCardSet(item))}
        onOptionRemoved={(item: SelectOption<MtgSetTreeDto>) =>
          onSelectSetOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeCardSet(item))}
        preTextElement={setImageRenderer}
        itemLabel={(option: SelectOption<MtgSetTreeDto>) => option.value.code}
      />
      <BaseServerSelect<string>
        key={`card-name-select-${scrollVersion}`}
        keyString="card-name-select"
        formGroupLabel="Card name"
        selectedOptions={searchViewmodel.selectedCardNames}
        server="library"
        serverBaseUrl="/public/catalog/CARD_NAMES/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onOptionAdded={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addCardName(item))}
        onOptionsRemoved={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeCardName(item))}
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearCardNameSelection())}
      />
      <BaseMultiSelect<ColorDto>
        key={`card-color-select-${scrollVersion}`}
        allItems={searchViewmodel.allColors}
        formGroupLabel="Card color"
        itemComparer={(a: ColorDto, b: ColorDto) => a.id == b.id}
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearColorSelection("card"))}
        onOptionAdded={(color: SelectOption<ColorDto>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addColor("card", color))}
        onOptionRemoved={(color: SelectOption<ColorDto>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeColor("card", color))}
        selectedOptions={searchViewmodel.selectedCardColors}
        preTextElement={colorSymbolRenderer}
      />
      <BaseMultiSelect<ColorDto>
        key={`produced-mana-color-select-${scrollVersion}`}
        allItems={searchViewmodel.allColors}
        formGroupLabel="Produced mana color"
        itemComparer={(a: ColorDto, b: ColorDto) => a.id == b.id}
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearColorSelection("produced_mana"))}
        onOptionAdded={(color: SelectOption<ColorDto>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addColor("produced_mana", color))}
        onOptionRemoved={(color: SelectOption<ColorDto>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeColor("produced_mana", color))}
        selectedOptions={searchViewmodel.selectedProducedManaColors}
        preTextElement={colorSymbolRenderer}
      />
      <BaseMultiSelect<ColorDto>
        key={`identity-color-select-${scrollVersion}`}
        allItems={searchViewmodel.allColors}
        formGroupLabel="Identity color"
        itemComparer={(a: ColorDto, b: ColorDto) => a.id == b.id}
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearColorSelection("identity"))}
        onOptionAdded={(color: SelectOption<ColorDto>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addColor("identity", color))}
        onOptionRemoved={(color: SelectOption<ColorDto>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeColor("identity", color))}
        selectedOptions={searchViewmodel.selectedIdentityColors}
        preTextElement={colorSymbolRenderer}
      />
      <BaseMultiSelect<string>
        allItems={searchViewmodel.allRarities}
        key={`rarity-select-${scrollVersion}`}
        formGroupLabel="Rarity"
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearRaritiesSelection())}
        onOptionAdded={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addRarity(option))}
        onOptionRemoved={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeRarity(option))}
        selectedOptions={searchViewmodel.selectedRarities}
      />
      <BaseMultiSelect<string>
        allItems={searchViewmodel.allFormats}
        key={`game-format-select-${scrollVersion}`}
        formGroupLabel="Game Format"
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearGameFormatSelection())}
        onOptionAdded={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addGameFormat(option))}
        onOptionRemoved={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeGameFormat(option))}
        selectedOptions={searchViewmodel.selectedGameFormats}
      />
      <BaseMultiSelect<string>
        allItems={searchViewmodel.allCardTypes}
        key={`card-type-select-${scrollVersion}`}
        formGroupLabel="Card type"
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearCardTypeSelection())}
        onOptionAdded={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addCardType(option))}
        onOptionRemoved={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeCardType(option))}
        selectedOptions={searchViewmodel.selectedTypes}
      />
      <BaseMultiSelect<string>
        allItems={searchViewmodel.allSuperTypes}
        key={`super-type-select-${scrollVersion}`}
        formGroupLabel="Super-type"
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearSuperTypeSelection())}
        onOptionAdded={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addSuperType(option))}
        onOptionRemoved={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeSuperType(option))}
        selectedOptions={searchViewmodel.selectedSuperTypes}
      />
      <BaseServerSelect<string>
        key={`card-sub-type-select-${scrollVersion}`}
        keyString="card-sub-type-select"
        formGroupLabel="Sub-type"
        selectedOptions={searchViewmodel.selectedSubTypes}
        server="library"
        serverBaseUrl="/public/card-sub-type"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onOptionAdded={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addSubType(item))}
        onOptionsRemoved={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeSubType(item))}
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearSubTypeSelection())}
      />
      <BaseMultiSelect<string>
        allItems={searchViewmodel.allPowers}
        key={`power-select-${scrollVersion}`}
        formGroupLabel="Power"
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearPowerSelection())}
        onOptionAdded={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addPower(option))}
        onOptionRemoved={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removePower(option))}
        selectedOptions={searchViewmodel.selectedPowers}
      />
      <BaseMultiSelect<string>
        allItems={searchViewmodel.allToughnesses}
        key={`toughness-select-${scrollVersion}`}
        formGroupLabel="Toughness"
        onClearSelectedOptions={() =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearToughnessSelection())}
        onOptionAdded={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addToughness(option))}
        onOptionRemoved={(option: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeToughness(option))}
        selectedOptions={searchViewmodel.selectedToughnesses}
      />
      <BaseServerSelect<string>
        key={`ability-key-word-select-${scrollVersion}`}
        keyString="ability-key-word-select"
        formGroupLabel="Ability"
        selectedOptions={searchViewmodel.selectedAbilities}
        server="library"
        serverBaseUrl="/public/catalog/KEYWORD_ABILITIES/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onOptionAdded={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addAbility(item))}
        onOptionsRemoved={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeAbility(item))}
        onClearSelectedOptions={
          () => onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearAbilitySelection())
        }
      />
      <BaseServerSelect<string>
        key={`action-key-word-select-${scrollVersion}`}
        keyString="action-key-word-select"
        formGroupLabel="Action"
        selectedOptions={searchViewmodel.selectedActions}
        server="library"
        serverBaseUrl="/public/catalog/KEYWORD_ACTIONS/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onOptionAdded={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.addAction(item))}
        onOptionsRemoved={(item: SelectOption<string>) =>
          onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.removeAction(item))}
        onClearSelectedOptions={() => onSelectOptionEvent((v: AdvancedCardSearchViewmodel) => v.clearActionSelection())}
      />
      <Button
        icon="search"
        onClick={() => props.search(searchViewmodel.dto)}
      >
        Search
      </Button>
    </div>
  );
  // #endregion
}
