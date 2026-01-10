import { CollectionDto } from "../../../dto";
import { CollectionType } from "../../../types";
import { CollectionTreeViewmodel, CollectionViewmodel } from "../../collection";

export interface ICollectionViewmodelFactory {
  getCollectionTreeViewmodel(dto: CollectionDto): CollectionTreeViewmodel;
  getCollectionViewmodel(dto: CollectionDto, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel;
  getNewCollectionViewmodel(type: CollectionType, parentDto: CollectionDto | null, parentPath: Array<string>): CollectionViewmodel;
  getCollectionDetailViewmodel(dto: unknown): unknown;
}
