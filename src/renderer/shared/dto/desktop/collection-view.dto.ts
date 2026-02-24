import { CollectionCardListDto } from "../collection-card-list.dto";
import { BaseDesktopViewDto } from "./base-desktop-view.dto";

export type CollectionViewDto = BaseDesktopViewDto<CollectionCardListDto> & {
  selectedCollection: number | null;
};
