import { EDesktopView } from "../desktop-view.enum";
import { ConfigurationDto } from "../../../../../common/dto";
import { Props } from "@blueprintjs/core";

export interface ButtonBarProps extends Props {
  afterSaveSettings: (saved: ConfigurationDto) => void;
  currentView: EDesktopView;
  onDesktopViewSelectionClick: (desktopView: EDesktopView) => void;
}
