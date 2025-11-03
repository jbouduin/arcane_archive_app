import React from "react";
import { useServices } from "../../../../hooks/use-services";
import { BaseLookupResult, GenericTextColumn, IBaseColumn } from "../../../../shared/components/base/base-table";
import { CardSetColumn, CardTableView, CollectiorNumberColumn, ColorIdentityColumn, ManaCostColumn } from "../../../../shared/components/card-table-view";
import { MtgLibraryCardListViewmodel } from "../../../../shared/viewmodel/mtg-card";
import { LibraryViewCenterProps } from "./library-view-center.props";
import { MtgLibraryCardListDto } from "../../../../shared/dto";
import { ResultDto } from "../../../../../common/dto/mtg-collection";

export function LibraryViewCenter(props: LibraryViewCenterProps) {
  // #region State ------------------------------------------------------------
  const [cards, setCards] = React.useState<Array<MtgLibraryCardListViewmodel>>(new Array<MtgLibraryCardListViewmodel>());
  const [sortedIndexMap, setSortedIndexMap] = React.useState<Array<number>>(new Array<number>());
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      void fetch(serviceContainer.configurationService.configuration.apiConfiguration.mtgCollectionApiRoot + "/card/list?pageNumber=1")
        .then(async (response: Response) => {
          const result: ResultDto<Array<MtgLibraryCardListDto>> = (await response.json()) as ResultDto<Array<MtgLibraryCardListDto>>;
          setCards(result.data.map((c: MtgLibraryCardListDto) => serviceContainer.viewmodelFactoryService.mtgCardViewmodelFactory.getMtgCardListViewmodel(c)));
        });
    },
    [props.selectedSets]
  );
  // #endregion

  // #region Memo --------------------------------------------------------------
  const sortableColumnDefinitions = React.useMemo(
    () => {
      const result = new Array<IBaseColumn<MtgLibraryCardListViewmodel, BaseLookupResult>>();
      let columNumber = 0;
      result.push(new CollectiorNumberColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Number",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, displayValue: card.collectorNumber };
        }
      ));
      result.push(new GenericTextColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Rarity",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.rarityDisplayValue };
        }
      ));
      result.push(new GenericTextColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Name",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.cardName };
        }
      ));
      result.push(new GenericTextColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Type",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.type };
        }
      ));
      result.push(new ManaCostColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Mana cost",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, convertedManaCost: card.convertedManaCost, symbols: card.manaCost };
        }
      ));
      result.push(new CardSetColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Set",
        (card: MtgLibraryCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue, cardSetName: card.setName, keyruneCode: card.setKeyruneCode, rarity: card.rarity
          };
        }
      ));
      result.push(new GenericTextColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Power",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.power };
        }
      ));
      result.push(new GenericTextColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Thoughness",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.thoughness };
        }
      ));
      result.push(new ColorIdentityColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "CI",
        (card: MtgLibraryCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue,
            colorIdentitySortValue: card.colorIdentitySortValue,
            symbols: card.colorIdentity
          };
        }
      ));
      result.push(new GenericTextColumn<MtgLibraryCardListViewmodel>(
        columNumber++,
        "Languages",
        (card: MtgLibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.languages };
        }
      ));
      return result;
    },
    []
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <CardTableView<MtgLibraryCardListViewmodel>
        // bodyContextMenuRenderer={(context: MenuContext) => contextMenu(context)}
        data={cards}
        onColumnSorted={(changedSortedIndexMap: Array<number>) => setSortedIndexMap(changedSortedIndexMap)}
        onDataSelected={
          (cards?: Array<MtgLibraryCardListViewmodel>) => {
            // eslint-disable-next-line no-console
            console.log(cards);
          }
        }
        sortableColumnDefinitions={sortableColumnDefinitions}
        sortedIndexMap={sortedIndexMap}
      />
    </div>
  );
  // #endregion
}
