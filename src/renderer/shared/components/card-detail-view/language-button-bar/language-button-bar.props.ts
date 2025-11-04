import { Props } from "@blueprintjs/core";

export interface LanguageButtonBarProps extends Props {
  currentLanguage: string;
  cardLanguages: Array<string>;
  onButtonClick: (language: string) => void;
}
