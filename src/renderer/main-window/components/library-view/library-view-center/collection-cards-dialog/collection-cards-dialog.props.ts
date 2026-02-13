import {
  BaseDialogBodyProps,
  BaseDialogProps,
  DefaultDialogFooterProps
} from "../../../../../shared/components/base/base-dialog";
import { CollectionCardsDialogDto } from "./collection-cards-dialog.dto";
import { CollectionCardsDialogViewmodel } from "./collection-cards-dialog.viewmodel";

export type CollectionCardsDialogProps = BaseDialogProps<
  CollectionCardsDialogDto, CollectionCardsDialogViewmodel
>;
export type CollectionCardsDialogBodyProps = BaseDialogBodyProps<
  CollectionCardsDialogDto, CollectionCardsDialogViewmodel
>;
export type CollectionCardsDialogFooterProps = DefaultDialogFooterProps<
  CollectionCardsDialogDto, CollectionCardsDialogViewmodel
>;
