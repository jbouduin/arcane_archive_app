import { CollectionCardListDto } from "../../dto";
import { CollectionViewDto } from "../../dto/desktop";

import { IBaseCardSearchService } from "./base-card-search.service";

export type ICollectionCardSearchService = IBaseCardSearchService<CollectionCardListDto, CollectionViewDto>;
