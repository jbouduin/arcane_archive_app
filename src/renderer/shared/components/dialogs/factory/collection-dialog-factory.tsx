import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { IOverlayService, IViewmodelFactoryService } from "../../../context";
import { CollectionDto } from "../../../dto";
import { CollectionType } from "../../../types";
import { CollectionViewmodel } from "../../../viewmodel";
import { DefaultDialogFooterProps } from "../../base/base-dialog";
import * as CollectionDialog from "../collection-dialog";

export function showEditCollectionDialog(
  viewmodelFactoryService: IViewmodelFactoryService,
  overlayService: IOverlayService,
  collection: CollectionDto,
  parent: CollectionDto,
  onCollectionModified: (dto: CollectionDto) => void
): void {
  const viewmodel = viewmodelFactoryService.collectionViewmodelFactory
    .getCollectionViewmodel(collection, parent);
  const dialogProps: CollectionDialog.CollectionDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionDialog.CollectionDialogBodyProps) => {
      return (<CollectionDialog.CollectionDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: DefaultDialogFooterProps<CollectionDto, CollectionViewmodel>) => {
      return (
        <CollectionDialog.CollectionDialogFooter
          {...footerProps}
          onCollectionAdded={noop}
          onCollectionModified={onCollectionModified}
        />
      );
    },
    title: (
      <>
        {collection.type == "FOLDER" && <Icon icon="folder-close" />}
        {collection.type != "FOLDER" && <Icon icon="box" />}
        Edit&nbsp;'
        <i>
          {viewmodel.collectionName}
        </i>
        '
      </>
    )
  };
  overlayService.openDialog(dialogProps);
}

export function showNewCollectionDialog(
  viewmodelFactoryService: IViewmodelFactoryService,
  overlayService: IOverlayService,
  type: CollectionType,
  parent: CollectionDto,
  onCollectionAdded: (dto: CollectionDto) => void
): void {
  const titleText = type == "FOLDER" ? "New Folder" : "New Collection";
  const viewmodel = viewmodelFactoryService.collectionViewmodelFactory
    .getNewCollectionViewmodel(type, parent);
  const dialogProps: CollectionDialog.CollectionDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionDialog.CollectionDialogBodyProps) => {
      return (<CollectionDialog.CollectionDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: DefaultDialogFooterProps<CollectionDto, CollectionViewmodel>) => {
      return (
        <CollectionDialog.CollectionDialogFooter
          {...footerProps}
          onCollectionAdded={onCollectionAdded}
          onCollectionModified={noop}
        />
      );
    },
    title: (
      <>
        {type == "FOLDER" && <Icon icon="folder-close" />}
        {type != "FOLDER" && <Icon icon="box" />}
        {titleText}
      </>
    )
  };
  overlayService.openDialog(dialogProps);
}
