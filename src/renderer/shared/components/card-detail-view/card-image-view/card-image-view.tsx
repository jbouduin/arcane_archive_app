import { Button, SectionCard } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { CARD_IMAGE_BACK, CARD_IMAGE_FACE } from "../../../../../common/types";
import { compareClassNameProp } from "../../util";
import { CardImageViewProps } from "./card-image-view.props";
import { CardImageViewState } from "./card-image-view.state";

export const CardImageView = React.memo(
  (props: CardImageViewProps) => {
    // #region State ----------------------------------------------------------
    const [cardImageState, setCardImageState] = React.useState<CardImageViewState>({ currentDisplayedSide: "front", rotationClass: "" });
    // #endregion

    // #region Event handling -------------------------------------------------
    const onFlipClicked = React.useCallback(
      () => {
        const newState: CardImageViewState = {
          currentDisplayedSide: cardImageState.currentDisplayedSide,
          rotationClass: cardImageState.rotationClass == "" ? "rotate-180" : ""
        };
        setCardImageState(newState);
      },
      [cardImageState, props]
    );

    const onRotateClicked = React.useCallback(
      () => {
        const newState: CardImageViewState = {
          currentDisplayedSide: cardImageState.currentDisplayedSide,
          rotationClass: cardImageState.rotationClass == "" ? "rotate-90" : ""
        };
        setCardImageState(newState);
      },
      [cardImageState, props]
    );

    const onReverseClicked = React.useCallback(
      () => {
        const newState: CardImageViewState = {
          currentDisplayedSide: cardImageState.currentDisplayedSide == "front" ? "back" : "front",
          rotationClass: cardImageState.rotationClass
        };
        setCardImageState(newState);
      },
      [cardImageState, props]
    );
    // #endregion

    // #region effect ---------------------------------------------------------
    React.useEffect(
      () => {
        setCardImageState({
          currentDisplayedSide: "front",
          rotationClass: props.cardLayout == "SPLIT" || props.cardLayout == "PLANAR" ? "rotate-90" : ""
        });
      },
      [props]
    );
    // #endregion

    // #region Rendering ------------------------------------------------------
    return (
      <SectionCard
        className="card-view-section-card"
        padded={false}
        style={{ display: "flex", flexFlow: "column" }}
      >
        <img
          className={classNames(cardImageState.rotationClass == "rotate-90" ? "card-image-landscape" : "card-image-portrait", "card-image", cardImageState.rotationClass)}
          src={calculateImageUrl()}
        />
        <div style={{ display: "flex", flexFlow: "row", justifyContent: "center", margin: "5px" }}>
          {
            renderButtons()
          }
        </div>
      </SectionCard>

    );

    function renderButtons(): Array<React.JSX.Element> {
      const result = new Array<React.JSX.Element>();
      result.push((
        <Button key="reverse" onClick={onReverseClicked}>Reverse</Button>
      ));
      if (props.cardLayout == "FLIP") {
        result.push((
          <Button key="flip" onClick={onFlipClicked}>Flip</Button>
        ));
      }
      if (props.cardLayout == "ART_SERIES") {
        result.push((
          <Button key="flip" onClick={onRotateClicked}>Rotate</Button>
        ));
      }
      return result;
    }
    // #endregion

    // #region Auxiliary Methods ----------------------------------------------
    function calculateImageUrl(): string {
      let result: string;
      if (cardImageState.currentDisplayedSide == "front" || props.cardBackId == null) {
        result = `cached-image://${CARD_IMAGE_FACE}/cards/${props.setCode}/${props.collectorNumber}/${props.scryfallLanguage}?format=image&version=large&side=${cardImageState.currentDisplayedSide}`;
      } else {
        result = `cached-image://${CARD_IMAGE_BACK}/${props.cardBackId}`;
      }
      return result;
    }
    // #endregion
  },
  (prev: CardImageViewProps, next: CardImageViewProps) => {
    return prev.collectorNumber == next.collectorNumber &&
      prev.setCode == next.setCode &&
      prev.scryfallLanguage == next.scryfallLanguage &&
      compareClassNameProp(prev.className || "", next.className || "");
  }
);
