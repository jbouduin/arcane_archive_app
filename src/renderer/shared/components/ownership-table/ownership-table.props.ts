import { Props } from "@blueprintjs/core";
import { CollectionCardViewmodel } from "../../viewmodel";
import { SelectOption } from "../../types";
import { CardConditionDto } from "../../dto/card-condition.dto";

export interface OwnershipTableProps extends Props {
  collectionCardViewmodel: CollectionCardViewmodel;
  /**
   * Array of card conditions to be displayed in the table
   */
  cardConditions: Array<SelectOption<CardConditionDto>>;

  viewmodelChanged: () => void;
}
