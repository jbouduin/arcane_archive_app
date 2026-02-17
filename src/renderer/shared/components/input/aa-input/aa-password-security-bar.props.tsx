import { Props } from "@blueprintjs/core";
import { ZXCVBNScore } from "zxcvbn";

export interface AaPasswordSecurityBarProps extends Props {
  guessesLog10?: number;
  score?: ZXCVBNScore;
  warning: string;
  suggestions: Array<string>;
}
