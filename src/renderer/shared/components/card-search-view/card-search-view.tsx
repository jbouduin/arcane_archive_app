import { Button } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import React from "react";
import { useServices } from "../../../hooks/use-services";
import { ColorDto, MtgSetDto } from "../../dto";
import { SelectOption } from "../../types";
import { CardSearchViewmodel } from "../../viewmodel";
import { BaseSelect } from "../base/base-select/base-select";
import { BaseServerSelect } from "../base/base-server-select/base-server-select";
import { CardSearchViewProps } from "./card-search-view.props";
import { CardSetSelect } from "./card-set-select/card-set-select";
import { ColorSelect } from "./color-select/color-select";

export function CardSearchView(props: CardSearchViewProps) {
  // #region State ------------------------------------------------------------
  const [searchViewmodel, setSearchViewmodel] = React.useState<CardSearchViewmodel>(new CardSearchViewmodel(props.initialCardSearchDto));
  // #endregion

  // #region Context ----------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onSelectOptionEvent(callBack: (viewModel: CardSearchViewmodel) => void): void {
    const newSearchViewmodel = cloneDeep(searchViewmodel);
    callBack(newSearchViewmodel);
    setSearchViewmodel(newSearchViewmodel);
  }
  // #endregion

  // #region Memo -------------------------------------------------------------
  const allCardSets = React.useMemo(() => serviceContainer.mtgSetService.allSets, []);
  const allColors = React.useMemo(() => serviceContainer.colorService.allColors.filter((c: ColorDto) => c.code != "UNKNOWN"), []);
  const allRarities = React.useMemo(() => serviceContainer.displayValueService.getSelectOptions("rarity"), []);
  const allFormats = React.useMemo(() => serviceContainer.displayValueService.getSelectOptions("gameFormat"), []);
  const allCardTypes = React.useMemo(() => serviceContainer.cardSearchParamService.cardTypes, []);
  const allSuperTypes = React.useMemo(() => serviceContainer.cardSearchParamService.cardSuperTypes, []);
  const allPowers = React.useMemo(() => serviceContainer.cardSearchParamService.powerValues, []);
  const allToughnesses = React.useMemo(() => serviceContainer.cardSearchParamService.toughnessValues, []);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="left-panel-search-panel">
      <CardSetSelect
        allCardSets={allCardSets}
        key="card-set-select"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearCardSetSelection())}
        onOptionAdded={(cardSet: MtgSetDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addCardSet(cardSet))}
        onOptionRemoved={(cardSet: MtgSetDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeCardSet(cardSet))}
        selectedCardSets={searchViewmodel.selectedSets}
      />
      <BaseServerSelect<string>
        key="card-name-select"
        keyString="card-name-select"
        label="Card name"
        selectedItems={searchViewmodel.selectedCardNames}
        serverBaseUrl="catalog/CARD_NAMES/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onItemAdded={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addCardName(item))}
        onItemRemoved={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeCardName(item))}
        onClearSelectedItems={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearCardNameSelection())}
      />
      <ColorSelect
        allColors={allColors}
        colorType="card"
        label="Card color"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearColorSelection("card"))}
        onOptionAdded={(color: ColorDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addColor("card", color))}
        onOptionRemoved={(color: ColorDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeColor("card", color))}
        selectedColors={searchViewmodel.selectedCardColors}
      />
      <ColorSelect
        allColors={allColors}
        colorType="produced_mana"
        label="Produced mana color"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearColorSelection("produced_mana"))}
        onOptionAdded={(color: ColorDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addColor("produced_mana", color))}
        onOptionRemoved={(color: ColorDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeColor("produced_mana", color))}
        selectedColors={searchViewmodel.selectedProducedManaColors}
      />
      <ColorSelect
        allColors={allColors}
        colorType="identity"
        label="Identity color"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearColorSelection("identity"))}
        onOptionAdded={(color: ColorDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addColor("identity", color))}
        onOptionRemoved={(color: ColorDto) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeColor("identity", color))}
        selectedColors={searchViewmodel.selectedIdentityColors}
      />
      <BaseSelect<string>
        allItems={allRarities}
        key="rarity-select"
        label="Rarity"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearRaritiesSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addRarity(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeRarity(option))}
        selectedItems={searchViewmodel.selectedRarities}
      />
      <BaseSelect<string>
        allItems={allFormats}
        key="game-format-select"
        label="Game Format"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearGameFormatSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addGameFormat(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeGameFormat(option))}
        selectedItems={searchViewmodel.selectedGameFormats}
      />
      <BaseSelect<string>
        allItems={allCardTypes}
        key="card-type-select"
        label="Card type"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearCardTypeSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addCardType(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeCardType(option))}
        selectedItems={searchViewmodel.selectedTypes}
      />
      <BaseSelect<string>
        allItems={allSuperTypes}
        key="super-type-select"
        label="Super-type"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearSuperTypeSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addSuperType(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeSuperType(option))}
        selectedItems={searchViewmodel.selectedSuperTypes}
      />
      <BaseSelect<string>
        allItems={allPowers}
        key="power-select"
        label="Power"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearPowerSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addPower(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removePower(option))}
        selectedItems={searchViewmodel.selectedPowers}
      />
      <BaseSelect<string>
        allItems={allToughnesses}
        key="toughness-select"
        label="Toughness"
        onClearOptions={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearToughnessSelection())}
        onOptionAdded={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addToughness(option))}
        onOptionRemoved={(option: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeToughness(option))}
        selectedItems={searchViewmodel.selectedToughnesses}
      />
      <BaseServerSelect<string>
        key="card-sub-type-select"
        keyString="card-sub-type-select"
        label="Sub-type"
        selectedItems={searchViewmodel.selectedSubTypes}
        serverBaseUrl="card-sub-type"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onItemAdded={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addSubType(item))}
        onItemRemoved={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeSubType(item))}
        onClearSelectedItems={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearSubTypeSelection())}
      />
      <BaseServerSelect<string>
        key="ability-key-word-select"
        keyString="ability-key-word-select"
        label="Ability"
        selectedItems={searchViewmodel.selectedAbilities}
        serverBaseUrl="catalog/KEYWORD_ABILITIES/item"
        itemSort={(a: string, b: string) => a.localeCompare(b)}
        itemLabel={(item: string) => item}
        onItemAdded={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.addAbility(item))}
        onItemRemoved={(item: SelectOption<string>) => onSelectOptionEvent((v: CardSearchViewmodel) => v.removeAbility(item))}
        onClearSelectedItems={() => onSelectOptionEvent((v: CardSearchViewmodel) => v.clearAbilitySelection())}
      />
      <BaseServerSelect<string>
        key="action-key-word-select"
        keyString="action-key-word-select"
        label="Action"
        selectedItems={searchViewmodel.selectedActions}
        serverBaseUrl="catalog/KEYWORD_ACTIONS/item"
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
