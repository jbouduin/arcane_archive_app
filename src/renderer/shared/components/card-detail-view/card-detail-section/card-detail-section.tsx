import "./card-detail-section.css";

import { H3, H5, Section } from "@blueprintjs/core";
import { CardSymbolRenderer } from "../../card-symbol-renderer";
import { CardDetailSectionProps } from "./card-detail-section.props";

export function CardDetailSection(props: CardDetailSectionProps): JSX.Element {
  //#region initialize --------------------------------------------------------
  let headerClassName: string = "";
  if (!props.subtitle) {
    headerClassName = "aa-card-section-no-subtitle";
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <Section
      collapsible={props.collapsible || true}
      compact={true}
      rightElement={cardSymbols()}
      title={props.size == "small" ? buildSmallTitle() : buildLargeTitle()}
    >
      {props.children}
    </Section>
  );

  function cardSymbols(): JSX.Element | undefined {
    if (props.cardSymbols) {
      return (
        <CardSymbolRenderer
          cardSymbols={props.cardSymbols}
          className="aa-mana-cost-in-title"
        />
      );
    } else {
      return undefined;
    }
  }

  function buildSmallTitle(): JSX.Element {
    return (
      <>
        <div className="aa-card-section-title-1">
          {props.beforeTitle}
          <H5 className={headerClassName}>{props.title}</H5>
        </div>
        {
          props.subtitle &&
          (
            <div>
              {props.subtitle}
            </div>
          )
        }
      </>
    );
  }

  function buildLargeTitle(): JSX.Element {
    return (
      <>
        <div className="aa-card-section-title-1">
          {props.beforeTitle}
          <H3>{props.title}</H3>
        </div>
        {
          props.subtitle &&
          (
            <div>
              <H5>{props.subtitle}</H5>
            </div>
          )
        }
      </>
    );
  }
  //#endregion
}
