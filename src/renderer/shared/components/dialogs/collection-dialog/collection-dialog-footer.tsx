import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { CollectionDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { CollectionDialogFooterProps } from "./collection-dialog.props";

export function CollectionDialogFooter(props: CollectionDialogFooterProps) {
  //#region Hooks -------------------------------------------------------------
  const { collectionService } = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function createClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: CollectionDto): Promise<void> {
    return collectionService
      .createCollection(dto)
      .then(
        (resp: CollectionDto) => {
          props.onCollectionAdded(resp);
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }

  function updateClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: CollectionDto): Promise<void> {
    return collectionService
      .updateCollection(dto)
      .then(
        (resp: CollectionDto) => {
          props.onCollectionModified(resp);
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
        showResetButton={false}
        commitButtonLabel="Create"
        onCommitButtonClick={createClick}
      />
    );
  } else {
    return (
      <DefaultDialogFooter
        {...props}
        showResetButton={true}
        commitButtonLabel="Save"
        onCommitButtonClick={updateClick}
      />
    );
  }
  //#endregion
}
