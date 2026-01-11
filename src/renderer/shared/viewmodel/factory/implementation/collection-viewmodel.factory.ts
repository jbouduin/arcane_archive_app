import { CollectionDto } from "../../../dto";
import { CollectionType } from "../../../types";
import { CollectionTreeViewmodel, CollectionViewmodel } from "../../collection";
import { ICollectionViewmodelFactory } from "../interface";

export class CollectionViewmodelFactory implements ICollectionViewmodelFactory {
  // #region ICollectionViewmodelFactory Members ------------------------------
  public getCollectionTreeViewmodel(dto: CollectionDto): CollectionTreeViewmodel {
    return new CollectionTreeViewmodel(dto);
  }

  public getCollectionViewmodel(dto: CollectionDto, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel {
    return new CollectionViewmodel(dto, parentDto, parentPath, "update");
  }

  public getNewCollectionViewmodel(type: CollectionType, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel {
    const newCollection: CollectionDto = {
      code: "",
      type: type,
      name: {},
      createdAt: null,
      createdBy: null,
      modifiedAt: null,
      modifiedBy: null,
      parentId: parentDto != null ? parentDto.id! : null
    };
    return new CollectionViewmodel(newCollection, parentDto, parentPath, "create");
  }

  public getCollectionDetailViewmodel(_dto: unknown): unknown {
    return {};
  }
  // #endregion
}
