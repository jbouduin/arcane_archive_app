import { CollectionDto } from "../../../../../shared/dto";

export type CollectionCardsDialogDto = {
  cardsAndLanguages: Map<string, Array<string>>;
  collection: CollectionDto;
};
