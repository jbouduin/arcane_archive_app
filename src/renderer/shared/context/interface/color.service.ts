import { ColorDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface IColorService {
  readonly allColors: Array<ColorDto>;

  getColor(colorCode: string): ColorDto | undefined;
  getSelectOptions(): Array<SelectOption<ColorDto>>;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void>;
}
