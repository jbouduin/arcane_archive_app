import { LibraryCardListDto } from "../../dto";
import { LibraryViewDto } from "../../dto/desktop";

import { IBaseCardSearchService } from "./base-card-search.service";

export type ILibraryCardSearchService = IBaseCardSearchService<LibraryCardListDto, LibraryViewDto>;
