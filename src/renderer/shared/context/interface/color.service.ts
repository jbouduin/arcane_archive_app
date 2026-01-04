import { ColorDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";

export interface IColorService {
  readonly allColors: Array<ColorDto>;

  getColor(colorCode: string): ColorDto | undefined;
  getSelectOptions(): Array<SelectOption<ColorDto>>;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<void>;
}
