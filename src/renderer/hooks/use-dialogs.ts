import { noop } from "lodash";
import { PreferencesDto } from "../../common/dto";
import {
  CollectionCardsDialogProps, collectionCardsDialogPropsFactory
} from "../main-window/components/library-view/library-view-center/collection-cards-dialog";
import {
  collectionDialogPropsFactory, LoginDialogProps, loginDialogPropsFactory, MtgSetDialogProps,
  mtgSetDialogPropsFactory,
  PreferencesDialogPropsFactory,
  ProfileDialogProps,
  profileDialogPropsFactory,
  RegisterDialogProps,
  ResetPasswordDialogPropsFactory,
  SystemInfoDialogPropsFacotry
} from "../shared/components/dialogs";
import { ExportSetDialogProps, exportSetDialogPropsFactory } from "../shared/components/dialogs/export-set-dialog";
import { ChangePasswordDialogPropsFactory, RecoverPasswordDialogPropsFactory } from "../shared/components/dialogs/factories";
import { RegisterDialogPropsFactory } from "../shared/components/dialogs/register-dialog/register-dialog-factory";
import { ApiInfoContextType } from "../shared/context";
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
  function showChangePasswordDialog(userName: string, email: string): void {
    services.overlayService.openDialog(
      ChangePasswordDialogPropsFactory.getChangePasswordDialogProps(
        userName, email, services.viewmodelFactoryService.authenticationViewmodelFactory
      )
    );
  }

  function showCollectionCardsDialog(
    collection: CollectionDto,
    cardsAndLanguages: Map<string, Array<string>>
  ): void {
    collectionCardsDialogPropsFactory
      .getCollectionCardsDialogProps(
        collection,
        cardsAndLanguages,
        preferences.cardConditions,
        services.basicDataService,
        services.collectionService,
        services.mtgCardService,
        services.mtgSetService
      )
      .then(
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

  function showLoginDialog(showRegisterButton: boolean): void {
    loginDialogPropsFactory
      .getLoginDialogProps(
        showRegisterButton,
        services.ipcProxy,
        services.sessionService,
        services.viewmodelFactoryService.authenticationViewmodelFactory
      ).then(
        (props: LoginDialogProps) => services.overlayService.openDialog(props),
        noop
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

  function showPreferencesDialog(preferences: PreferencesDto): void {
    services.overlayService.openDialog(
      PreferencesDialogPropsFactory.getPreferencesDialogProps(
        preferences, services.viewmodelFactoryService.settingsViewmodelFactory)
    );
  }

  function showProfileDialog(): void {
    profileDialogPropsFactory
      .getProfileDialogProps(services.arcaneArchiveProxy, services.viewmodelFactoryService.authenticationViewmodelFactory)
      .then(
        (props: ProfileDialogProps) => services.overlayService.openDialog(props),
        noop
      );
  }
  function showRecoverPasswordDialog(): void {
    services.overlayService.openDialog(
      RecoverPasswordDialogPropsFactory.getRecoverPasswordDialogProps(
        services.viewmodelFactoryService.authenticationViewmodelFactory
      )
    );
  }

  function showRegisterDialog(showLoginButton: boolean, preferences: PreferencesDto): void {
    RegisterDialogPropsFactory
      .getRegisterDialogProps(
        showLoginButton,
        preferences,
        services.viewmodelFactoryService.authenticationViewmodelFactory,
        services.arcaneArchiveProxy,
        services.sessionService
      )
      .then(
        (props: RegisterDialogProps) => services.overlayService.openDialog(props),
        noop
      );
  }

  function showResetPasswordDialog(): void {
    services.overlayService.openDialog(
      ResetPasswordDialogPropsFactory.getResetPasswordDialogProps(
        services.viewmodelFactoryService.authenticationViewmodelFactory
      )
    );
  }

  function showSystemInfoDialog(apiInfo: ApiInfoContextType): void {
    services.overlayService.openDialog(
      SystemInfoDialogPropsFacotry.getSystemInfoDialogProps(
        apiInfo, services.viewmodelFactoryService.settingsViewmodelFactory
      )
    );
  }
  //#endregion

  //#region Return ------------------------------------------------------------
  return {
    showChangePasswordDialog,
    showCollectionCardsDialog,
    showEditCollectionDialog,
    showLoginDialog,
    showNewCollectionDialog,
    showExportSetDialog,
    showMtgSetDialog,
    showPreferencesDialog,
    showProfileDialog,
    showRecoverPasswordDialog,
    showRegisterDialog,
    showResetPasswordDialog,
    showSystemInfoDialog
  };
  //#endregion
}
