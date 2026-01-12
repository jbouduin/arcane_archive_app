import { isEmpty, xor } from "lodash";
import { memo } from "react";
import { useServices } from "../../../hooks";
import { SvgRenderer } from "../svg-renderer";
import { compareClassNameProp } from "../util";
import { CardSymbolRendererProps } from "./card-symbol-renderer.props";

export const CardSymbolRenderer = memo(
  (props: CardSymbolRendererProps) => {
    // #region Hooks ----------------------------------------------------------
    const serviceContainer = useServices();
    // #endregion

    // #region Rendering ------------------------------------------------------
    return (
      <div>
        {
          props.cardSymbols
            .map((cardSymbol: string, idx: number) => {
              if (cardSymbol == "//") {
                return (<span key={`s-${idx}`}>&nbsp;&nbsp;//&nbsp;&nbsp;</span>);
              } else if (cardSymbol == "-") {
                return (<span key={`s-${idx}`}>&nbsp;&nbsp;-&nbsp;&nbsp;</span>);
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

    );
    // #endregion
  },
  (prev: CardSymbolRendererProps, next: CardSymbolRendererProps) => {
    return isEmpty(xor(prev.cardSymbols || new Array<string>(), next.cardSymbols || new Array<string>())) &&
      compareClassNameProp(prev.className || "", next.className || "");
  }
);
