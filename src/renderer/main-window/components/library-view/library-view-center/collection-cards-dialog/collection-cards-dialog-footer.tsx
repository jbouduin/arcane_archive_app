import { Button, ButtonGroup } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../../hooks";
import { DefaultDialogFooter } from "../../../../../shared/components/base/base-dialog";
import { CollectionCardDto } from "../../../../../shared/dto";
import { CollectionCardsDialogFooterProps } from "./collection-cards-dialog.props";
import { SingleCollectionCardDto } from "./single-collection-card.dto";

export function CollectionCardDialogFooter(props: CollectionCardsDialogFooterProps): JSX.Element {
  const viewmodel = props.viewmodel.currentCollectionCardViewmodel;

  //#region Hooks -------------------------------------------------------------
  const { collectionService } = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: SingleCollectionCardDto): Promise<void> {
    return collectionService
      .upsertCollectionCards(dto.collectionCards)
      .then(
        (_resp: Array<CollectionCardDto>) => {
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }

  async function onNavigate(direction: "prev" | "next"): Promise<void> {
    let saveResult: Array<CollectionCardDto> | null = null;
    if (viewmodel.hasChanges) {
      saveResult = await collectionService.upsertCollectionCards(viewmodel.dtoToSave.collectionCards);
    }
    if (direction == "prev" && props.viewmodel.canGetPreviousCard()) {
      return props.viewmodel.getPreviousCard();
    } else if (direction == "next" && props.viewmodel.canGetNextCard()) {
      return props.viewmodel.getNextCard();
    } else {
      if (saveResult != null) {
        /**
         * Remark: this is not optimal
         * But as this is probably the only case where we have to update a viewmodel,
         * we will not implement something in BaseViewmodel
         */
        return props.viewmodel.reloadCard();
      }
      return Promise.resolve();
    }
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  if (props.viewmodel.numberOfCards == 1) {
    return (
      <DefaultDialogFooter
        {...props}
        viewmodel={viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        onCommitButtonClick={saveClick}
        showResetButton={true}
      />
    );
  } else {
    const previousDisabled = !props.viewmodel.canGetPreviousCard() && !viewmodel.hasChanges;
    const nextDisabled = !props.viewmodel.canGetNextCard() && !viewmodel.hasChanges;
    let previousLabel;
    let nextLabel;
    if (viewmodel.hasChanges) {
      previousLabel = props.viewmodel.canGetPreviousCard() ? "Save & Previous" : "Save";
      nextLabel = props.viewmodel.canGetNextCard() ? "Save & Next" : "Save";
    } else {
      previousLabel = "Previous";
      nextLabel = "Next";
    }

    return (
      <div className="dialog-footer-button-bar">
        <ButtonGroup variant="minimal" vertical={false}>
          <Button
            key="resetButton"
            disabled={!viewmodel.hasChanges}
            onClick={() => {
              viewmodel.cancelChanges();
              props.viewmodelChanged();
            }}
            icon={props.resetButtonIcon ?? "refresh"}
          >
            {props.resetButtonLabel ?? "Undo changes"}
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="minimal" vertical={false}>
          <Button
            disabled={previousDisabled}
            onClick={() => {
              onNavigate("prev")
                .then(
                  () => props.viewmodelChanged(),
                  noop
                );
            }}
          >
            {previousLabel}
          </Button>
          <Button
            disabled={nextDisabled}
            onClick={() => {
              onNavigate("next")
                .then(
                  () => props.viewmodelChanged(),
                  noop
                );
            }}
          >
            {nextLabel}
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="minimal" vertical={false}>
          <Button onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => props.onClose?.(e)}>
            Close
          </Button>
        </ButtonGroup>
      </div>
    );
  }
  //#endregion
}
