import { Props } from "@blueprintjs/core";
import { ReactNode } from "react";

export interface SetTreeContextMenuProps extends Props {
  cardSetId: number;
  cardSetCode: string;
  children: ReactNode;
}
