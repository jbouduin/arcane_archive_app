import { IMtgSetService } from "../../../context";
import { MtgSetDto } from "../../../dto";
import { IMtgSetViewmodelFactory, MtgSetDetailViewmodel } from "../../../viewmodel";
import { CardSetIcon } from "../../card-set-icon";
import { MtgSetDialogBody } from "./mtg-set-dialog-body";
import { MtgSetDialogFooter } from "./mtg-set-dialog-footer";
import * as DialogProps from "./mtg-set-dialog.props";

//#region Implementation ------------------------------------------------------
function mtgSetSetDialogPropsImpl(
  cardSetId: number,
  mtgSetService: IMtgSetService,
  mtgSetViewmodelFactory: IMtgSetViewmodelFactory
): Promise<DialogProps.MtgSetDialogProps> {
  return mtgSetService
    .getSetDetails(cardSetId)
    .then((set: MtgSetDto) => {
      const viewmodel: MtgSetDetailViewmodel = mtgSetViewmodelFactory.getMtgSetDetailViewmodel(set);
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
            <CardSetIcon
              keyruneCode={viewmodel.dto.keyruneCode}
              size="large"
            />
            {viewmodel.dto.setName}
          </>
        )
      };
      return dialogProps;
    });
}
//#endregion

export const mtgSetDialogPropsFactory = {
  getSetDialogProps: mtgSetSetDialogPropsImpl
};
