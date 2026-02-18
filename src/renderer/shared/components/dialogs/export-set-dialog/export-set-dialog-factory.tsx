import { ICollectionService, IMtgSetService } from "../../../context";
import { CollectionDto, MtgSetDto } from "../../../dto";
import { SelectOption } from "../../../types";
import { IMtgSetViewmodelFactory } from "../../../viewmodel";
import { CardSetIcon } from "../../card-set-icon";
import { ExportSetDialogBody } from "./export-set-dialog-body";
import { ExportSetDialogFooter } from "./export-set-dialog-footer";
import * as DialogProps from "./export-set-dialog.props";

//#region Implementation ------------------------------------------------------
function getExportSetDialogPropsImpl(
  cardSetId: number,
  cardConditions: Array<string>,
  collectionService: ICollectionService,
  mtgSetService: IMtgSetService,
  mtgSetViewmodelFactory: IMtgSetViewmodelFactory
): Promise<DialogProps.ExportSetDialogProps> {
  return mtgSetService
    .getSetDetails(cardSetId) // LATER check if passing MtgSetTreeDto would be enough
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
              <CardSetIcon
                keyruneCode={set.keyruneCode}
                size="large"
              />
              {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line */}
              Export {set.setName}
            </>
          )
        };
        return dialogProps;
      }
    );
}
//#endregion

export const exportSetDialogPropsFactory = {
  getExportSetDialogProps: getExportSetDialogPropsImpl
};
