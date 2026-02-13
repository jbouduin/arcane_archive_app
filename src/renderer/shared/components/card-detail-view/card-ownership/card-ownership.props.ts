import { Props } from "@blueprintjs/core";

export interface CardownershipProps extends Props {
  collectionId: number;
  cardCode: string;
  language: string;

  onQuantityChanged: (qty: number) => void;
}
