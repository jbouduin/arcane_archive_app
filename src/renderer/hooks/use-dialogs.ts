import { noop } from "lodash";
import {
  CollectionCardsDialogProps, collectionCardsDialogPropsFactory
} from "../main-window/components/library-view/library-view-center/collection-cards-dialog";
import {
  collectionDialogPropsFactory, MtgSetDialogProps, mtgSetDialogPropsFactory
} from "../shared/components/dialogs";
import { ExportSetDialogProps, exportSetDialogPropsFactory } from "../shared/components/dialogs/export-set-dialog";
import { CollectionDto } from "../shared/dto";
import { CollectionType } from "../shared/types";
import { usePreferences } from "./use-preferences";
import { useServices } from "./use-services";
import { useSession } from "./use-session";

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
export function useDialogs() {
  //#region Hooks -------------------------------------------------------------
  const services = useServices();
  const { loggedIn } = useSession();
  const { preferences } = usePreferences();
  //#endregion

  //#region Dialog methods ----------------------------------------------------
  function showCollectionCardsDialog(
    collection: CollectionDto,
    cardsAndLanguages: Map<string, Array<string>>
  ): void {
    collectionCardsDialogPropsFactory.getCollectionCardsDialogProps(
      collection,
      cardsAndLanguages,
      preferences.cardConditions,
      services.basicDataService,
      services.collectionService,
      services.mtgCardService,
      services.mtgSetService
    ).then(
      (props: CollectionCardsDialogProps) => services.overlayService.openDialog(props),
      noop
    );
  }

  function showEditCollectionDialog(
    collection: CollectionDto,
    parent: CollectionDto,
    onCollectionModified: (dto: CollectionDto) => void
  ): void {
    services.overlayService.openDialog(
      collectionDialogPropsFactory.getEditCollectionDialogProps(
        collection, parent, services.viewmodelFactoryService, onCollectionModified
      )
    );
  }

  function showNewCollectionDialog(
    type: CollectionType,
    parent: CollectionDto,
    onCollectionAdded: (dto: CollectionDto) => void
  ): void {
    services.overlayService.openDialog(
      collectionDialogPropsFactory.getNewCollectionDialogProps(
        type, parent, services.viewmodelFactoryService, onCollectionAdded
      )
    );
  }

  function showExportSetDialog(cardSetId: number): void {
    if (loggedIn) {
      exportSetDialogPropsFactory
        .getExportSetDialogProps(
          cardSetId,
          preferences.cardConditions,
          services.collectionService,
          services.mtgSetService,
          services.viewmodelFactoryService
        )
        .then(
          (props: ExportSetDialogProps) => services.overlayService.openDialog(props),
          noop
        );
    } else {
      services.overlayService.showToast(
        {
          intent: "warning",
          icon: "log-in",
          message: "You have to be logged in to export set data."
        }
      );
    }
  }

  function showMtgSetDialog(cardSetId: number): void {
    mtgSetDialogPropsFactory
      .getSetDialogProps(cardSetId, services.mtgSetService, services.viewmodelFactoryService)
      .then((props: MtgSetDialogProps) => services.overlayService.openDialog(props), noop);
  }
  //#endregion

  //#region Return ------------------------------------------------------------
  return {
    showCollectionCardsDialog,
    showEditCollectionDialog,
    showNewCollectionDialog,
    showExportSetDialog,
    showMtgSetDialog: showMtgSetDialog
  };
  //#endregion
}
