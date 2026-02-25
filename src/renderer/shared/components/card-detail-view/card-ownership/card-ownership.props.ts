import { Props } from "@blueprintjs/core";

export type OnQuantityChangedHandler = (cardLanguageId: number, collectionId: number, totalQuantity: number) => void;

export interface CardownershipProps extends Props {
  cardLanguageId: number;
  collectionId: number;
  cardCode: string;
  language: string;

  onQuantityChanged: OnQuantityChangedHandler;
}
