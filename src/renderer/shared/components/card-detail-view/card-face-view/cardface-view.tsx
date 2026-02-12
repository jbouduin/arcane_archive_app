import { SectionCard } from "@blueprintjs/core";
import { BaseDivider } from "../../base/base-divider/base-divider";
import { CardDetailSection } from "../card-detail-section";
import { CardTextView } from "../card-text-view/card-text.view";
import { CardfaceViewProps } from "./cardface-view.props";

export function CardfaceView(props: CardfaceViewProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <CardDetailSection
      cardSymbols={props.cardface.manaCost}
      size="small"
      title={props.cardface.printedName}
      subtitle={props.cardface.printedTypeLine}
    >
      <SectionCard className="card-view-section-card" padded={false}>
        <CardTextView key="card-text" cardText={props.cardface.printedText} />
        {
          props.cardface.flavorText &&
          (
            <>
              <BaseDivider key="divider" />
              <p key="flavor-text"><i>{props.cardface.flavorText}</i></p>
            </>
          )
        }
      </SectionCard>
    </CardDetailSection>
  );
  // #endregion
}
