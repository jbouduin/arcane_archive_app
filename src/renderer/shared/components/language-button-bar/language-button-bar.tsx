import { ButtonGroup } from "@blueprintjs/core";
import { LanguageDto } from "../../dto";
import { LanguageButtonBarButton } from "./language-button-bar-button";
import { LanguageButtonBarProps } from "./language-button-bar.props";

export function LanguageButtonBar(props: LanguageButtonBarProps): JSX.Element {
  // #region Event handling ----------------------------------------------------
  function onAnyButtonClick(language: LanguageDto): void {
    props.onButtonClick(language);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <ButtonGroup fill={true} variant="minimal" alignText="center">
      {
        props.allLanguages.map((language: LanguageDto) => {
          return (
            <LanguageButtonBarButton
              isCurrentLanguage={language == props.currentLanguage}
              key={language.language}
              language={language}
              onButtonClick={onAnyButtonClick}
            />
          );
        })
      }
    </ButtonGroup>
  );
  // #endregion
}
