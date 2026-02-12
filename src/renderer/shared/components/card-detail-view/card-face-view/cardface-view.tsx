import { BaseDivider } from "../../base/base-divider/base-divider";
import { CardDetailSection } from "../card-detail-section";
import { CardDetailSectionCard } from "../card-detail-section-card/card-detail-section-card";
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
      <CardDetailSectionCard>
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
      </CardDetailSectionCard>
    </CardDetailSection>
  );
  // #endregion
}
