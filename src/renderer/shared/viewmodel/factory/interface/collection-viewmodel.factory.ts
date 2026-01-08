import { CollectionDto } from "../../../dto";
import { CollectionTreeViewmodel, CollectionViewmodel } from "../../collection";

export interface ICollectionViewmodelFactory {
  getCollectionTreeViewmodel(dto: CollectionDto): CollectionTreeViewmodel;
  getCollectionViewmodel(dto: CollectionDto, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel;
  getNewCollectionViewmodel(folder: boolean, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel;
  getCollectionDetailViewmodel(dto: unknown): unknown;
}
