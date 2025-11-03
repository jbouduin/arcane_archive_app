import { ApiConfigurationDto } from "../../../../common/dto";
import { ColorDto } from "../../dto/color.dto";

export interface IColorService {
  getColor(colorCode: string): ColorDto | undefined;
  initialize(apiConfiguration: ApiConfigurationDto): Promise<void>;
}
