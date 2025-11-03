import { isEmpty, xor } from "lodash";
import * as React from "react";
import { IServiceContainer, ServiceContainerContext } from "../../context";
import { compareClassNameProp } from "../util";
import { CardSymbolRendererProps } from "./card-symbol-renderer.props";
import { SvgRenderer } from "../svg-renderer";

export const CardSymbolRenderer = React.memo(
  (props: CardSymbolRendererProps) => {
    return (
      <>
        <ServiceContainerContext.Consumer>
          {
            (serviceContainer: IServiceContainer) => (
              <div>
                {
                  props.cardSymbols
                    .map((cardSymbol: string, idx: number) => {
                      if (cardSymbol == "//") {
                        return (<span key={`s-${idx}`}>&nbsp; &nbsp;//&nbsp;&nbsp;</span>);
                      } else if (cardSymbol == "-") {
                        return (<span key={`s-${idx}`}>&nbsp; &nbsp;-&nbsp;&nbsp;</span>);
                      } else {
                        const symbolSvg = serviceContainer.cardSymbolService.getCardSymbolsSvg(cardSymbol);
                        if (symbolSvg) {
                          return (<SvgRenderer className={props.className} key={`s-${idx}`} svg={symbolSvg} />);
                        } else {
                          return;
                        }
                      }
                    })
                }
              </div>
            )
          }
        </ServiceContainerContext.Consumer>
      </ >
    );
    // #endregion
  },
  (prev: CardSymbolRendererProps, next: CardSymbolRendererProps) => {
    return isEmpty(xor(prev.cardSymbols || new Array<string>(), next.cardSymbols || new Array<string>())) &&
      compareClassNameProp(prev.className || "", next.className || "");
  }
);
