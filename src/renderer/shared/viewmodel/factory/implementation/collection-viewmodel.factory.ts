import { ScryFallImageStatus } from "../../../../../common/enums";
import { CollectionCardDto, CollectionDto } from "../../../dto";
import { CardConditionDto } from "../../../dto/card-condition.dto";
import { CollectionType, SelectOption } from "../../../types";
import { ViewmodelMode } from "../../base.viewmodel";
import { CollectionCardViewmodel, CollectionTreeViewmodel, CollectionViewmodel } from "../../collection";
import { ICollectionViewmodelFactory } from "../interface";

export class CollectionViewmodelFactory implements ICollectionViewmodelFactory {
  // #region ICollectionViewmodelFactory Members ------------------------------
  public getCollectionCardViewmodel(
    dto: CollectionCardDto,
    imageStatus: ScryFallImageStatus,
    mode: ViewmodelMode,
    cardConditions: Array<SelectOption<CardConditionDto>>
  ): CollectionCardViewmodel {
    return new CollectionCardViewmodel(dto, imageStatus, mode, cardConditions);
  }

  public getCollectionTreeViewmodel(dto: CollectionDto): CollectionTreeViewmodel {
    return new CollectionTreeViewmodel(dto);
  }

  public getCollectionViewmodel(dto: CollectionDto, parentDto: CollectionDto): CollectionViewmodel {
    return new CollectionViewmodel(dto, parentDto.code, "update");
  }

  public getNewCollectionViewmodel(type: CollectionType, parentDto: CollectionDto): CollectionViewmodel {
    const newCollection: CollectionDto = {
      code: "",
      collectionName: "",
      description: null,
      type: type,
      name: {},
      createdAt: null,
      createdBy: null,
      modifiedAt: null,
      modifiedBy: null,
      parentId: parentDto.id!
    };
    return new CollectionViewmodel(newCollection, parentDto?.code, "create");
  }

  public getCollectionDetailViewmodel(_dto: unknown): unknown {
    return {};
  }
  // #endregion
}
