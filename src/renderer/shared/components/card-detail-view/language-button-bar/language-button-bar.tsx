import { ButtonGroup } from "@blueprintjs/core";
import { useServices } from "../../../../hooks/use-services";
import { LanguageButtonBarButton } from "./language-button-bar-button";
import { LanguageButtonBarProps } from "./language-button-bar.props";

export function LanguageButtonBar(props: LanguageButtonBarProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ----------------------------------------------------
  function onAnyButtonClick(language: string): void {
    props.onButtonClick(language);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <ButtonGroup className="language-button-bar" variant="minimal">
      {
        props.cardLanguages.map((language: string) => {
          const languageDef = serviceContainer.languageService.getLanguage(language);
          const label = languageDef ? languageDef.buttonText : language;
          const tooltip = languageDef ? languageDef.displayValue : language;
          return (
            <LanguageButtonBarButton
              isCurrentLanguage={language === props.currentLanguage}
              key={language}
              label={label}
              language={language}
              onButtonClick={onAnyButtonClick}
              tooltip={<span>{tooltip}</span>}
            />
          );
        })
      }
    </ButtonGroup>
  );
  // #endregion
}
