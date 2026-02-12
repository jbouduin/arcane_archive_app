import "./CardDetailSectionCard.css";

import { SectionCard } from "@blueprintjs/core";
import { CardDetailSectionCardProps } from "./card-detail-section-card.props";

export function CardDetailSectionCard(props: CardDetailSectionCardProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  return (
    <SectionCard
      className="aa-card-detail-section-card"
      padded={false}
    >
      {props.children}
    </SectionCard>
  );
  //#region Rendering ---------------------------------------------------------
}
