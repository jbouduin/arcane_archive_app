import { BaseDialogBodyProps, BaseDialogProps, DefaultDialogFooterProps } from "../../../../../shared/components/base/base-dialog";
import { CollectionCardDto } from "../../../../../shared/dto";
import { CollectionCardViewmodel } from "../../../../../shared/viewmodel";

export type CollectionCardDialogProps = BaseDialogProps<CollectionCardDto, CollectionCardViewmodel>;
export type CollectionCardDialogBodyProps = BaseDialogBodyProps<CollectionCardDto, CollectionCardViewmodel>;
export type CollectionCardDialogFooterProps = DefaultDialogFooterProps<CollectionCardDto, CollectionCardViewmodel>;
