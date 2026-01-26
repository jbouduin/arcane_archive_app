import { CollectionCardQuantityDto } from "./collection-card-quantity.dto";

export type CollectionCardDto = {
  id: number | null;
  collectionId: number;
  setCode: string;
  collectorNumber: string;
  language: string;
  quantities: Array<CollectionCardQuantityDto>;
};
