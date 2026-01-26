import { IDisplayValueService, IOverlayService } from "../../../../../shared/context";
import { CollectionCardQuantityDto } from "../../../../../shared/dto";
import { CollectionCardViewmodel } from "../../../../../shared/viewmodel";
import { CollectionCardDialogBody } from "./collection-card-dialog-body";
import { CollectionCardDialogFooter } from "./collection-card-dialog-footer";
import { CollectionCardDialogBodyProps, CollectionCardDialogFooterProps, CollectionCardDialogProps } from "./collection-card-dialog.props";

export function showNewCollectionCardDialog(
  overlayService: IOverlayService, displayValueService: IDisplayValueService, collectionId: number
): void {
  const viewmodel = new CollectionCardViewmodel(
    {
      collectionId: collectionId,
      collectorNumber: "",
      id: null,
      language: "ENGLISH",
      setCode: "",
      quantities: new Array<CollectionCardQuantityDto>()
    },
    "create",
    displayValueService.getSelectOptions("cardCondition")
  );
  const dialogProps: CollectionCardDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionCardDialogBodyProps) => {
      return (<CollectionCardDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: CollectionCardDialogFooterProps) => {
      return (<CollectionCardDialogFooter {...footerProps} />);
    }
  };
  overlayService.openDialog(dialogProps);
}

export function showEditCollectionCardDialog(): void {

}
