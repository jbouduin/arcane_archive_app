import { Button, Tooltip } from "@blueprintjs/core";
import { LanguageButtonBarButtonProps } from "./language-botton-bar-button.props";

export function LanguageButtonBarButton(props: LanguageButtonBarButtonProps) {
  // #region Event handling ---------------------------------------------------
  function onButtonClick(): void {
    props.onButtonClick(props.language);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Tooltip
      content={(<span>{props.language.displayValue}</span>)}
      openOnTargetFocus={false}
      placement="bottom"
      usePortal={false}
    >
      <Button
        intent={props.isCurrentLanguage ? "primary" : "none"}
        onClick={onButtonClick}
      >
        {props.language.buttonText}
      </Button>
    </Tooltip>
  );
  // #endregion
}
