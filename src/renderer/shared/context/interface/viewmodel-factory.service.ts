import { IAuthenticationViewmodelFactory, IMtgCardViewmodelFactory, IMtgSetViewmodelFactory } from "../../viewmodel/factory/interface";
import { IColorService } from "./color.service";
import { IDisplayValueService } from "./display-value.service";
import { ILanguageService } from "./language.service";
import { IMtgSetService } from "./mtg-set.service";

export interface IViewmodelFactoryService {
  readonly authenticationViewmodelFactory: IAuthenticationViewmodelFactory;
  readonly mtgSetViewmodelFactory: IMtgSetViewmodelFactory;
  readonly mtgCardViewmodelFactory: IMtgCardViewmodelFactory;

  initialize(colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService
  ): void;
}
