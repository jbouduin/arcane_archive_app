import { SectionCard, Tab, Tabs } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { ScryFallImageStatus } from "../../../../common/enums";
import { usePreferences, useServices } from "../../../hooks";
import { CardDetailDto, LanguageDto } from "../../dto";
import { ScryfallLanguageMap } from "../../types";
import { CardDetailViewmodel, LibraryCardfaceViewmodel } from "../../viewmodel";
import { LanguageButtonBar } from "../language-button-bar";
import { CardDetailSection } from "./card-detail-section";
import { CardDetailViewProps } from "./card-detail-view.props";
import { CardfaceView } from "./card-face-view/cardface-view";
import { CardImageView } from "./card-image-view/card-image-view";
import { CardOwnership } from "./card-ownership";
import { LegalitiesView } from "./legalities-view/legalities-view";
import { RulingsView } from "./rulings-view/rulings-view";

export function CardDetailView(props: CardDetailViewProps): JSX.Element {
  //#region State -------------------------------------------------------------
  const [cardViewmodel, setCardviewmodel] = React.useState<CardDetailViewmodel | null>(null);
  const [currentLanguage, setCurrentLanguage] = React.useState<LanguageDto>({
    language: "",
    sequence: -1,
    printedCode: "",
    displayValue: "",
    buttonText: ""
  });
  //#endregion

  //#region Hooks -------------------------------------------------------------
  const { mtgCardService, viewmodelFactoryService } = useServices();
  const { preferences } = usePreferences();
  //#endregion

  //#region Effects -----------------------------------------------------------
  React.useEffect(
    () => {
      if (props.mode == "library") {
        void mtgCardService
          .getCardDetailByCardId(props.cardId)
          .then(
            (cardDetail: CardDetailDto) => {
              const viewmodel = viewmodelFactoryService.mtgCardViewmodelFactory.getCardDetailViewmodel(cardDetail);
              setCardviewmodel(viewmodel);
              setCurrentLanguage(viewmodel.languages[0]);
            },
            () => setCardviewmodel(null)
          );
      } else if (props.mode == "collection") {
        void mtgCardService
          .getCardDetailByCardLanguageId(props.cardLanguageId)
          .then(
            (cardDetail: CardDetailDto) => {
              const viewmodel = viewmodelFactoryService.mtgCardViewmodelFactory.getCardDetailViewmodel(cardDetail);
              setCardviewmodel(viewmodel);
              setCurrentLanguage(viewmodel.languages[0]);
            },
            () => setCardviewmodel(null)
          );
        setCardviewmodel(null);
      } else {
        setCardviewmodel(null);
      }
    },
    [
      props.mode,
      props.mode === "library"
        ? props.cardId
        : undefined,
      props.mode === "collection"
        ? props.cardLanguageId
        : undefined
    ]
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
              {props.mode == "collection" && (
                <CardOwnership
                  cardCode={cardViewmodel.code}
                  collectionId={props.collectionId}
                  language={currentLanguage.language}
                  onQuantityChanged={props.onQuantityChanged!}
                />
              )}
              {renderFacesSection(cardViewmodel)}
              {renderMoreSection(cardViewmodel)}
            </div>
          </>
        )
      }
    </div>
  );

  function renderTopSection(card: CardDetailViewmodel): React.JSX.Element {
    return (
      <CardDetailSection
        size="large"
        cardSymbols={card.manaCost}
        beforeTitle={(
          <i
            key={`icon-${card.setKeyruneCode}`}
            className={classNames(
              "ss",
              "ss-" + card.setKeyruneCode.toLowerCase(),
              card.rarity != "COMMON" ? "ss-" + card.rarity.toLowerCase() : "",
              "ss-2x")}
            style={{ paddingRight: "5px" }}
          >
          </i>
        )}
        title={card.cardName}
        subtitle={card.typeline}
      >
        {
          props.mode == "library" && card.languages.length > 1 &&
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
          cachedImageSize={preferences.cachedImageSize}
          cardBackId={card.cardBackId}
          setCode={card.layout != "TOKEN" ? card.setCode : card.tokenSetCode}
          collectorNumber={card.collectorNumber}
          scryfallLanguage={ScryfallLanguageMap.get(currentLanguage.language) || "en"}
          size="large"
          imageStatus={card.cardLanguages.get(currentLanguage.language)?.imageStatus || ScryFallImageStatus.UNKNOWN}
        />
      </CardDetailSection>
    );
  }

  function renderFacesSection(card: CardDetailViewmodel): Array<React.JSX.Element> {
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

  function renderMoreSection(card: CardDetailViewmodel): React.JSX.Element {
    return (
      <CardDetailSection
        // title={<div><H5 style={{ marginBottom: "0px" }}>More</H5></div>}
        size="small"
        title="More"
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
            {/*
            <Tab
              id="All prints"
              key="all-prints"
              // panel={<CardAllPrints cardId={cardViewState.card.cardId} oracleId={cardViewState.card.oracleId} />}
              title="All prints"
            /> */}
          </Tabs>
        </SectionCard>
      </CardDetailSection>
    );
  }
  //#endregion
}
