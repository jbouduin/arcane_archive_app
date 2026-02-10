import { Classes, SectionCard } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices } from "../../../../hooks/use-services";
import { LibraryRulingViewmodel } from "../../../viewmodel";
import { BaseDivider } from "../../base/base-divider/base-divider";
import { compareClassNameProp } from "../../util";
import { RulingsViewProps } from "./rulings-view.props";
import { memo, useEffect, useState } from "react";

export const RulingsView = memo(
  (props: RulingsViewProps) => {
    // #region State ----------------------------------------------------------
    const [rulings, setRulings] = useState<Array<LibraryRulingViewmodel>>(new Array<LibraryRulingViewmodel>());
    // #endregion

    // #region Context --------------------------------------------------------
    const { arcaneArchiveProxy, viewmodelFactoryService } = useServices();
    // #endregion

    // #region Effects --------------------------------------------------------
    useEffect(
      () => {
        void viewmodelFactoryService.mtgCardViewmodelFactory
          .getRulingsViewmodel(arcaneArchiveProxy, props.oracleId)
          .then(
            (data: Array<LibraryRulingViewmodel>) => setRulings(data),
            noop
          );
      },
      [props.oracleId]
    );
    // #endregion

    // #region Rendering ------------------------------------------------------
    return (
      <SectionCard padded={false}>
        {
          rulings.length > 0 &&
          rulings.map((ruling: LibraryRulingViewmodel, idx: number) =>
            renderSingleRulingLine(idx, ruling, idx == rulings.length - 1)
          )
        }
      </SectionCard>
    );

    function renderSingleRulingLine(idx: number, ruling: LibraryRulingViewmodel, isLast: boolean): React.JSX.Element {
      return (
        <div key={`r-${idx}`}>
          <p>
            {ruling.publishedAtString + " - " + ruling.source}
          </p>
          <p className={Classes.RUNNING_TEXT}>{ruling.rulingText}</p>
          {
            !isLast &&
            <BaseDivider />
          }
        </div>
      );
    }
    // #endregion
  },
  (prev: RulingsViewProps, next: RulingsViewProps) => {
    return prev.oracleId == next.oracleId && compareClassNameProp(prev.className, next.className);
  }
);
