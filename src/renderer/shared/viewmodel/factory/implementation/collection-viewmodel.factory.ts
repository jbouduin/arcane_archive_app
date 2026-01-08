import { CollectionDto } from "../../../dto";
import { CollectionTreeViewmodel, CollectionViewmodel } from "../../collection";
import { ICollectionViewmodelFactory } from "../interface";

export class CollectionViewmodelFactory implements ICollectionViewmodelFactory {
  // #region ICollectionViewmodelFactory Members ------------------------------
  public getCollectionTreeViewmodel(dto: CollectionDto): CollectionTreeViewmodel {
    return new CollectionTreeViewmodel(dto);
  }

  public getCollectionViewmodel(dto: CollectionDto, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel {
    return new CollectionViewmodel(dto, parentDto, parentPath);
  }

  public getNewCollectionViewmodel(folder: boolean, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel {
    const newCollection: CollectionDto = {
      code: "",
      folder: folder,
      name: {},
      id: -1,
      createdAt: new Date(),
      createdBy: "",
      modifiedAt: null,
      modifiedBy: null,
      parentId: parentDto != null ? parentDto.id : null
    };
    return new CollectionViewmodel(newCollection, parentDto, parentPath);
  }

  public getCollectionDetailViewmodel(_dto: unknown): unknown {
    return {};
  }
  // #endregion
}
