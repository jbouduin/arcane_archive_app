import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { CollectionDto } from "../../../dto";
import { CollectionViewmodel } from "../../../viewmodel";
import { BaseDialogFooterProps } from "../../base/base-dialog";
import { CollectionDialogBody } from "../collection-dialog/collection-dialog-body";
import { CollectionDialogFooter } from "../collection-dialog/collection-dialog-footer";
import { CollectionDialogBodyProps, CollectionDialogProps } from "../collection-dialog/collection-dialog.props";

export function showEditCollectionDialog(
  serviceContainer: IServiceContainer,
  collection: CollectionDto,
  parentCollection: CollectionDto | null,
  parentPath: Array<string>,
  onCollectionModified: (dto: CollectionDto) => void
): void {
  const viewmodel = serviceContainer.viewmodelFactoryService.collectionViewmodelFactory
    .getCollectionViewmodel(collection, parentCollection, parentPath);
  const dialogProps: CollectionDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionDialogBodyProps) => {
      return (<CollectionDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: BaseDialogFooterProps<CollectionDto, CollectionViewmodel>) => {
      return (
        <CollectionDialogFooter
          {...footerProps}
          onCollectionAdded={noop}
          onCollectionModified={onCollectionModified}
        />
      );
    },
    title: (
      <>
        {collection.folder && <Icon icon="folder-close" />}
        {!collection.folder && <Icon icon="box" />}
        Edit&nbsp;'
        <i>
          {viewmodel.code}
        </i>
        '
      </>
    )
  };
  serviceContainer.overlayService.openDialog(dialogProps);
}

export function showNewCollectionDialog(
  serviceContainer: IServiceContainer,
  folder: boolean,
  parentCollection: CollectionDto | null,
  parentPath: Array<string>,
  onCollectionAdded: (dto: CollectionDto) => void
): void {
  const viewmodel = serviceContainer.viewmodelFactoryService.collectionViewmodelFactory
    .getNewCollectionViewmodel(folder, parentCollection, parentPath);
  const dialogProps: CollectionDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionDialogBodyProps) => {
      return (<CollectionDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: BaseDialogFooterProps<CollectionDto, CollectionViewmodel>) => {
      return (
        <CollectionDialogFooter
          {...footerProps}
          onCollectionAdded={onCollectionAdded}
          onCollectionModified={noop}
        />
      );
    },
    title: (
      <>
        {folder && <Icon icon="folder-close" />}
        {!folder && <Icon icon="box" />}
        New
      </>
    )
  };
  serviceContainer.overlayService.openDialog(dialogProps);
}
