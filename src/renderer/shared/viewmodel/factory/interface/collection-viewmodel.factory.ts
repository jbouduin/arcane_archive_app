import { ScryFallImageStatus } from "../../../../../common/enums";
import { CollectionCardDto, CollectionDto } from "../../../dto";
import { CardConditionDto } from "../../../dto/card-condition.dto";
import { CollectionType, SelectOption } from "../../../types";
import { ViewmodelMode } from "../../base.viewmodel";
import { CollectionCardViewmodel, CollectionTreeViewmodel, CollectionViewmodel } from "../../collection";

export interface ICollectionViewmodelFactory {
  getCollectionCardViewmodel(
    dto: CollectionCardDto,
    imageStatus: ScryFallImageStatus,
    mode: ViewmodelMode,
    cardConditions: Array<SelectOption<CardConditionDto>>
  ): CollectionCardViewmodel;
  getCollectionTreeViewmodel(dto: CollectionDto): CollectionTreeViewmodel;
  getCollectionViewmodel(dto: CollectionDto, parentDto: CollectionDto): CollectionViewmodel;
  getNewCollectionViewmodel(type: CollectionType, parentDto: CollectionDto): CollectionViewmodel;
  getCollectionDetailViewmodel(dto: unknown): unknown;
}
