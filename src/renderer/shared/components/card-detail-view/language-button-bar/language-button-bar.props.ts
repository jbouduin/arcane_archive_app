import { Props } from "@blueprintjs/core";

export interface LanguageButtonBarProps extends Props {
  currentLanguage: string;
  allLanguages: Array<string>;
  onButtonClick: (language: string) => void;
}
