import { BaseCardListDto } from "./base-card-list.dto";

export type CollectionCardListDto = BaseCardListDto & {
  collectionId: number;
  language: string;
  quantity: number;
};
