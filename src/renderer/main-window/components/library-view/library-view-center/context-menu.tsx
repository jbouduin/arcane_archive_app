import { Menu, MenuItem } from "@blueprintjs/core";
import { useDialogs } from "../../../../hooks";
import { onDataSelected } from "../../../../shared/components/base/base-table";
import { CollectionDto } from "../../../../shared/dto";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel";
import { ContextMenuProps } from "./context-menu.props";

export function ContextMenu(props: ContextMenuProps): JSX.Element | undefined {
  //#region Hooks -------------------------------------------------------------
  const { showCollectionCardsDialog } = useDialogs();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function onCollectionClick(collection: CollectionDto): void {
    const cards = onDataSelected(props.menuContext.getRegions(), props.data);
    const cardsAndLanguages = new Map<string, Array<string>>();
    cards.forEach((card: LibraryCardListViewmodel) => cardsAndLanguages.set(card.cardCode, card.languageArray));
    showCollectionCardsDialog(collection, cardsAndLanguages);
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  if (props.collections.length > 0 && props.rootCollection != null) {
    return (
      <Menu size="small">
        <MenuItem text="Add to">
          {buildContextMenuRecursive(props.collections, props.rootCollection)}
        </MenuItem>
      </Menu>
    );
  } else {
    return undefined;
  }

  function buildContextMenuRecursive(
    collections: Array<CollectionDto>, parentCollection: CollectionDto
  ): Array<JSX.Element> {
    return collections
      .filter((collection: CollectionDto) => collection.parentId == parentCollection.id)
      .sort((a: CollectionDto, b: CollectionDto) => {
        if (a.type == "FOLDER" && b.type != "FOLDER") {
          return -1;
        } else if (a.type != "FOLDER" && b.type == "FOLDER") {
          return 1;
        } else {
          /**
           * # TODO check code base on localcompare with casefirst, it should be almost everywhere
           * or better: extract it to a utility or put it into collectionService
           */
          return a.collectionName.localeCompare(b.collectionName, undefined, { caseFirst: "false" });
        }
      })
      .map((collection: CollectionDto) => {
        if (collection.type == "FOLDER") {
          return (
            <MenuItem
              key={collection.code}
              text={collection.collectionName}
            >
              {buildContextMenuRecursive(collections, collection)}
            </MenuItem>
          );
        } else {
          return (
            <MenuItem
              key={collection.code}
              text={collection.collectionName}
              onClick={() => onCollectionClick(collection)}
            />
          );
        }
      });
  }
  //#endregion
}
