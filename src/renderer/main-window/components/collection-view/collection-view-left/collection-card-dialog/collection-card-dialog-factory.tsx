import { IBasicDataService, IOverlayService } from "../../../../../shared/context";
import { CollectionCardQuantityDto } from "../../../../../shared/dto";
import { CollectionCardViewmodel } from "../../../../../shared/viewmodel";
import { CollectionCardDialogBody } from "./collection-card-dialog-body";
import { CollectionCardDialogFooter } from "./collection-card-dialog-footer";
import * as DialogProps from "./collection-card-dialog.props";

export function showNewCollectionCardDialog(
  overlayService: IOverlayService, basicDataService: IBasicDataService, collectionId: number
): void {
  const viewmodel = new CollectionCardViewmodel(
    {
      collectionId: collectionId,
      cardCode: "",
      id: null,
      language: "ENGLISH",
      setCode: "",
      quantities: new Array<CollectionCardQuantityDto>()
    },
    "create",
    basicDataService.getCardConditionSelectOptions()
  );
  const dialogProps: DialogProps.CollectionCardDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: DialogProps.CollectionCardDialogBodyProps) => {
      return (<CollectionCardDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: DialogProps.CollectionCardDialogFooterProps) => {
      return (<CollectionCardDialogFooter {...footerProps} />);
    }
  };
  overlayService.openDialog(dialogProps);
}

export function showEditCollectionCardDialog(): void {
  // TODO
}
