import {
  AuthenticationViewmodelFactory
} from "../../viewmodel/factory/implementation/authentication-viewmodel.factory";
import { CollectionViewmodelFactory } from "../../viewmodel/factory/implementation/collection-viewmodel.factory";
import { MtgCardViewmodelFactory } from "../../viewmodel/factory/implementation/mtg-card-viewmodel.factory";
import { MtgSetViewmodelFactory } from "../../viewmodel/factory/implementation/mtg-set-viewmodel.factory";
import { SettingsViewmodelFactory } from "../../viewmodel/factory/implementation/settings-viewmodel.factory";
import { SynchronizationViewmodelFactory } from "../../viewmodel/factory/implementation/synchronization-viewmodel.factory";
import {
  IAuthenticationViewmodelFactory, ICollectionViewmodelFactory, IMtgCardViewmodelFactory,
  IMtgSetViewmodelFactory, ISettingsViewmodelFactory, ISynchronizationViewmodelFactory
} from "../../viewmodel/factory/interface";
import { IBasicDataService, ICollectionService, IMtgSetService, IViewmodelFactoryService } from "../interface";

export class ViewmodelFactoryService implements IViewmodelFactoryService {
  // #region Private fields ---------------------------------------------------
  private basicDataService!: IBasicDataService;
  private collectionService!: ICollectionService;
  private mtgSetService!: IMtgSetService;
  private _authenticationViewmodelFactory!: IAuthenticationViewmodelFactory;
  private _collectionViewmodelFactory!: ICollectionViewmodelFactory;
  private _mtgCardViewmodelFactory!: IMtgCardViewmodelFactory;
  private _mtgSetViewmodelFactory!: IMtgSetViewmodelFactory;
  private _settingsViewmodelFactory!: ISettingsViewmodelFactory;
  private _synchronizationViewmodelFactory!: ISynchronizationViewmodelFactory;
  // #endregion

  // #region IViewmodelFactoryService Members ---------------------------------
  public get authenticationViewmodelFactory(): IAuthenticationViewmodelFactory {
    return this._authenticationViewmodelFactory ??
      (this._authenticationViewmodelFactory = new AuthenticationViewmodelFactory());
  }

  public get collectionViewmodelFactory(): ICollectionViewmodelFactory {
    return this._collectionViewmodelFactory ??
      (this._collectionViewmodelFactory = new CollectionViewmodelFactory());
  }

  public get mtgSetViewmodelFactory(): IMtgSetViewmodelFactory {
    return this._mtgSetViewmodelFactory ??
      (this._mtgSetViewmodelFactory = new MtgSetViewmodelFactory(this.basicDataService));
  }

  public get mtgCardViewmodelFactory(): IMtgCardViewmodelFactory {
    return this._mtgCardViewmodelFactory ??
      (this._mtgCardViewmodelFactory = new MtgCardViewmodelFactory(
        this.basicDataService, this.collectionService, this.mtgSetService
      ));
  }

  public get settingsViewmodelFactory(): ISettingsViewmodelFactory {
    return this._settingsViewmodelFactory ??
      (this._settingsViewmodelFactory = new SettingsViewmodelFactory());
  }

  public get synchronizationViewmodelFactory(): ISynchronizationViewmodelFactory {
    return this._synchronizationViewmodelFactory ??
      (this._synchronizationViewmodelFactory = new SynchronizationViewmodelFactory(this.basicDataService));
  }

  public initialize(
    basicDataService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService
  ): void {
    this.basicDataService = basicDataService;
    this.collectionService = collectionService;
    this.mtgSetService = mtgSetService;
  }
  // #endregion
}
