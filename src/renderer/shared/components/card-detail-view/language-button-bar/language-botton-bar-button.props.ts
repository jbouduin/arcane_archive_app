import { Props } from "@blueprintjs/core";
import { LanguageDto } from "../../../dto";

export interface LanguageButtonBarButtonProps extends Props {
  language: LanguageDto;
  isCurrentLanguage: boolean;
  onButtonClick: (language: LanguageDto) => void;
}
