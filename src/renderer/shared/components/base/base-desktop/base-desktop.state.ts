import { AlertProps } from "@blueprintjs/core";
import { LanguageDto } from "../../../dto";
import { RendererConfigurationDto } from "../../../../../common/dto";



export interface BaseDesktopState {
  alertProps: AlertProps | null;
  // cardConditions: Array<ICardConditionDto>;
  // cardSets: Array<IMtgCardSetDto>;
  // gameFormats: Array<IGameFormatDto>;
  initialized: boolean;
  languages: Array<LanguageDto>;
  rendererConfiguration: RendererConfigurationDto | null;
  splashScreenOpen: boolean;
  // symbolSvgs: Map<string, string>;
  themeClassName: string;
}
