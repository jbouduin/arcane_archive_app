import { H5, Section, SectionCard, Tab, Tabs } from "@blueprintjs/core";
import { CardSymbolRenderer } from "../../card-symbol-renderer";
import { CardfaceViewProps } from "./cardface-view.props";
import { CardTextView } from "../card-text-view/card-text.view";
import classNames from "classnames";

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
              <H5>{props.cardface.name}</H5>
            </div>
            <div>
              {props.cardface.typeLine}
            </div>
          </>
        )
      }
    >
      <SectionCard className="card-view-section-card" padded={false}>
        <Tabs
          animate={true}
          defaultSelectedTabId="Printed0"
          id="card-detail-tabs"
          renderActiveTabPanelOnly={true}
        >
          <Tab
            id="Printed0"
            panel={
              (
                <>
                  <CardTextView cardText={props.cardface.text} />
                  {
                    props.cardface.flavorText &&
                    (
                      <div>
                        <p className={classNames("bp5-divider", "ruling-divider")} />
                        <p><i>{props.cardface.flavorText}</i></p>
                      </div>
                    )
                  }
                </>
              )
            }
            title="Printed"
          />
          <Tab
            id="Oracle0"
            // TODO investigate how scryfall handles oracle text exactly (check one of those JP only cards, check a textless card and see what they have -> maybe we should store oracle texts in the oracle table identified by the oracle id)
            // panel={<CardTextView cardText={props.oracle?.oracleText} />}
            title="Oracle"
          />

        </Tabs>
      </SectionCard>
    </Section>
  );
  // #endregion
}
