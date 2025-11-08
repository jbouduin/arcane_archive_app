import { Classes, SectionCard } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { useServices } from "../../../../hooks/use-services";
import { LibraryRulingDto } from "../../../dto";
import { compareClassNameProp } from "../../util";
import { RulingsViewProps } from "./rulings-view.props";
import { ResultDto } from "../../../../../common/dto/mtg-collection";
import { LibraryRulingViewmodel } from "../../../viewmodel/mtg-card";

export const RulingsView = React.memo(
  (props: RulingsViewProps) => {
    // #region State ----------------------------------------------------------
    const [rulings, setRulings] = React.useState<Array<LibraryRulingViewmodel>>(new Array<LibraryRulingViewmodel>());
    // #endregion

    // #region Context --------------------------------------------------------
    const serviceContainer = useServices();
    // #endregion

    // #region Effects --------------------------------------------------------
    React.useEffect(
      () => {
        void fetch(serviceContainer.configurationService.configuration.apiConfiguration.mtgCollectionApiRoot + "/ruling/" + props.oracleId)
          .then(async (response: Response) => {
            const result: ResultDto<Array<LibraryRulingDto>> = (await response.json()) as ResultDto<Array<LibraryRulingDto>>;
            setRulings(serviceContainer.viewmodelFactoryService.mtgCardViewmodelFactory.getRulingsViewmodel(result.data));
          });
      },
      [props.oracleId]
    );
    // #endregion

    // #region Rendering ------------------------------------------------------
    return (
      <SectionCard padded={false}>
        {
          rulings.length > 0 && rulings.map((ruling: LibraryRulingViewmodel, idx: number) => renderSingleRulingLine(idx, ruling, idx == rulings.length - 1))
        }
      </SectionCard>
    );

    function renderSingleRulingLine(idx: number, ruling: LibraryRulingViewmodel, isLast: boolean): React.JSX.Element {
      return (
        <div key={`r-${idx}`}>
          <p>
            {ruling.publishedAt.toLocaleDateString(navigator.language, { day: "2-digit", month: "2-digit", year: "numeric" }) + " - " + ruling.source}
          </p>
          <p className={Classes.RUNNING_TEXT}>{ruling.rulingText}</p>
          {
            !isLast &&
            <p className={classNames("bp6-divider", "ruling-divider")} />
          }
        </div>
      );
    }
    // #endregion
  },
  (prev: RulingsViewProps, next: RulingsViewProps) => {
    return prev.oracleId == next.oracleId && compareClassNameProp(prev.className || "", next.className || "");
  }
);
