import { CollectionDto } from "../../../dto";
import { CollectionViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type CollectionDialogProps = BaseDialogPropsNew<CollectionDto, CollectionViewmodel>;
export type CollectionDialogBodyProps = BaseDialogBodyPropsNew<CollectionDto, CollectionViewmodel>;
export type CollectionDialogFooterProps = BaseDialogFooterPropsNew<CollectionDto, CollectionViewmodel> & {
  onCollectionAdded: (dto: CollectionDto) => void;
  onCollectionModified: (dto: CollectionDto) => void;
};
