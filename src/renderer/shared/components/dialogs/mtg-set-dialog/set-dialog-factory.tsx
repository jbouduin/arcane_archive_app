import classNames from "classnames";
import { IMtgSetService, IViewmodelFactoryService } from "../../../context";
import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { MtgSetDialogBody } from "./mtg-set-dialog-body";
import { MtgSetDialogFooter } from "./mtg-set-dialog-footer";
import * as DialogProps from "./mtg-set-dialog.props";

function mtgSetSetDialogPropsImpl(
  cardSetId: number,
  mtgSetService: IMtgSetService,
  viewmodelFactoryService: IViewmodelFactoryService
): Promise<DialogProps.MtgSetDialogProps> {
  return mtgSetService
    .getSetDetails(cardSetId)
    .then((set: MtgSetDto) => {
      const viewmodel: MtgSetDetailViewmodel =
        viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetDetailViewmodel(set);
      const dialogProps: DialogProps.MtgSetDialogProps = {
        viewmodel: viewmodel,
        bodyRenderer: (bodyProps: DialogProps.MtgSetDialogBodyProps) => {
          return (<MtgSetDialogBody {...bodyProps} />);
        },
        footerRenderer: (footerProps: DialogProps.MtgSetDialogFooterProps) => {
          return (<MtgSetDialogFooter {...footerProps} />);
        },
        isOpen: true,
        title: (
          <>
            <i
              key={`icon-${viewmodel.dto.id}`}
              className={classNames("ss", "ss-" + viewmodel.dto["keyruneCode"].toLowerCase(), "ss-2x")}
              style={{ paddingRight: "10px" }}
            >
            </i>
            {viewmodel.dto["setName"]}
          </>
        )
      };
      return dialogProps;
    });
}

export const mtgSetDialogPropsFactory = {
  getSetDialogProps: mtgSetSetDialogPropsImpl
};
