import { Props } from "@blueprintjs/core";

export interface CardHeaderViewProps extends Props {
  code: string;
  cardName: string;
  rarity: string;
  keyruneCode: string;
  type: string;
}
