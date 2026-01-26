import { noop } from "lodash";
import { useServices } from "../../../../../hooks";
import { DefaultDialogFooter } from "../../../../../shared/components/base/base-dialog";
import { CollectionCardDto } from "../../../../../shared/dto";
import { CollectionCardDialogFooterProps } from "./collection-card-dialog.props";
import { CollectionCardQuantityViewmodel } from "../../../../../shared/viewmodel/collection/collection-card-quantity.viewmodel";

export function CollectionCardDialogFooter(props: CollectionCardDialogFooterProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { collectionService } = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function createClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: CollectionCardDto): Promise<void> {
    // NOW move this to viewmodel as getDtoToSave() which returns the dto in the baseviewmodel and override in subclasses
    const toSave: CollectionCardDto = {
      id: null,
      collectionId: dto.collectionId,
      setCode: dto.setCode,
      collectorNumber: dto.collectorNumber,
      language: dto.language,
      quantities: props.viewmodel.getChangedQuantityViewmodels().map((vm: CollectionCardQuantityViewmodel) => vm.dto)
    };
    return collectionService
      .createCollectionCard(toSave)
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
