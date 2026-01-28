import { noop } from "lodash";
import { useServices } from "../../../../../hooks";
import { DefaultDialogFooter } from "../../../../../shared/components/base/base-dialog";
import { CollectionCardDto } from "../../../../../shared/dto";
import { CollectionCardDialogFooterProps } from "./collection-card-dialog.props";

export function CollectionCardDialogFooter(props: CollectionCardDialogFooterProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { collectionService } = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function createClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: CollectionCardDto): Promise<void> {
    return collectionService
      .createCollectionCard(dto)
      .then(
        (_resp: CollectionCardDto) => {
          // props.onCollectionAdded(resp);
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }

  function updateClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: CollectionCardDto): Promise<void> {
    return collectionService
      .updateCollectionCard(dto)
      .then(
        (_resp: CollectionCardDto) => {
          // props.onCollectionModified(resp);
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  if (props.viewmodel.mode == "create") {
    return (
      <DefaultDialogFooter
        {...props}
        commitButtonLabel="Create"
        onCommitButtonClick={createClick}
        showResetButton={false}
      />
    );
  } else {
    return (
      <DefaultDialogFooter
        {...props}
        commitButtonLabel="Save"
        onCommitButtonClick={updateClick}
        showResetButton={true}
      />
    );
  }
  //#endregion
}
