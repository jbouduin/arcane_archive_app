import { Props } from "@blueprintjs/core";

interface LibraryModeProps extends Props {
  mode: "library";
  cardId: number;
}

interface CollectionModeProps extends Props {
  mode: "collection";
  cardLanguageId: number;
  collectionId: number;
  onQuantityChanged?: (qty: number) => void;
}

export type CardDetailViewProps = LibraryModeProps | CollectionModeProps;
