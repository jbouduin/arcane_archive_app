import { CollectionDto } from "../../../dto";
import { CollectionViewmodel, CollectionViewmodelField } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type CollectionDialogProps = BaseDialogProps<CollectionDto, CollectionViewmodelField, CollectionViewmodel>;
export type CollectionDialogBodyProps = BaseDialogBodyProps<CollectionDto, CollectionViewmodelField, CollectionViewmodel>;
export type CollectionDialogFooterProps = BaseDialogFooterProps<CollectionDto, CollectionViewmodelField, CollectionViewmodel> & {
  onCollectionAdded: (dto: CollectionDto) => void;
  onCollectionModified: (dto: CollectionDto) => void;
};
