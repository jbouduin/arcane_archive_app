import { SelectOption } from "../../types";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface ICardSearchParamService {
  readonly cardTypes: Array<SelectOption<string>>;
  readonly cardSuperTypes: Array<SelectOption<string>>;
  readonly powerValues: Array<SelectOption<string>>;
  readonly toughnessValues: Array<SelectOption<string>>;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
