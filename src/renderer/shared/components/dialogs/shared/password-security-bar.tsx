import { Callout } from "@blueprintjs/core";
import classNames from "classnames";
import { useCallback } from "react";
import { ZXCVBNScore } from "zxcvbn";
import { PasswordSecurityBarProps } from "./password-security-bar.props";

export function PasswordSecurityBar(props: PasswordSecurityBarProps) {
  const normalized = Math.min(props.guessesLog10 || 0, 14); // cap at 14
  const percentage = Math.floor((normalized / 14) * 100);
  const fillerRelativePercentage = (100 / percentage) * 100;
  const fillerFlex = percentage > 0 ? percentage / 100 : 0;

  const passwordLevel = useCallback(
    (s: ZXCVBNScore | undefined) => {
      switch (s) {
        case 0:
          return "Unacceptably weak";
        case 1:
          return "Very weak";
        case 2:
          return "Still to Weak";
        case 3:
          return "Strong";
        case 4:
          return "Very Strong";
        default:
          return "Password strength...";
      }
    },
    [props.score]
  );

  return (
    <>
      <div key="textvalue" className="textValue">{passwordLevel(props.score)}</div>
      <div
        key="progressbar"
        className={classNames("wrapper", "bp6-progress-bar")}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div className="barContainer" style={{ flex: fillerFlex }}>
          <div
            className="fillerBackground"
            style={{ width: `${fillerRelativePercentage}%` }}
          />
        </div>
      </div>
      {
        callout()
      }
    </>
  );

  function callout(): JSX.Element | null {
    if (props.warning.length > 0 || props.suggestions.length > 0) {
      return (
        <Callout
          key="callout"
          intent="warning"
          style={{ paddingBottom: "5px", marginBottom: "5px" }}
        >
          {
            props.warning.length > 0 &&
            (
              <p key="the-warning">
                {props.warning}
              </p>
            )
          }
          {
            props.suggestions.length == 1 &&
            (
              <p key="single-suggestion">
                {props.suggestions[0]}
              </p>
            )
          }
          {
            props.suggestions.length > 1 &&
            (
              <>
                Suggestions:
                <ul key="suggestions">
                  {
                    props.suggestions.map(
                      (sug: string, idx: number) => {
                        return (
                          <li key={"sug" + idx.toString()}>
                            {sug}
                          </li>
                        );
                      }
                    )
                  }
                </ul>
              </>
            )
          }
        </Callout>
      );
    } else {
      return null;
    }
  }
}
