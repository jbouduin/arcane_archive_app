import { Props } from "@blueprintjs/core";

export interface LanguageButtonBarButtonProps extends Props {
  // TODO: use LanguageDto instead of a string
  // currently viewmodels use languageService to sort dto languages, pass them
  // and the LanguageButtonBar uses the languageService again to retrieve required data
  language: string;
  label: string;
  tooltip: React.JSX.Element;
  isCurrentLanguage: boolean;
  onButtonClick: (language: string) => void;
}
