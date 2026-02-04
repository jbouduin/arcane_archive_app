import {
  IAuthenticationViewmodelFactory, ICollectionViewmodelFactory, IMtgCardViewmodelFactory,
  IMtgSetViewmodelFactory, ISettingsViewmodelFactory
} from "../../viewmodel/factory/interface";
import { IBasicDataService } from "./basic-data.service";
import { IMtgSetService } from "./mtg-set.service";

export interface IViewmodelFactoryService {
  readonly authenticationViewmodelFactory: IAuthenticationViewmodelFactory;
  readonly collectionViewmodelFactory: ICollectionViewmodelFactory;
  readonly mtgSetViewmodelFactory: IMtgSetViewmodelFactory;
  readonly mtgCardViewmodelFactory: IMtgCardViewmodelFactory;
  readonly settingsViewmodelFactory: ISettingsViewmodelFactory;

  initialize(displayValueService: IBasicDataService, mtgSetService: IMtgSetService): void;
}
