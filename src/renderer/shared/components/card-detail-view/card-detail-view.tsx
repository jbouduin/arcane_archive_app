import { Section, SectionCard } from "@blueprintjs/core";
import React from "react";
import { ResultDto } from "../../../../common/dto/mtg-collection";
import { useServices } from "../../../hooks/use-services";
import { LibraryCardDto } from "../../dto";
import { LibraryCardViewmodel } from "../../viewmodel/mtg-card";
import { LibraryCardfaceViewmodel } from "../../viewmodel/mtg-card/library-cardface.viewmodel";
import { CardSymbolRenderer } from "../card-symbol-renderer";
import { CardDetailViewProps } from "./card-detail-view.props";
import { CardHeaderView } from "./card-header-view/card-header-view";
import { CardfaceView } from "./cardface-view/cardface-view";
import { LanguageButtonBar } from "./language-button-bar/language-button-bar";
import { CardImageView } from "./card-image-view/card-image-view";
import { ScryfallLanguageMap } from "../../types";

export function CardDetailView(props: CardDetailViewProps) {
  // #region State ------------------------------------------------------------
  const [cardViewmodel, setCardviewmodel] = React.useState<LibraryCardViewmodel | null>(null);
  const [currentLanguage, setCurrentLanguage] = React.useState<string>("");
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      if (props.cardId) {
        void fetch(serviceContainer.configurationService.configuration.apiConfiguration.mtgCollectionApiRoot + "/card/" + props.cardId)
          .then(
            async (response: Response) => {
              if (response.status == 200) {
                const dto: ResultDto<LibraryCardDto> = (await response.json()) as ResultDto<LibraryCardDto>;
                const viewmodel: LibraryCardViewmodel = serviceContainer.viewmodelFactoryService.mtgCardViewmodelFactory.getMtgCardDetailViewmodel(dto.data);
                setCardviewmodel(viewmodel);
                setCurrentLanguage(viewmodel.languages[0]);
              } else {
                setCardviewmodel(null);
              }
            },
            (_r: unknown) => setCardviewmodel(null));
      }
    },
    [props.cardId]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="card-view-wrapper">
      {
        cardViewmodel &&
        (
          <>
            <div style={{ minWidth: "410px" }}>
              {renderTopSection(cardViewmodel)}
              {renderFacesSection(cardViewmodel)}
            </div>
          </>
        )
      }
    </div>
  );
  // #endregion

  // #region Auxiliary Methods : rendering ------------------------------------
  function renderTopSection(card: LibraryCardViewmodel): React.JSX.Element {
    return (
      <Section
        collapsible={true}
        compact={true}
        rightElement={<CardSymbolRenderer cardSymbols={card.manaCost} className="mana-cost-image-in-title" />}
        title={<CardHeaderView code={card.code} cardName={card.cardName} rarity={card.rarity} keyruneCode={card.setKeyruneCode} type={card.typeline} />}
      >
        {
          props.showOtherLanguages && card.languages.length > 1 &&
          (
            <SectionCard padded={false}>
              <LanguageButtonBar
                cardLanguages={card.languages}
                currentLanguage={currentLanguage}
                onButtonClick={(language: string) => setCurrentLanguage(language)}
              />
            </SectionCard>
          )
        }
        <CardImageView
          cardLayout={card.layout}
          cardBackId={card.cardBackId}
          setCode={card.setCode}
          collectorNumber={card.collectorNumber}
          scryfallLanguage={ScryfallLanguageMap.get(currentLanguage) || "en"}
        />
      </Section>
    );
  }

  function renderFacesSection(card: LibraryCardViewmodel): Array<React.JSX.Element> {
    let result: Array<React.JSX.Element>;
    const languageViewModel = card.cardLanguages.get(currentLanguage);
    if (languageViewModel) {
      result = Array.of(...languageViewModel.cardfaces.values()).map((face: LibraryCardfaceViewmodel) => {
        return (
          <CardfaceView
            cardface={face}
            key="face0"
          // oracle={cardViewState.card.getOracle(0) ?? cardViewState.card.getCardface(0).oracle}
          />
        );
      });
    } else {
      result = new Array<React.JSX.Element>();
    }
    return result;
  }
  // #endregion
}
