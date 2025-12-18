import { Props } from "@blueprintjs/core";
import { IOverlayService } from "../../../context";

export interface DialogRendererProps extends Props {
  overlayService: IOverlayService;
}
