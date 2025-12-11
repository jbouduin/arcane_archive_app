import { ColorDto } from "./color.dto";
import { MtgSetTreeDto } from "./mtg-set-tree.dto";

export type CardSearchDto = {
  selectedAbilities: Array<string>;
  selectedActions: Array<string>;
  selectedCardColors: Array<ColorDto>;
  selectedCardNames: Array<string>;
  selectedIdentityColors: Array<ColorDto>;
  selectedGameFormats: Array<string>;
  selectedProducedManaColors: Array<ColorDto>;
  selectedPowers: Array<string>;
  selectedRarities: Array<string>;
  selectedSets: Array<MtgSetTreeDto>;
  selectedSubTypes: Array<string>;
  selectedSuperTypes: Array<string>;
  selectedToughnesses: Array<string>;
  selectedTypes: Array<string>;
};
