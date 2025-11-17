import { Props } from "@blueprintjs/core";
import { ColorDto } from "../../../dto/color.dto";
import { ColorType } from "../../../types";

export interface ColorSelectProps extends Props {
  allColors: Array<ColorDto>;
  colorType: ColorType;
  label: string;
  onClearOptions: () => void;
  onOptionAdded: (color: ColorDto) => void;
  onOptionRemoved: (color: ColorDto) => void;
  selectedColors: Array<ColorDto>;
}
