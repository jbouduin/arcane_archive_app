import { IMtgSetViewmodelFactory } from "../../viewmodel/factory/interface";
import { IDisplayValueService } from "./display-value.service";

export interface IViewmodelFactoryService {
  initialize(displayValueService: IDisplayValueService): void;
  readonly mtgSetViewmodelFactory: IMtgSetViewmodelFactory;
}
