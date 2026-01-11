import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { CollectionDto } from "../../../dto";
import { CollectionType } from "../../../types";
import { CollectionViewmodel, CollectionViewmodelField } from "../../../viewmodel";
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
    footerRenderer: (footerProps: BaseDialogFooterProps<CollectionDto, CollectionViewmodelField, CollectionViewmodel>) => {
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
        {collection.type == "FOLDER" && <Icon icon="folder-close" />}
        {collection.type != "FOLDER" && <Icon icon="box" />}
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
  type: CollectionType,
  parentCollection: CollectionDto | null,
  parentPath: Array<string>,
  onCollectionAdded: (dto: CollectionDto) => void
): void {
  const viewmodel = serviceContainer.viewmodelFactoryService.collectionViewmodelFactory
    .getNewCollectionViewmodel(type, parentCollection, parentPath);
  const dialogProps: CollectionDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionDialogBodyProps) => {
      return (<CollectionDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: BaseDialogFooterProps<CollectionDto, CollectionViewmodelField, CollectionViewmodel>) => {
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
        {type == "FOLDER" && <Icon icon="folder-close" />}
        {type != "FOLDER" && <Icon icon="box" />}
        New
      </>
    )
  };
  serviceContainer.overlayService.openDialog(dialogProps);
}
