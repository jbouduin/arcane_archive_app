import { ColorDto } from "../../dto";
import { SelectOption } from "../../types";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface IColorService {
  readonly allColors: Array<ColorDto>;

  getColor(colorCode: string): ColorDto | undefined;
  getSelectOptions(): Array<SelectOption<ColorDto>>;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
