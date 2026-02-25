import { Props } from "@blueprintjs/core";
import { OnQuantityChangedHandler } from "./card-ownership";

interface LibraryModeProps extends Props {
  mode: "library";
  cardId: number;
}

interface CollectionModeProps extends Props {
  mode: "collection";
  cardLanguageId: number;
  collectionId: number;
  onQuantityChanged?: OnQuantityChangedHandler;
}

export type CardDetailViewProps = LibraryModeProps | CollectionModeProps;
