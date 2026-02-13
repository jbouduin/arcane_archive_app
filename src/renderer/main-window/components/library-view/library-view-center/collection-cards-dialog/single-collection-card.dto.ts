import { CollectionCardDto } from "../../../../../shared/dto";
import { LibraryCollectionCardDto } from "../../../../../shared/dto/library-collection-card.dto";

export type SingleCollectionCardDto = {
  collectionCards: Array<CollectionCardDto>;
  libraryCard: LibraryCollectionCardDto;
};
