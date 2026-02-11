import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { IViewmodelFactoryService } from "../../../context";
import { CollectionDto } from "../../../dto";
import { CollectionType } from "../../../types";
import { CollectionViewmodel, ICollectionViewmodelFactory } from "../../../viewmodel";
import { DefaultDialogFooterProps } from "../../base/base-dialog";
import { CollectionDialogBody } from "./collection-dialog-body";
import { CollectionDialogFooter } from "./collection-dialog-footer";
import { CollectionDialogBodyProps, CollectionDialogProps } from "./collection-dialog.props";

function getEditCollectionDialogPropsImpl(
  collection: CollectionDto,
  parent: CollectionDto,
  collectionViewmodelFactory: ICollectionViewmodelFactory,
  onCollectionModified: (dto: CollectionDto) => void
): CollectionDialogProps {
  const viewmodel = collectionViewmodelFactory
    .getCollectionViewmodel(collection, parent);
  const dialogProps: CollectionDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionDialogBodyProps) => {
      return (<CollectionDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: DefaultDialogFooterProps<CollectionDto, CollectionViewmodel>) => {
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
          {viewmodel.collectionName}
        </i>
        '
      </>
    )
  };
  return dialogProps;
}

function getNewCollectionDialogPropsImpl(
  type: CollectionType,
  parent: CollectionDto,
  collectionViewmodelFactory: ICollectionViewmodelFactory,
  onCollectionAdded: (dto: CollectionDto) => void
): CollectionDialogProps {
  const titleText = type == "FOLDER" ? "New Folder" : "New Collection";
  const viewmodel = collectionViewmodelFactory
    .getNewCollectionViewmodel(type, parent);
  const dialogProps: CollectionDialogProps = {
    isOpen: true,
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: CollectionDialogBodyProps) => {
      return (<CollectionDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: DefaultDialogFooterProps<CollectionDto, CollectionViewmodel>) => {
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
        {titleText}
      </>
    )
  };
  return dialogProps;
}

export const collectionDialogPropsFactory = {
  getEditCollectionDialogProps: getEditCollectionDialogPropsImpl,
  getNewCollectionDialogProps: getNewCollectionDialogPropsImpl
};
