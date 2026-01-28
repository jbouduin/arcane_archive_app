import { BaseCardListDto } from "./base-card-list.dto";

export type CollectionCardListDto = BaseCardListDto & {
  language: string;
};
