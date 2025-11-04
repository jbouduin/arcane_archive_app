import { Props } from "@blueprintjs/core";

export interface LanguageButtonBarButtonProps extends Props {
  language: string;
  label: string;
  tooltip: React.JSX.Element;
  isCurrentLanguage: boolean;
  onButtonClick: (language: string) => void;
}
