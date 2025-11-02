import { MtgSetViewmodelFactory } from "../../viewmodel/factory/implementation/mtg-set-viewmodel.factory";
import { IMtgSetViewmodelFactory } from "../../viewmodel/factory/interface";
import { IDisplayValueService, IViewmodelFactoryService } from "../interface";

export class ViewmodelFactoryService implements IViewmodelFactoryService {
  // #region Private fields ---------------------------------------------------
  private displayValueService!: IDisplayValueService;
  private _mtgSetViewmodelFactory!: IMtgSetViewmodelFactory;
  // #endregion

  // #region IViewmodelFactoryService Members ---------------------------------
  public get mtgSetViewmodelFactory(): IMtgSetViewmodelFactory {
    return this._mtgSetViewmodelFactory ?? (this._mtgSetViewmodelFactory = new MtgSetViewmodelFactory(this.displayValueService));
  }

  public initialize(displayValueService: IDisplayValueService): void {
    this.displayValueService = displayValueService;
  }
  // #endregion
}
