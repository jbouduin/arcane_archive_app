import { CollectionCardListDto, LibraryCardListDto } from "../../../dto";
import { CollectionViewDto, LibraryViewDto } from "../../../dto/desktop";
import { CollectionViewViewmodel } from "../../desktop";
import { LibraryViewViewmodel } from "../../desktop/library-view.viewmodel";
import { SearchCallback } from "./types";

export interface IDesktopViewmodelFactory {
  getLibraryViewViewmodel(
    dto: LibraryViewDto,
    searchCallback: SearchCallback<LibraryCardListDto, LibraryViewDto>
  ): LibraryViewViewmodel;
  getCollectionViewViewmodel(
    dto: CollectionViewDto,
    searchCallback: SearchCallback<CollectionCardListDto, CollectionViewDto>
  ): CollectionViewViewmodel;
}
