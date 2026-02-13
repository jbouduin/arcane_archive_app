import { Button } from "@blueprintjs/core";
import { useCallback } from "react";
import { AppColorDto, CollectionDto, MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { CardSetIcon } from "../card-set-icon";
import { CardSymbolRenderer } from "../card-symbol-renderer";
import { BaseMultiSelect } from "../input";
import { AdvancedCardSearchProps } from "./advanced-card-search.props";

export function AdvancedCardSearch(props: AdvancedCardSearchProps): JSX.Element {
  //#region Initialization ----------------------------------------------------
  const searchViewmodel = props.viewmodel;
  //#endregion

  //#region Memo --------------------------------------------------------------
  const setImageRenderer = useCallback(
    (option: SelectOption<MtgSetTreeDto>) => (
      <CardSetIcon keyruneCode={option.value.keyruneCode} />
    ),
    []
  );
  const colorSymbolRenderer = useCallback(
    (option: SelectOption<AppColorDto>) => (
      <CardSymbolRenderer cardSymbols={[option.value.manaSymbol]} className="mana-cost-image-in-text" />
    ),
    []
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <div className="left-panel-search-panel">
      {/* --- Collections --- */}
      {
        searchViewmodel.useCollections && (
          <BaseMultiSelect
            fieldName="collectionIds"
            label="Collection"
            viewmodel={searchViewmodel}
            viewmodelChanged={props.viewmodelChanged}
            idExtractor={(value: CollectionDto) => value.id}
          />
        )
      }
      {/* --- Card sets --- */}
      <BaseMultiSelect
        fieldName="cardSetIds"
        label="Card Set"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: MtgSetTreeDto) => value.id}
        preTextElement={setImageRenderer}
      />
      {/* TODO --- Card names --- */}
      {/* --- Card Colors --- */}
      <BaseMultiSelect
        fieldName="cardColors"
        label="Card Color"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: AppColorDto) => value.code}
        preTextElement={colorSymbolRenderer}
      />
      {/* --- Produced Mana Colors --- */}
      <BaseMultiSelect
        fieldName="producedManaColors"
        label="Produced Mana"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: AppColorDto) => value.code}
        preTextElement={colorSymbolRenderer}
      />
      {/* --- Identity colors */}
      <BaseMultiSelect
        fieldName="identityColors"
        label="Identity Color"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: AppColorDto) => value.code}
        preTextElement={colorSymbolRenderer}
      />
      {/* --- rarity --- */}
      <BaseMultiSelect
        fieldName="rarities"
        label="Rarity"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- game format --- */}
      <BaseMultiSelect
        fieldName="gameFormats"
        label="Game Format"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- Types --- */}
      <BaseMultiSelect
        fieldName="types"
        label="Card Type"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- Super-types --- */}
      <BaseMultiSelect
        fieldName="superTypes"
        label="Super-type"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* TODO --- sub-types --- */}
      {/* --- Power --- */}
      <BaseMultiSelect
        fieldName="powers"
        label="Power"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- Thoughness --- */}
      <BaseMultiSelect
        fieldName="toughnesses"
        label="Toughness"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* TODO --- Abilities --- */}
      {/* TDDO --- Keywords --- */}
      <Button
        icon="search"
        onClick={() => props.search(searchViewmodel.dtoToSave)}
      >
        Search
      </Button>
    </div>
  );
  //#endregion
}
