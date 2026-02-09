import { LibraryCollectionCardDto } from "../../dto/library-collection-card.dto";
import { IArcaneArchiveProxy } from "../interface";
import { IMtgCardService } from "../interface/mtg-card.service";

export class MtgCardService implements IMtgCardService {
  //#region Private fields ----------------------------------------------------
  private arcaneArchiveProxy!: IArcaneArchiveProxy;
  //#endregion

  //#region IMtgCardService Members -------------------------------------------
  public getLibraryCollectionCardByCode(cardCode: string): Promise<LibraryCollectionCardDto> {
    return this.arcaneArchiveProxy.getData<LibraryCollectionCardDto>(
      "library",
      `/auth/card/collection-card/${cardCode}`
    );
  }

  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
  }
  //#endregion
}
