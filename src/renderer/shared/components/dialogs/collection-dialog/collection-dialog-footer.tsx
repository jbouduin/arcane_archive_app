import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { CollectionDto } from "../../../dto";
import { CollectionViewmodel } from "../../../viewmodel";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { CollectionDialogFooterProps } from "./collection-dialog.props";

export function CollectionDialogFooter(props: CollectionDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region event handling ---------------------------------------------------
  function createClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: CollectionDto): Promise<void> {
    return serviceContainer.collectionService
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
    return serviceContainer.collectionService
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
  // #endregion

  // #region Rendering --------------------------------------------------------
  if (!props.viewmodel.dto.id) {
    return (
      <SaveCancelResetFooter<CollectionDto, CollectionViewmodel>
        {...props}
        showResetButton={false}
        commitButtonLabel="Create"
        onCommitButtonClick={createClick}
      />
    );
  } else {
    return (
      <SaveCancelResetFooter<CollectionDto, CollectionViewmodel>
        {...props}
        showResetButton={true}
        commitButtonLabel="Save"
        onCommitButtonClick={updateClick}
      />
    );
  }
  // #endregion
}
