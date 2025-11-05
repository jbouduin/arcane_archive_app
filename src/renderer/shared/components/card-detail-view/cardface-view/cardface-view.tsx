import { H5, Section, SectionCard } from "@blueprintjs/core";
import classNames from "classnames";
import { CardSymbolRenderer } from "../../card-symbol-renderer";
import { CardTextView } from "../card-text-view/card-text.view";
import { CardfaceViewProps } from "./cardface-view.props";

export function CardfaceView(props: CardfaceViewProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <Section
      collapsible={true}
      compact={true}
      rightElement={<CardSymbolRenderer cardSymbols={props.cardface.manaCost} className="mana-cost-image-in-title" />}
      title={
        (
          <>
            <div className="card-header-line-1">
              <H5>{props.cardface.printedName}</H5>
            </div>
            <div>
              {props.cardface.printedTypeLine}
            </div>
          </>
        )
      }
    >
      <SectionCard className="card-view-section-card" padded={false}>
        <CardTextView cardText={props.cardface.printedText} />
        {
          props.cardface.flavorText &&
          (
            <div>
              <p className={classNames("bp5-divider", "ruling-divider")} />
              <p><i>{props.cardface.flavorText}</i></p>
            </div>
          )
        }
      </SectionCard>
    </Section>
  );
  // #endregion
}
