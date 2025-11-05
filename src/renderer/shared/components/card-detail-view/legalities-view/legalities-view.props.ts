import { Props } from "@blueprintjs/core";

export interface LegalitiesViewProps extends Props {
  setCode: string;
  collectorNumber: string;
  legalities: Map<string, string>;
}
