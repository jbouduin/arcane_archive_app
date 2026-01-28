import { BaseCardListDto } from "./base-card-list.dto";

export type LibraryCardListDto = BaseCardListDto & {
  languages: Array<string>;
};
