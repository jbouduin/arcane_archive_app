import { SetTreeSettingsDto } from "../../../../common/dto";
import { LibraryCardListDto } from "../library-card-list.dto";
import { BaseDesktopViewDto } from "./base-desktop-view.dto";

export type LibraryViewDto = BaseDesktopViewDto<LibraryCardListDto> & {
  treeConfiguration: SetTreeSettingsDto;
};
