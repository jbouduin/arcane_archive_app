import { CardDetailDto } from "../../dto";
import { LibraryCollectionCardDto } from "../../dto/library-collection-card.dto";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface IMtgCardService {
  getCardDetailByCardId(cardId: number): Promise<CardDetailDto>;
  getCardDetailByCardLanguageId(cardLanguageId: number): Promise<CardDetailDto>;
  getLibraryCollectionCardByCode(cardCode: string): Promise<LibraryCollectionCardDto>;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void;
}
