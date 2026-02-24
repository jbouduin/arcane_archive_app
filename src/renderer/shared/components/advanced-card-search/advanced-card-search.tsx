import { Button } from "@blueprintjs/core";
import { useCallback } from "react";
import { AppColorDto, CollectionDto, MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { CardSetIcon } from "../card-set-icon";
import { CardSymbolRenderer } from "../card-symbol-renderer";
import { AaClientSelect } from "../input";
import { AdvancedCardSearchProps } from "./advanced-card-search.props";
import { AaServerSelect } from "../input/aa-select/aa-server-select";

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
      <CardSymbolRenderer cardSymbols={[option.value.manaSymbol]} className="aa-mana-cost-in-tag" />
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
          <AaClientSelect
            fieldName="collectionIds"
            label="Collection"
            viewmodel={searchViewmodel}
            viewmodelChanged={props.viewmodelChanged}
            idExtractor={(value: CollectionDto) => value.id}
          />
        )
      }
      {/* --- Card sets --- */}
      <AaClientSelect
        fieldName="cardSetIds"
        label="Card Set"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: MtgSetTreeDto) => value.id}
        preTextElement={setImageRenderer}
      />
      {/* --- Card names --- */}
      <AaServerSelect
        fieldName="cardNames"
        label="Card Name"
        server="library"
        serverBaseUrl="/public/catalog/CARD_NAMES/item"
        viewmodel={searchViewmodel}
        idExtractor={(value: string) => value}
        itemLabel={(item: string) => item}
        viewmodelChanged={props.viewmodelChanged}
      />
      {/* --- Card Colors --- */}
      <AaClientSelect
        fieldName="cardColors"
        label="Card Color"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: AppColorDto) => value.code}
        preTextElement={colorSymbolRenderer}
      />
      {/* --- Produced Mana Colors --- */}
      <AaClientSelect
        fieldName="producedManaColors"
        label="Produced Mana"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: AppColorDto) => value.code}
        preTextElement={colorSymbolRenderer}
      />
      {/* --- Identity colors */}
      <AaClientSelect
        fieldName="identityColors"
        label="Identity Color"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: AppColorDto) => value.code}
        preTextElement={colorSymbolRenderer}
      />
      {/* --- rarity --- */}
      <AaClientSelect
        fieldName="rarities"
        label="Rarity"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- game format --- */}
      <AaClientSelect
        fieldName="gameFormats"
        label="Game Format"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- Types --- */}
      <AaClientSelect
        fieldName="types"
        label="Card Type"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- Super-types --- */}
      <AaClientSelect
        fieldName="superTypes"
        label="Super-type"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- sub-types --- */}
      <AaServerSelect
        fieldName="subTypes"
        label="Sub-type"
        server="library"
        serverBaseUrl="/public/card-sub-type"
        viewmodel={searchViewmodel}
        idExtractor={(value: string) => value}
        itemLabel={(item: string) => item}
        viewmodelChanged={props.viewmodelChanged}
      />
      {/* --- Power --- */}
      <AaClientSelect
        fieldName="powers"
        label="Power"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- Thoughness --- */}
      <AaClientSelect
        fieldName="toughnesses"
        label="Toughness"
        viewmodel={searchViewmodel}
        viewmodelChanged={props.viewmodelChanged}
        idExtractor={(value: string) => value}
      />
      {/* --- Abilities --- */}
      <AaServerSelect
        fieldName="abilities"
        label="Ability"
        server="library"
        serverBaseUrl="/public/catalog/KEYWORD_ABILITIES/item"
        viewmodel={searchViewmodel}
        idExtractor={(value: string) => value}
        itemLabel={(item: string) => item}
        viewmodelChanged={props.viewmodelChanged}
      />
      {/* --- Keywords --- */}
      <AaServerSelect
        fieldName="actions"
        label="Action"
        server="library"
        serverBaseUrl="/public/catalog/KEYWORD_ACTIONS/item"
        viewmodel={searchViewmodel}
        idExtractor={(value: string) => value}
        itemLabel={(item: string) => item}
        viewmodelChanged={props.viewmodelChanged}
      />
      <Button
        icon="search"
        onClick={() => props.search()}
      >
        Search
      </Button>
    </div>
  );
  //#endregion
}
