import { AuthenticationViewmodelFactory } from "../../viewmodel/factory/implementation/authentication-viewmodel.factory";
import { MtgCardViewmodelFactory } from "../../viewmodel/factory/implementation/mtg-card-viewmodel.factory";
import { MtgSetViewmodelFactory } from "../../viewmodel/factory/implementation/mtg-set-viewmodel.factory";
import { IAuthenticationViewmodelFactory, IMtgCardViewmodelFactory, IMtgSetViewmodelFactory } from "../../viewmodel/factory/interface";
import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService, IViewmodelFactoryService } from "../interface";

export class ViewmodelFactoryService implements IViewmodelFactoryService {
  // #region Private fields ---------------------------------------------------
  private colorService!: IColorService;
  private displayValueService!: IDisplayValueService;
  private languageService!: ILanguageService;
  private mtgSetService!: IMtgSetService;
  private _mtgCardViewmodelFactory!: IMtgCardViewmodelFactory;
  private _mtgSetViewmodelFactory!: IMtgSetViewmodelFactory;
  private _authenticationViewmodelFactory!: IAuthenticationViewmodelFactory;
  // #endregion

  // #region IViewmodelFactoryService Members ---------------------------------
  public get authenticationViewmodelFactory(): IAuthenticationViewmodelFactory {
    return this._authenticationViewmodelFactory ??
      (this._authenticationViewmodelFactory = new AuthenticationViewmodelFactory());
  }

  public get mtgSetViewmodelFactory(): IMtgSetViewmodelFactory {
    return this._mtgSetViewmodelFactory ??
      (this._mtgSetViewmodelFactory = new MtgSetViewmodelFactory(this.displayValueService, this.languageService));
  }

  public get mtgCardViewmodelFactory(): IMtgCardViewmodelFactory {
    return this._mtgCardViewmodelFactory ??
      (this._mtgCardViewmodelFactory = new MtgCardViewmodelFactory(this.colorService, this.displayValueService, this.languageService, this.mtgSetService));
  }

  public initialize(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService
  ): void {
    this.colorService = colorService;
    this.displayValueService = displayValueService;
    this.languageService = languageService;
    this.mtgSetService = mtgSetService;
  }
  // #endregion
}
