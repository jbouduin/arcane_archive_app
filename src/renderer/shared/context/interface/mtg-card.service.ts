import { LibraryCollectionCardDto } from "../../dto/library-collection-card.dto";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface IMtgCardService {
  getLibraryCollectionCardByCode(cardCode: string): Promise<LibraryCollectionCardDto>;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void;
}
