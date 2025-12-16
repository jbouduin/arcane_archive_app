import { Props } from "@blueprintjs/core";
import { SystemSettingsDto } from "../../../common/dto";

export interface FirstTimeViewProps extends Props {
  systemSettings: SystemSettingsDto;
}
