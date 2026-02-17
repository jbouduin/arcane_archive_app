import { Props } from "@blueprintjs/core";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { AdvancedCardSearchViewmodel, MtgSetTreeConfigurationViewmodel } from "../../../../shared/viewmodel";

export interface LibraryViewLeftProps extends Props {
  viewmodel: AdvancedCardSearchViewmodel;
  currentSelectedSearchTab: string | number;
  treeConfiguration: MtgSetTreeConfigurationViewmodel;

  search: (dto: CardQueryFilterDto, setsOnly: boolean) => void;
  selectedSearchTabChanged: (newSelectedSearchTab: string | number) => void;
  treeConfigurationChanged: (configuration: MtgSetTreeConfigurationViewmodel) => void;
  viewmodelChanged: () => void;
}
