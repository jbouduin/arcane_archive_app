import { ApiConfigurationDto } from "../../../../common/dto";
import { ResultDto } from "../../../../common/dto/mtg-collection";
import { ColorDto } from "../../dto/color.dto";
import { IColorService } from "../interface";

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

  public async initialize(apiConfiguration: ApiConfigurationDto): Promise<void> {
    const response = await fetch(apiConfiguration.mtgCollectionApiRoot + "/color");
    const allLanguages: ResultDto<Array<ColorDto>> = (await response.json()) as ResultDto<Array<ColorDto>>;
    allLanguages
      .data
      .sort((a: ColorDto, b: ColorDto) => a.sequence - b.sequence)
      .forEach((color: ColorDto) => this.colorMap.set(color.code, color));
  }
  // #endregion
}
