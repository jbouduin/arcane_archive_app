import { ISynchronizeService } from "../../../context";
import { MtgSetTreeDto, SyncRequest, SyncTaskDto, SyncTaskTargetDto } from "../../../dto";
import { ISynchronizationViewmodelFactory } from "../../../viewmodel";
import { CardSetIcon } from "../../card-set-icon";
import { SynchronizationDialogBody } from "./synchronization-dialog-body";
import { SynchronizationDialogFooter } from "./synchronization-dialog-footer";
import * as SynchronizeDialogProps from "./synchronization-dialog.props";
import { SynchronizeSetDialogBody } from "./synchronize-set-dialog-body";
import { SynchronizeSetDialogFooter } from "./synchronize-set-dialog-footer";
import * as SynchronizeSetDialogProps from "./synchronize-set-dialog.props";

function getSynchronizationDialogPropsImpl(
  synchronizeService: ISynchronizeService,
  viewmodelFactory: ISynchronizationViewmodelFactory,
): Promise<SynchronizeDialogProps.SynchronizationDialogProps> {
  return synchronizeService.getTaskTargets().then(
    (targets: Array<SyncTaskTargetDto>) => {
      const dto: SyncRequest = {
        tasks: [],
        allScryfallCatalogs: "SKIP",
        allCardSets: "SKIP"
      };
      const viewmodel = viewmodelFactory.getSynchronizationViewmodel(dto, targets);
      const dialogProps: SynchronizeDialogProps.SynchronizationDialogProps = {
        isOpen: true,
        isCloseButtonShown: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: false,
        title: "Synchronize",
        viewmodel: viewmodel,
        bodyRenderer: (bodyProps: SynchronizeDialogProps.SynchronizationDialogBodyProps) => {
          return (<SynchronizationDialogBody {...bodyProps} />);
        },
        footerRenderer: (footerProps: SynchronizeDialogProps.SynchronizationDialogFooterProps) => {
          return (<SynchronizationDialogFooter {...footerProps} />);
        }
      };
      return dialogProps;
    },
  );
}

function getSynchronizeSetDialogPropsImpl(
  cardSet: MtgSetTreeDto,
  viewmodelFactory: ISynchronizationViewmodelFactory
): SynchronizeSetDialogProps.SynchronizeSetDialogProps {
  const task: SyncTaskDto = {
    target: "CARDS_OF_CARD_SET",
    subTarget: cardSet.code,
    mode: "NORMAL",
    dumpData: false
  };
  const dialogProps: SynchronizeSetDialogProps.SynchronizeSetDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: (
      <>
        <CardSetIcon
          keyruneCode={cardSet.keyruneCode}
          size="large"
        />
        {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line */}
        Synchronize "{cardSet.setName}"
      </>
    ),
    viewmodel: viewmodelFactory.getSynchronizeSetViewmodel(task),
    bodyRenderer: (bodyProps: SynchronizeSetDialogProps.SynchronizeSetDialogBodyProps) => {
      return (<SynchronizeSetDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: SynchronizeSetDialogProps.SynchronizeSetDialogFooterProps) => {
      return (<SynchronizeSetDialogFooter {...footerProps} />);
    },
  };
  return dialogProps;
}

export const synchronizationDialogPropsFactory = {
  getSynchronizationDialogProps: getSynchronizationDialogPropsImpl,
  getSynchronizeSetDialogProps: getSynchronizeSetDialogPropsImpl
};
