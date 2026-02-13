import { CardLayout } from "../types";
import { LibraryCollectionCardImageStatusDto } from "./library-collection-card-image-status.dto";

export type LibraryCollectionCardDto = {
  cardBackId: string;
  cardName: string;
  code: string;
  collectorNumber: string;
  id: number;
  imageStatuses: Array<LibraryCollectionCardImageStatusDto>;
  layout: CardLayout;
  mtgSetId: number;
  rarity: string;
};
