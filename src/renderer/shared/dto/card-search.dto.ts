import { ColorDto } from "./color.dto";
import { MtgSetDto } from "./mtg-set.dto";

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
  selectedSets: Array<MtgSetDto>;
  selectedSubTypes: Array<string>;
  selectedSuperTypes: Array<string>;
  selectedToughnesses: Array<string>;
  selectedTypes: Array<string>;
};
