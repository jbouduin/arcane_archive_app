import classNames from "classnames";
import { IOverlayService, IViewmodelFactoryService } from "../../../context";
import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import * as MtgSet from "../mtg-set-dialog";

export function showSetDialog(
  set: MtgSetDto,
  viewmodelFactoryService: IViewmodelFactoryService,
  overlayService: IOverlayService
): void {
  const viewmodel: MtgSetDetailViewmodel = viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetDetailViewmodel(set);
  const dialogProps: MtgSet.MtgSetDialogProps = {
    viewmodel: viewmodel,
    bodyRenderer: (bodyProps: MtgSet.MtgSetDialogBodyProps) => {
      return (<MtgSet.MtgSetDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: MtgSet.MtgSetDialogFooterProps) => {
      return (<MtgSet.MtgSetDialogFooter {...footerProps} />);
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
  overlayService.openDialog(dialogProps);
}
