import { noop } from "lodash";
import { PreferencesDto } from "../../common/dto";
import {
  CollectionCardsDialogProps, collectionCardsDialogPropsFactory
} from "../main-window/components/library-view/library-view-center/collection-cards-dialog";
import {
  changePasswordDialogPropsFactory,
  collectionDialogPropsFactory,
  ExportSetDialogProps, exportSetDialogPropsFactory,
  LoginDialogProps, loginDialogPropsFactory,
  MtgSetDialogProps, mtgSetDialogPropsFactory,
  preferencesDialogPropsFactory,
  ProfileDialogProps, profileDialogPropsFactory,
  recoverPasswordDialogPropsFactory,
  RegisterDialogProps, registerDialogPropsFactory,
  resetPasswordDialogPropsFactory,
  SynchronizationDialogProps, synchronizationDialogPropsFactory,
  systemInfoDialogPropsFacotry,
  SystemSettingsDialogProps, systemSettingsDialogPropsFactory
} from "../shared/components/dialogs";
import { ApiInfoContextType } from "../shared/context";
import { CollectionDto, MtgSetTreeDto } from "../shared/dto";
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
      changePasswordDialogPropsFactory.getChangePasswordDialogProps(
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
        collection, parent, services.viewmodelFactoryService.collectionViewmodelFactory, onCollectionModified
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
        type, parent, services.viewmodelFactoryService.collectionViewmodelFactory, onCollectionAdded
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
          services.viewmodelFactoryService.mtgSetViewmodelFactory
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
      .getSetDialogProps(cardSetId, services.mtgSetService, services.viewmodelFactoryService.mtgSetViewmodelFactory)
      .then((props: MtgSetDialogProps) => services.overlayService.openDialog(props), noop);
  }

  function showPreferencesDialog(preferences: PreferencesDto): void {
    services.overlayService.openDialog(
      preferencesDialogPropsFactory.getPreferencesDialogProps(
        preferences, services.viewmodelFactoryService.settingsViewmodelFactory)
    );
  }

  function showProfileDialog(): void {
    profileDialogPropsFactory
      .getProfileDialogProps(
        services.arcaneArchiveProxy,
        services.viewmodelFactoryService.authenticationViewmodelFactory
      )
      .then(
        (props: ProfileDialogProps) => services.overlayService.openDialog(props),
        noop
      );
  }

  function showRecoverPasswordDialog(): void {
    services.overlayService.openDialog(
      recoverPasswordDialogPropsFactory.getRecoverPasswordDialogProps(
        services.viewmodelFactoryService.authenticationViewmodelFactory
      )
    );
  }

  function showRegisterDialog(showLoginButton: boolean, preferences: PreferencesDto): void {
    registerDialogPropsFactory
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
      resetPasswordDialogPropsFactory.getResetPasswordDialogProps(
        services.viewmodelFactoryService.authenticationViewmodelFactory
      )
    );
  }

  function showSynchronizationDialog(): void {
    void synchronizationDialogPropsFactory
      .getSynchronizationDialogProps(
        services.synchronizeService, services.viewmodelFactoryService.synchronizationViewmodelFactory
      )
      .then((props: SynchronizationDialogProps) => services.overlayService.openDialog(props));
  }

  // NOW we have to pass MtgSetTree
  function showSynchronizeSetDialog(cardSet: MtgSetTreeDto): void {
    services.overlayService.openDialog(
      synchronizationDialogPropsFactory.getSynchronizeSetDialogProps(
        cardSet,
        services.viewmodelFactoryService.synchronizationViewmodelFactory
      )
    );
  }

  function showSystemInfoDialog(apiInfo: ApiInfoContextType): void {
    services.overlayService.openDialog(
      systemInfoDialogPropsFacotry.getSystemInfoDialogProps(
        apiInfo, services.viewmodelFactoryService.settingsViewmodelFactory
      )
    );
  }

  function showSystemSettingsDialog(firstTime: boolean): void {
    systemSettingsDialogPropsFactory
      .getSystemSettingsDialogProps(
        firstTime, services.ipcProxy, services.viewmodelFactoryService.settingsViewmodelFactory
      )
      .then(
        (props: SystemSettingsDialogProps) => services.overlayService.openDialog(props),
        noop
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
    showSynchronizationDialog,
    showSynchronizeSetDialog,
    showSystemInfoDialog,
    showSystemSettingsDialog
  };
  //#endregion
}
