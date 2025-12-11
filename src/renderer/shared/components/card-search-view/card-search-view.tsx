import { Button } from "@blueprintjs/core";
import classNames from "classnames";
import { cloneDeep } from "lodash";
import React from "react";
import { useServices } from "../../../hooks";
import { ColorDto, MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { CardSearchViewmodel } from "../../viewmodel";
import { BaseSelect } from "../base/base-select/base-select";
import { BaseServerSelect } from "../base/base-server-select/base-server-select";
import { CardSymbolRenderer } from "../card-symbol-renderer";
import { CardSearchViewProps } from "./card-search-view.props";

export function CardSearchView(props: CardSearchViewProps) {
  // #region State ------------------------------------------------------------
  const [searchViewmodel, setSearchViewmodel] = React.useState<CardSearchViewmodel>(new CardSearchViewmodel(props.initialCardSearchDto));
  // due to issues with ResizeObserver (errors!) when scrolling open drop downs out of view, we have to force the dropdown to be closed when scrolling.
  // In order to do so, we use scrollVersion and use it to re-render the selects
  const [scrollVersion, setScrollVersion] = React.useState(0);
  // #endregion

  // #region Context ----------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      const container = document.querySelector(".left-panel-search-panel");
      const handleScroll = () => {
        setScrollVersion(v => v + 1); // triggers re-render
      };
      container?.addEventListener("scroll", handleScroll);
      return () => container?.removeEventListener("scroll", handleScroll);
    },
    []
  );
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSelectOptionEvent(callBack: (viewModel: CardSearchViewmodel) => void): void {
    const newSearchViewmodel = cloneDeep(searchViewmodel);
    callBack(newSearchViewmodel);
    setSearchViewmodel(newSearchViewmodel);
  }
  // #endregion

  // #region Memo -------------------------------------------------------------
  const allCardSets = React.useMemo(() => serviceContainer.mtgSetService.getSelectOptions(), []);
  const allColors = React.useMemo(() => serviceContainer.colorService.getSelectOptions(), []);
  const allRarities = React.useMemo(() => serviceContainer.displayValueService.getSelectOptions("rarity"), []);
  const allFormats = React.useMemo(() => serviceContainer.displayValueService.getSelectOptions("gameFormat"), []);
  const allCardTypes = React.useMemo(() => serviceContainer.cardSearchParamService.cardTypes, []);
  const allSuperTypes = React.useMemo(() => serviceContainer.cardSearchParamService.cardSuperTypes, []);
  const allPowers = React.useMemo(() => serviceContainer.cardSearchParamService.powerValues, []);
  const allToughnesses = React.useMemo(() => serviceContainer.cardSearchParamService.toughnessValues, []);
  const setImageRenderer = React.useCallback(
    (option: SelectOption<MtgSetTreeDto>) => (
      <i
        key={`icon-${option.value.keyruneCode}`}
        className={classNames("tree-view-image", "ss", "ss-" + option.value.keyruneCode.toLowerCase())}
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

  // #region Rendering --------------------------------------------------------
  return (
    <div className="left-panel-search-panel">
      <BaseSelect<MtgSetTreeDto>
        allItems={allCardSets}
        key={`card-set-select-${scrollVersion}`}
        formGroupLabel="Set"
        selectedItems={searchViewmodel.selectedSets}
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearCardSetSelection())}
        onOptionAdded={(item: SelectOption<MtgSetTreeDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addCardSet(item))}
        onOptionRemoved={(item: SelectOption<MtgSetTreeDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeCardSet(item))}
        preTextElement={setImageRenderer}
        itemLabel={(option: SelectOption<MtgSetTreeDto>) => option.value.code}
      />
      <BaseServerSelect<string>
        key={`card-name-select-${scrollVersion}`}
        keyString="card-name-select"
        label="Card name"
        selectedItems={searchViewmodel.selectedCardNames}
        server="library"
        serverBaseUrl="/public/catalog/CARD_NAMES/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onItemAdded={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addCardName(item))}
        onItemRemoved={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeCardName(item))}
        onClearSelectedItems={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearCardNameSelection())}
      />
      <BaseSelect<ColorDto>
        key={`card-color-select-${scrollVersion}`}
        allItems={allColors}
        formGroupLabel="Card color"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearColorSelection("card"))}
        onOptionAdded={(color: SelectOption<ColorDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addColor("card", color))}
        onOptionRemoved={(color: SelectOption<ColorDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeColor("card", color))}
        selectedItems={searchViewmodel.selectedCardColors}
        preTextElement={colorSymbolRenderer}
      />
      <BaseSelect<ColorDto>
        key={`produced-mana-color-select-${scrollVersion}`}
        allItems={allColors}
        formGroupLabel="Produced mana color"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearColorSelection("produced_mana"))}
        onOptionAdded={(color: SelectOption<ColorDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addColor("produced_mana", color))}
        onOptionRemoved={(color: SelectOption<ColorDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeColor("produced_mana", color))}
        selectedItems={searchViewmodel.selectedProducedManaColors}
        preTextElement={colorSymbolRenderer}
      />
      <BaseSelect<ColorDto>
        key={`identity-color-select-${scrollVersion}`}
        allItems={allColors}
        formGroupLabel="Identity color"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearColorSelection("identity"))}
        onOptionAdded={(color: SelectOption<ColorDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addColor("identity", color))}
        onOptionRemoved={(color: SelectOption<ColorDto>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeColor("identity", color))}
        selectedItems={searchViewmodel.selectedIdentityColors}
        preTextElement={colorSymbolRenderer}
      />
      <BaseSelect<string>
        allItems={allRarities}
        key={`rarity-select-${scrollVersion}`}
        formGroupLabel="Rarity"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearRaritiesSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addRarity(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeRarity(option))}
        selectedItems={searchViewmodel.selectedRarities}
      />
      <BaseSelect<string>
        allItems={allFormats}
        key={`game-format-select-${scrollVersion}`}
        formGroupLabel="Game Format"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearGameFormatSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addGameFormat(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeGameFormat(option))}
        selectedItems={searchViewmodel.selectedGameFormats}
      />
      <BaseSelect<string>
        allItems={allCardTypes}
        key={`card-type-select-${scrollVersion}`}
        formGroupLabel="Card type"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearCardTypeSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addCardType(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeCardType(option))}
        selectedItems={searchViewmodel.selectedTypes}
      />
      <BaseSelect<string>
        allItems={allSuperTypes}
        key={`super-type-select-${scrollVersion}`}
        formGroupLabel="Super-type"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearSuperTypeSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addSuperType(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeSuperType(option))}
        selectedItems={searchViewmodel.selectedSuperTypes}
      />
      <BaseServerSelect<string>
        key={`card-sub-type-select-${scrollVersion}`}
        keyString="card-sub-type-select"
        label="Sub-type"
        selectedItems={searchViewmodel.selectedSubTypes}
        server="library"
        serverBaseUrl="/public/card-sub-type"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onItemAdded={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addSubType(item))}
        onItemRemoved={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeSubType(item))}
        onClearSelectedItems={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearSubTypeSelection())}
      />
      <BaseSelect<string>
        allItems={allPowers}
        key={`power-select-${scrollVersion}`}
        formGroupLabel="Power"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearPowerSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addPower(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removePower(option))}
        selectedItems={searchViewmodel.selectedPowers}
      />
      <BaseSelect<string>
        allItems={allToughnesses}
        key={`toughness-select-${scrollVersion}`}
        formGroupLabel="Toughness"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearToughnessSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addToughness(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeToughness(option))}
        selectedItems={searchViewmodel.selectedToughnesses}
      />
      <BaseServerSelect<string>
        key={`ability-key-word-select-${scrollVersion}`}
        keyString="ability-key-word-select"
        label="Ability"
        selectedItems={searchViewmodel.selectedAbilities}
        server="library"
        serverBaseUrl="/public/catalog/KEYWORD_ABILITIES/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onItemAdded={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addAbility(item))}
        onItemRemoved={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeAbility(item))}
        onClearSelectedItems={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearAbilitySelection())}
      />
      <BaseServerSelect<string>
        key={`action-key-word-select-${scrollVersion}`}
        keyString="action-key-word-select"
        label="Action"
        selectedItems={searchViewmodel.selectedActions}
        server="library"
        serverBaseUrl="/public/catalog/KEYWORD_ACTIONS/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onItemAdded={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addAction(item))}
        onItemRemoved={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeAction(item))}
        onClearSelectedItems={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearActionSelection())}
      />
      <Button
        icon="search"
        onClick={() => props.onSearch(searchViewmodel.dto)}
      >
        Search
      </Button>
    </div>
  );
  // #endregion
}
