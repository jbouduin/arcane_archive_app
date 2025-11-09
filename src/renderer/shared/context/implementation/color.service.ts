import { noop } from "lodash";
import { ColorDto } from "../../dto/color.dto";
import { ICollectionManagerProxyService, IColorService } from "../interface";

export class ColorService implements IColorService {
  // #region Private fields ---------------------------------------------------
  private colorMap: Map<string, ColorDto>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.colorMap = new Map<string, ColorDto>();
  }

  // #region IColorService Members --------------------------------------------
  public getColor(colorCode: string): ColorDto | undefined {
    return this.colorMap.get(colorCode);
  }

  public initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void> {
    return collectionManagerProxy.getData<Array<ColorDto>>("/color")
      .then(
        (allColors: Array<ColorDto>) => allColors
          .sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence)
          .forEach((color: ColorDto) => this.colorMap.set(color.code, color)),
        noop
      );
  }
  // #endregion
}
