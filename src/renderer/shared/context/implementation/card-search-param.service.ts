import { noop } from "lodash";
import { SelectOption } from "../../types";
import { ICardSearchParamService, ICollectionManagerProxyService } from "../interface";

export class CardSearchParamService implements ICardSearchParamService {
  // #region Private fields ---------------------------------------------------
  private _cardSuperTypes: Array<SelectOption<string>>;
  private _cardTypes: Array<SelectOption<string>>;
  private _powerValues: Array<SelectOption<string>>;
  private _toughnessValues: Array<SelectOption<string>>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._cardSuperTypes = new Array<SelectOption<string>>();
    this._cardTypes = new Array<SelectOption<string>>();
    this._powerValues = new Array<SelectOption<string>>();
    this._toughnessValues = new Array<SelectOption<string>>();
  }
  // #endregion

  // #region ICardSearchParamService Members ----------------------------------
  public get cardSuperTypes(): Array<SelectOption<string>> {
    return this._cardSuperTypes;
  }

  public get cardTypes(): Array<SelectOption<string>> {
    return this._cardTypes;
  }

  public get powerValues(): Array<SelectOption<string>> {
    return this._powerValues;
  }

  public get toughnessValues(): Array<SelectOption<string>> {
    return this._toughnessValues;
  }

  public initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void> {
    return Promise.all([
      collectionManagerProxy.getData<Array<string>>("/public/card-super-type"),
      collectionManagerProxy.getData<Array<string>>("/public/card-type"),
      collectionManagerProxy.getData<Array<string>>("/public/catalog/POWERS/item"),
      collectionManagerProxy.getData<Array<string>>("/public/catalog/TOUGHNESSES/item")])
      .then(
        (r: [Array<string>, Array<string>, Array<string>, Array<string>]) => {
          this._cardSuperTypes = r[0].sort().map((s: string) => ({ label: s, value: s }));
          this._cardTypes = r[1].sort().map((s: string) => ({ label: s, value: s }));
          this._powerValues = r[2].sort().map((s: string) => ({ label: s, value: s }));
          this._toughnessValues = r[3].sort().map((s: string) => ({ label: s, value: s }));
        },
        noop
      );
  }
  // #endregion
}
