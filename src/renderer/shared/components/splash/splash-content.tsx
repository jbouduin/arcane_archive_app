import { ProgressBar } from "@blueprintjs/core";
import { SplashContentProps } from "./splash-content.props";

export function SplashContent(props: SplashContentProps) {
  return (
    <div className="splash-wrapper">
      <p>{props.callBackValue}</p>
      <ProgressBar animate={true} intent="primary" value={1} />
    </div>
  );
  // #endregion
}
