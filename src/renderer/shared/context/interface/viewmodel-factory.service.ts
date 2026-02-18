import {
  IAuthenticationViewmodelFactory, ICollectionViewmodelFactory, IMtgCardViewmodelFactory,
  IMtgSetViewmodelFactory, ISettingsViewmodelFactory
} from "../../viewmodel/factory/interface";
import { ISynchronizationViewmodelFactory } from "../../viewmodel/factory/interface/synchronization-viewmodel.factory";
import { IBasicDataService } from "./basic-data.service";
import { ICollectionService } from "./collection.service";
import { IMtgSetService } from "./mtg-set.service";

export interface IViewmodelFactoryService {
  readonly authenticationViewmodelFactory: IAuthenticationViewmodelFactory;
  readonly collectionViewmodelFactory: ICollectionViewmodelFactory;
  readonly mtgSetViewmodelFactory: IMtgSetViewmodelFactory;
  readonly mtgCardViewmodelFactory: IMtgCardViewmodelFactory;
  readonly settingsViewmodelFactory: ISettingsViewmodelFactory;
  readonly synchronizationViewmodelFactory: ISynchronizationViewmodelFactory;

  initialize(
    displayValueService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService
  ): void;
}
