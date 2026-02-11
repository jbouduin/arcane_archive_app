import classNames from "classnames";
import { ICollectionService, IMtgSetService, IViewmodelFactoryService } from "../../../context";
import { CollectionDto, MtgSetDto } from "../../../dto";
import { SelectOption } from "../../../types";
import { ExportSetDialogBody } from "./export-set-dialog-body";
import { ExportSetDialogFooter } from "./export-set-dialog-footer";
import * as DialogProps from "./export-set-dialog.props";
import { IMtgSetViewmodelFactory } from "../../../viewmodel";

function getExportSetDialogPropsImpl(
  cardSetId: number,
  cardConditions: Array<string>,
  collectionService: ICollectionService,
  mtgSetService: IMtgSetService,
  mtgSetViewmodelFactory: IMtgSetViewmodelFactory
): Promise<DialogProps.ExportSetDialogProps> {
  return mtgSetService
    .getSetDetails(cardSetId)
    .then(
      (set: MtgSetDto) => {
        const dialogProps: DialogProps.ExportSetDialogProps = {
          viewmodel: mtgSetViewmodelFactory.getExportSetViewmodel(
            set,
            cardConditions,
            collectionService
              .getSelectOptions()
              .filter((c: SelectOption<CollectionDto>) => c.value.type == "COLLECTION")),
          bodyRenderer: (bodyProps: DialogProps.ExportSetDialogBodyProps) => {
            return (<ExportSetDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: DialogProps.ExportSetDialogFooterProps) => {
            return (<ExportSetDialogFooter {...footerProps} />);
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
        return dialogProps;
      }
    );
}

export const exportSetDialogPropsFactory = {
  getExportSetDialogProps: getExportSetDialogPropsImpl
};
