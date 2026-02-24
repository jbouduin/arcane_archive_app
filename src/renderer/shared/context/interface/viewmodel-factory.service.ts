import {
  IAuthenticationViewmodelFactory, ICollectionViewmodelFactory, IDesktopViewmodelFactory, IMtgCardViewmodelFactory,
  IMtgSetViewmodelFactory, ISettingsViewmodelFactory, ISynchronizationViewmodelFactory
} from "../../viewmodel/factory/interface";
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
  readonly desktopViewmodelFactory: IDesktopViewmodelFactory;

  initialize(
    displayValueService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService
  ): void;
}
