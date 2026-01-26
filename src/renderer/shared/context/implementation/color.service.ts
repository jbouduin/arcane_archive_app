import { noop } from "lodash";
import { ColorDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy, IColorService } from "../interface";

export class ColorService implements IColorService {
  // #region Private fields ---------------------------------------------------
  private colorMap: Map<string, ColorDto>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.colorMap = new Map<string, ColorDto>();
  }

  // #region IColorService Members --------------------------------------------
  public get allColors(): Array<ColorDto> {
    return Array.of(...this.colorMap.values());
  }

  public getColor(colorCode: string): ColorDto | undefined {
    return this.colorMap.get(colorCode);
  }

  public getSelectOptions(): Array<SelectOption<ColorDto>> {
    return Array.of(...this.colorMap.values())
      .filter((c: ColorDto) => c.code != "UNKNOWN")
      .map((c: ColorDto) => ({ label: c.name["ENGLISH"], value: c }));
  }

  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void> {
    return arcaneArchiveProxy.getData<Array<ColorDto>>("library", "/public/color")
      .then(
        (allColors: Array<ColorDto>) => allColors
          .sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence)
          .forEach((color: ColorDto) => this.colorMap.set(color.code, color)),
        noop
      );
  }
  // #endregion
}
