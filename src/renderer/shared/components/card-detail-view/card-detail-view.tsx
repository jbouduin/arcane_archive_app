import { H5, Section, SectionCard, Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import { ScryFallImageStatus } from "../../../../common/enums";
import { useServices } from "../../../hooks";
import { LanguageDto } from "../../dto";
import { ScryfallLanguageMap } from "../../types";
import { LibraryCardfaceViewmodel, LibraryCardViewmodel } from "../../viewmodel";
import { CardSymbolRenderer } from "../card-symbol-renderer";
import { LanguageButtonBar } from "../language-button-bar";
import { CardDetailViewProps } from "./card-detail-view.props";
import { CardfaceView } from "./card-face-view/cardface-view";
import { CardHeaderView } from "./card-header-view/card-header-view";
import { CardImageView } from "./card-image-view/card-image-view";
import { LegalitiesView } from "./legalities-view/legalities-view";
import { RulingsView } from "./rulings-view/rulings-view";

export function CardDetailView(props: CardDetailViewProps) {
  //#region State -------------------------------------------------------------
  const [cardViewmodel, setCardviewmodel] = React.useState<LibraryCardViewmodel | null>(null);
  const [currentLanguage, setCurrentLanguage] = React.useState<LanguageDto>({
    language: "",
    sequence: -1,
    printedCode: "",
    displayValue: "",
    buttonText: ""
  });
  //#endregion

  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
  //#endregion

  //#region Effects -----------------------------------------------------------
  React.useEffect(
    () => {
      if (props.cardId) {
        void serviceContainer.viewmodelFactoryService.mtgCardViewmodelFactory
          .getLibraryCardDetailViewmodel(serviceContainer.arcaneArchiveProxy, props.cardId)
          .then(
            (viewmodel: LibraryCardViewmodel) => {
              setCardviewmodel(viewmodel);
              setCurrentLanguage(viewmodel.languages[0]);
            },
            () => setCardviewmodel(null)
          );
      } else {
        setCardviewmodel(null);
      }
    },
    [props.cardId]
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <div className="card-view-wrapper">
      {
        cardViewmodel &&
        (
          <>
            <div style={{ minWidth: "410px" }}>
              {renderTopSection(cardViewmodel)}
              {renderFacesSection(cardViewmodel)}
              {renderMoreSection(cardViewmodel)}
            </div>
          </>
        )
      }
    </div>
  );

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
                allLanguages={card.languages}
                currentLanguage={currentLanguage}
                onButtonClick={(language: LanguageDto) => setCurrentLanguage(language)}
              />
            </SectionCard>
          )
        }
        <CardImageView
          cardLayout={card.layout}
          cachedImageSize={serviceContainer.configurationService.preferences.cachedImageSize}
          cardBackId={card.cardBackId}
          setCode={card.layout != "TOKEN" ? card.setCode : card.tokenSetCode}
          collectorNumber={card.collectorNumber}
          scryfallLanguage={ScryfallLanguageMap.get(currentLanguage.language) || "en"}
          imageStatus={card.cardLanguages.get(currentLanguage.language)?.imageStatus || ScryFallImageStatus.UNKNOWN}
        />
      </Section>
    );
  }

  function renderFacesSection(card: LibraryCardViewmodel): Array<React.JSX.Element> {
    let result: Array<React.JSX.Element>;
    const languageViewModel = card.cardLanguages.get(currentLanguage.language);

    if (languageViewModel) {
      result = Array.of(...languageViewModel.cardfaces.values()).map((face: LibraryCardfaceViewmodel, idx: number) => {
        return (
          <CardfaceView
            cardface={face}
            key={"face-" + idx.toString()}
          />
        );
      });
    } else {
      result = new Array<React.JSX.Element>();
    }
    return result;
  }

  function renderMoreSection(card: LibraryCardViewmodel): React.JSX.Element {
    return (
      <Section
        collapsible={true}
        compact={true}
        title={<div><H5 style={{ marginBottom: "0px" }}>More</H5></div>}
      >
        <SectionCard className="card-view-section-card">
          <Tabs
            animate={true}
            defaultSelectedTabId="Legality"
            id="card-detail-tabs"
            renderActiveTabPanelOnly={true}
          >
            <Tab
              id="Legality"
              key="legality"
              panel={
                (
                  <LegalitiesView
                    legalities={card.legalities}
                    setCode={card.setCode}
                    collectorNumber={card.collectorNumber}
                  />
                )
              }
              title="Legality"
            />
            <Tab
              id="Rulings"
              key="rulings"
              panel={<RulingsView oracleId={card.oracleId} />}
              title="Rulings"
            />
            {/* <Tab
              id="Owned"
              key="owned"
              // panel={<CardOwnerShipView cardId={cardViewState.card.cardId} className={props.className} collectionId={props.collectionId} />}
              title="Ownership"
            />
            <Tab
              id="All prints"
              key="all-prints"
              // panel={<CardAllPrints cardId={cardViewState.card.cardId} oracleId={cardViewState.card.oracleId} />}
              title="All prints"
            /> */}
          </Tabs>
        </SectionCard>
      </Section>
    );
  }
  //#endregion
}
