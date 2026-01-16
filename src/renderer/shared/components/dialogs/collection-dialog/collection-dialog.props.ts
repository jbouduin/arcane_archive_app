import { CollectionDto } from "../../../dto";
import { CollectionViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type CollectionDialogProps = BaseDialogProps<CollectionDto, CollectionViewmodel>;
export type CollectionDialogBodyProps = BaseDialogBodyProps<CollectionDto, CollectionViewmodel>;
export type CollectionDialogFooterProps = DefaultDialogFooterProps<CollectionDto, CollectionViewmodel> & {
  onCollectionAdded: (dto: CollectionDto) => void;
  onCollectionModified: (dto: CollectionDto) => void;
};
