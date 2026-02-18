import { Props } from "@blueprintjs/core";
import { ReactNode } from "react";
import { MtgSetTreeDto } from "../../dto";

export interface SetTreeContextMenuProps extends Props {
  cardSet: MtgSetTreeDto;
  children: ReactNode;
}
