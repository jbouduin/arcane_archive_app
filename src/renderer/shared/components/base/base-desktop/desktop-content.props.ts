import { Props } from "@blueprintjs/core";
import { ConfigurationDto } from "../../../../../common/dto";

export interface DesktopContentProps extends Props {
  onConfigurationChanged: (newConfiguration: ConfigurationDto) => void;
}
