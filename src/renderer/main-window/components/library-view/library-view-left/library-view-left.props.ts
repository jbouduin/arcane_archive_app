import { Props } from "@blueprintjs/core";
import { MtgSetTreeViewmodel } from "../../../../shared/viewmodel";
import { CardSearchDto } from "../../../../shared/dto/card-search.dto";

export interface LibraryViewLeftProps extends Props {
  initialCardSearchDto: CardSearchDto;

  onSetSelectionChanged: (sets: Array<MtgSetTreeViewmodel>) => void;
  onAdvancedSearch: (cardSearch: CardSearchDto) => void;
}
