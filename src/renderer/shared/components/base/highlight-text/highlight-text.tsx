import * as React from "react";
import { HighlightTextProps } from "./highlight-text.props";

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

// BUG if the toHighlight occurs multiple times in text, things got repeated
// TODO check if we can return blueprint/text with children and intent for highlighted text
export function HighlightText(props: HighlightTextProps): Array<React.ReactNode> {
  let lastIndex = 0;
  const words = props.toHighlight
    .split(/\s+/)
    .filter((word: string) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [props.fullText];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens = new Array<React.ReactNode>();
  let continueSearch = true;
  while (continueSearch) {
    const match = regexp.exec(props.fullText);
    if (!match) {
      continueSearch = false;
    } else {
      const length = match[0].length;
      const before = props.fullText.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
        tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(<b key={lastIndex}>{match[0]}</b>);
      const rest = props.fullText.slice(lastIndex);
      if (rest.length > 0) {
        tokens.push(rest);
      }
    }
  }
  return tokens;
}
