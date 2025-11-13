import { Props } from "@blueprintjs/core";
import { CardQueryParamsDto } from "../../../../shared/dto";

export interface LibraryViewLeftProps extends Props {
  onSelectionChanged: (selection: CardQueryParamsDto) => void;
}
