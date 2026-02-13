import { Props } from "@blueprintjs/core";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { AdvancedCardSearchViewmodel } from "../../../../shared/viewmodel";

export interface LibraryViewLeftProps extends Props {
  viewmodel: AdvancedCardSearchViewmodel;
  currentSelectedSearchTab: string | number;

  selectedSearchTabChanged: (newSelectedSearchTab: string | number) => void;
  viewmodelChanged: () => void;
  search: (dto: CardQueryFilterDto, setsOnly: boolean) => void;
}
