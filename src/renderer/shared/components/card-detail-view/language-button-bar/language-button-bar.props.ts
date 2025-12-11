import { Props } from "@blueprintjs/core";
import { LanguageDto } from "../../../dto";

export interface LanguageButtonBarProps extends Props {
  currentLanguage: LanguageDto;
  allLanguages: Array<LanguageDto>;
  onButtonClick: (language: LanguageDto) => void;
}
