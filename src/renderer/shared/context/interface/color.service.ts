import { ColorDto } from "../../dto/color.dto";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface IColorService {
  getColor(colorCode: string): ColorDto | undefined;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
