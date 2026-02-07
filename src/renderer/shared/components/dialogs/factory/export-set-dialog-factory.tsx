import classNames from "classnames";
import { noop } from "lodash";
import { ICollectionService, IMtgSetService, IOverlayService, IViewmodelFactoryService } from "../../../context";
import { CollectionDto, MtgSetDto } from "../../../dto";
import { SelectOption } from "../../../types";
import * as ExportSet from "../export-set-dialog";

export function showExportSetDialog(
  cardSetId: number,
  cardConditions: Array<string>,
  collectionService: ICollectionService,
  mtgSetService: IMtgSetService,
  viewmodelFactoryService: IViewmodelFactoryService,
  overlayService: IOverlayService
): void {
  mtgSetService
    .getSetDetails(cardSetId)
    .then(
      (set: MtgSetDto) => {
        const dialogProps: ExportSet.ExportSetDialogProps = {
          viewmodel: viewmodelFactoryService.mtgSetViewmodelFactory.getExportSetViewmodel(
            set,
            cardConditions,
            collectionService
              .getSelectOptions()
              .filter((c: SelectOption<CollectionDto>) => c.value.type == "COLLECTION")),
          bodyRenderer: (bodyProps: ExportSet.ExportSetDialogBodyProps) => {
            return (<ExportSet.ExportSetDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: ExportSet.ExportSetDialogFooterProps) => {
            return (<ExportSet.ExportSetDialogFooter {...footerProps} />);
          },
          isOpen: true,
          title: (
            <>
              <i
                key={`icon-${cardSetId}`}
                className={classNames("ss", "ss-" + set.keyruneCode.toLowerCase(), "ss-2x")}
                style={{ paddingRight: "10px" }}
              >
              </i>
              {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line */}
              Export {set.setName}
            </>
          )
        };
        overlayService.openDialog(dialogProps);
      },
      noop
    );
}
