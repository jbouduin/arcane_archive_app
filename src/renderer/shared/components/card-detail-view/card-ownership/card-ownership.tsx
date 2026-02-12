import { H5, Section, SectionCard } from "@blueprintjs/core";
import { useEffect, useReducer, useRef } from "react";
import { ScryFallImageStatus } from "../../../../../common/enums";
import { usePreferences, useServices } from "../../../../hooks";
import { CardConditionDto } from "../../../dto/card-condition.dto";
import { SelectOption } from "../../../types";
import { CollectionCardViewmodel } from "../../../viewmodel";
import { OwnershipTable } from "../../ownership-table";
import { CardownershipProps } from "./card-ownership.props";
import { CollectionCardDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { noop } from "lodash";

export function CardOwnership(props: CardownershipProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { collectionService, viewmodelFactoryService, basicDataService } = useServices();
  const { preferences } = usePreferences();
  //#endregion

  //#region Initialization ----------------------------------------------------
  const collection = collectionService.getCollectionById(props.collectionId);
  const conditions = preferences.cardConditions;
  const cardConditions = basicDataService
    .getCardConditionSelectOptions()
    .filter((so: SelectOption<CardConditionDto>) => conditions.includes(so.value.condition));
  const initialViewmodel = viewmodelFactoryService.collectionViewmodelFactory
    .getCollectionCardViewmodel(
      {
        cardCode: "",
        collectionId: props.collectionId,
        id: null,
        language: "ENGLISH",
        quantities: [],
        setCode: "-"
      },
      ScryFallImageStatus.UNKNOWN,
      "create",
      cardConditions
    );
  //#endregion

  //#region State -------------------------------------------------------------
  const collectionCardViewmodel = useRef<CollectionCardViewmodel>(initialViewmodel);
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  //#endregion

  //#region Effects -----------------------------------------------------------
  useEffect(
    () => {
      void collectionService
        .getCollectionCards(props.collectionId, props.cardCode, props.language)
        .then(
          (collectionCards: Array<CollectionCardDto>) => {
            if (collectionCards.length == 0) {
              collectionCardViewmodel.current = initialViewmodel;
            } else {
              collectionCardViewmodel.current = viewmodelFactoryService.collectionViewmodelFactory
                .getCollectionCardViewmodel(
                  collectionCards[0],
                  ScryFallImageStatus.UNKNOWN, // Is ok, as we do not display an image here
                  "update",
                  cardConditions);
            }
            forceUpdate();
          }
        );
    },
    []
  );

  //#region Event Handling ----------------------------------------------------
  function onCommitButtonClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: CollectionCardDto): Promise<void> {
    return collectionService
      .upsertCollectionCards([dto])
      .then(
        (resp: Array<CollectionCardDto>) => {
          collectionCardViewmodel.current = viewmodelFactoryService.collectionViewmodelFactory
            .getCollectionCardViewmodel(
              resp[0],
              ScryFallImageStatus.UNKNOWN, // Is ok, as we do not display an image here
              "update",
              cardConditions);
          forceUpdate();
          props.onQuantityChanged(collectionCardViewmodel.current.totalQuantity);
        },
        noop
      );
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <Section
      collapsible={true}
      compact={true}
      title={
        (
          <div>
            <H5 style={{ marginBottom: "0px" }}>
              {/* eslint-disable-next-line @stylistic/jsx-one-expression-per-line */}
              Collection: {collection?.collectionName || "-"}
            </H5>
          </div>
        )
      }
    >
      <SectionCard className="card-view-section-card" padded={false} style={{ marginTop: "14px", marginBottom: "6px" }}>
        <OwnershipTable
          collectionCardViewmodel={collectionCardViewmodel.current}
          cardConditions={cardConditions}
          viewmodelChanged={forceUpdate}
        />
        <DefaultDialogFooter
          viewmodelChanged={forceUpdate}
          viewmodel={collectionCardViewmodel.current}
          isOpen={true}
          onCommitButtonClick={onCommitButtonClick}
          showCancelButton={false}
        />
      </SectionCard>
    </Section>

  );
  //#endregion
}
