import { CollectionDto } from "../../../dto";
import { CollectionViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type CollectionDialogProps = BaseDialogProps<CollectionDto, CollectionViewmodel>;
export type CollectionDialogBodyProps = BaseDialogBodyProps<CollectionDto, CollectionViewmodel>;
export type CollectionDialogFooterProps = BaseDialogFooterProps<CollectionDto, CollectionViewmodel> & {
  onCollectionAdded: (dto: CollectionDto) => void;
  onCollectionModified: (dto: CollectionDto) => void;
};
