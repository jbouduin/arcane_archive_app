import { useState } from "react";
import { ProgressCallbackValue } from "../../common/ipc";
import { SplashContent } from "../shared/components/splash";

export function SplashWrapper(): JSX.Element {
  // #region State ------------------------------------------------------------
  const [state, setState] = useState<ProgressCallbackValue>("Loading...");
  // #endregion

  // #region Event handling ---------------------------------------------------
  window.ipc.onProgress((status: ProgressCallbackValue) => {
    setState(status);
  });
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SplashContent callBackValue={state} />
  );
  // #endregion
}
