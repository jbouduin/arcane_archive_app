import classNames from "classnames";
import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { MtgSetDialogBody } from "../mtg-set-dialog/mtg-set-dialog-body";
import { MtgSetDialogFooter } from "../mtg-set-dialog/mtg-set-dialog-footer";
import { MtgSetDialogBodyProps, MtgSetDialogFooterProps, MtgSetDialogProps } from "../mtg-set-dialog/mtg-set-dialog.props";

export function showSetDialog(serviceContainer: IServiceContainer, setId: number): void {
  void serviceContainer.collectionManagerProxy.getData<MtgSetDto>("library", `/public/mtg-set/${setId}`)
    .then(
      (setDto: MtgSetDto) => {
        const viewmodel: MtgSetDetailViewmodel = serviceContainer.viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetDetailViewmodel(setDto);
        const dialogProps: MtgSetDialogProps = {
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: MtgSetDialogBodyProps) => {
            return (<MtgSetDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: MtgSetDialogFooterProps) => {
            return (<MtgSetDialogFooter {...footerProps} />);
          },
          isOpen: true,
          title: (
            <>
              <i
                key={`icon-${viewmodel.dto.id}`}
                className={classNames("tree-view-image", "ss", "ss-" + viewmodel.keyruneCode.toLowerCase())}
              >
              </i>
              {viewmodel.setName}
            </>
          )
        };
        serviceContainer.dialogService.openDialog(dialogProps);
      },
      noop
    );
}
