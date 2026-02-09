import { IBasicDataService, ICollectionService, IMtgSetService } from "../../../../../shared/context";
import { IMtgCardService } from "../../../../../shared/context/interface/mtg-card.service";
import { CollectionCardDto, CollectionDto, LanguageDto } from "../../../../../shared/dto";
import { CardConditionDto } from "../../../../../shared/dto/card-condition.dto";
import { LibraryCollectionCardDto } from "../../../../../shared/dto/library-collection-card.dto";
import { SelectOption } from "../../../../../shared/types";
import { CollectionCardsDialogBody } from "./collection-cards-dialog-body";
import { CollectionCardDialogFooter } from "./collection-cards-dialog-footer";
import * as DialogProps from "./collection-cards-dialog.props";
import { CollectionCardsDialogViewmodel } from "./collection-cards-dialog.viewmodel";
import { SingleCollectionCardViewmodel } from "./single-collection-card.viewmodel";

export type GetCardCallback = (code: string, languages: Array<string>) => Promise<SingleCollectionCardViewmodel>;

function getCollectionCardsDialogPropsImpl(
  collection: CollectionDto,
  cardsAndLanguages: Map<string, Array<string>>,
  cardConditions: Array<string>,
  basicDataService: IBasicDataService,
  collectionService: ICollectionService,
  cardService: IMtgCardService,
  setService: IMtgSetService
): Promise<DialogProps.CollectionCardsDialogProps> {
  const conditionsToUse = basicDataService
    .getCardConditionSelectOptions()
    .filter((value: SelectOption<CardConditionDto>) => cardConditions.includes(value.value.condition));

  /**
   * The callback function, used when navigating through multiple cards in the dialog
   */
  const getCardCallback: GetCardCallback = (code: string, languages: Array<string>) => {
    return Promise.all(
      [
        collectionService.getCollectionCards(collection.id!, code),
        cardService.getLibraryCollectionCardByCode(code)
      ])
      .then(
        ([collectionCards, libraryCollectionCard]: [Array<CollectionCardDto>, LibraryCollectionCardDto]) => {
          const result = new SingleCollectionCardViewmodel(
            {
              collectionCards: collectionCards,
              libraryCard: libraryCollectionCard,
            },
            setService.getSetTreeDtoById(libraryCollectionCard.mtgSetId)!,
            collection,
            basicDataService.getAllLanguages().filter((l: LanguageDto) => languages.includes(l.language)),
            conditionsToUse
          );
          return result;
        });
  };

  const viewmodel = new CollectionCardsDialogViewmodel(
    {
      cardsAndLanguages: cardsAndLanguages,
      collection: collection
    },
    conditionsToUse,
    getCardCallback
  );
  // --- position the viewmodel on the first card ---
  return viewmodel.getNextCard().then(
    () => {
      const dialogProps: DialogProps.CollectionCardsDialogProps = {
        isOpen: true,
        viewmodel: viewmodel,
        bodyRenderer: (bodyProps: DialogProps.CollectionCardsDialogBodyProps) => {
          return (<CollectionCardsDialogBody {...bodyProps} />);
        },
        footerRenderer: (footerProps: DialogProps.CollectionCardsDialogFooterProps) => {
          return (<CollectionCardDialogFooter {...footerProps} />);
        },
        title: "Cards in collection '" + collection.collectionName + "'"
      };
      return dialogProps;
    }
  );
}

export const collectionCardsDialogPropsFactory = {
  getCollectionCardsDialogProps: getCollectionCardsDialogPropsImpl
};
