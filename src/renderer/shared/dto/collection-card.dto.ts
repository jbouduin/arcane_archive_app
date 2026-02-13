import { CollectionCardQuantityDto } from "./collection-card-quantity.dto";

export type CollectionCardDto = {
  id: number | null;
  collectionId: number;
  cardCode: string;
  setCode: string;
  language: string;
  quantities: Array<CollectionCardQuantityDto>;
};
