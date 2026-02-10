import "./card-image-view.css";

import { Button, SectionCard } from "@blueprintjs/core";
import classNames from "classnames";
import { memo, useCallback, useEffect, useState } from "react";
import { IpcPaths } from "../../../../../common/ipc";
import { CARD_IMAGE_BACK, CARD_IMAGE_FACE } from "../../../../../common/types";
import { compareClassNameProp } from "../../util";
import { CardImageViewProps } from "./card-image-view.props";
import { CardImageViewState } from "./card-image-view.state";

export const CardImageView = memo(
  (props: CardImageViewProps) => {
    const sizeClassName = props.size == "small" ? "aa-card-image-small" : "aa-card-image-large";
    // #region State ----------------------------------------------------------
    const [cardImageState, setCardImageState] = useState<CardImageViewState>(
      { currentDisplayedSide: "front", rotationClass: "" }
    );
    // #endregion

    // #region Event handling -------------------------------------------------
    const onFlipClicked = useCallback(
      () => {
        const newState: CardImageViewState = {
          currentDisplayedSide: cardImageState.currentDisplayedSide,
          rotationClass: cardImageState.rotationClass == "" ? "rotate-180" : ""
        };
        setCardImageState(newState);
      },
      [cardImageState, props]
    );

    const onRotateClicked = useCallback(
      () => {
        const newState: CardImageViewState = {
          currentDisplayedSide: cardImageState.currentDisplayedSide,
          rotationClass: cardImageState.rotationClass == "" ? "rotate-90" : ""
        };
        setCardImageState(newState);
      },
      [cardImageState, props]
    );

    const onReverseClicked = useCallback(
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
    useEffect(
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
      <div className={sizeClassName}>

        <SectionCard
          className="aa-card-image-section-card"
          padded={false}
        >
          <img
            className={classNames("aa-card-image", cardImageState.rotationClass)}
            src={calculateImageUrl()}
          />
          <div className="aa-card-image-buttons">
            {
              renderButtons()
            }
          </div>
        </SectionCard>
      </div>

    );

    function renderButtons(): Array<React.JSX.Element> {
      const result = new Array<React.JSX.Element>();
      result.push((
        <Button disabled={props.cardBackId == null} key="reverse" onClick={onReverseClicked}>Reverse</Button>
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
        const queryParams = new Array<string>(
          `version=${props.cachedImageSize}`,
          "format=image",
          `side=${cardImageState.currentDisplayedSide}`,
          `status=${props.imageStatus.toString()}`
        );

        result = `${IpcPaths.CACHED_IMAGE}://${CARD_IMAGE_FACE}/cards/${props.setCode}/${props.collectorNumber}/${props.scryfallLanguage}?` +
          queryParams.join("&");
      } else {
        result = `${IpcPaths.CACHED_IMAGE}://${CARD_IMAGE_BACK}/${props.cardBackId}`;
      }
      return result;
    }
    // #endregion
  },
  (prev: CardImageViewProps, next: CardImageViewProps) => {
    // fast path
    if (prev === next) return true;

    return prev.collectorNumber === next.collectorNumber &&
      prev.setCode === next.setCode &&
      prev.scryfallLanguage === next.scryfallLanguage &&
      compareClassNameProp(prev.className, next.className);
  }
);
