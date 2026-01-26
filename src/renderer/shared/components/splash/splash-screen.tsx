import { Dialog } from "@blueprintjs/core";
import classNames from "classnames";
import { noop } from "lodash";
import { usePreferences } from "../../../hooks";
import { SplashContent } from "./splash-content";
import { SplashScreenProps } from "./splash-screen.props";

export function SplashScreen(props: SplashScreenProps): JSX.Element {
  const { themeClassName } = usePreferences();
  return (
    <Dialog
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      className={classNames(themeClassName, props.className, "splash-window")}
      enforceFocus={true}
      isOpen={true}
      onClose={noop}
      shouldReturnFocusOnClose={true}
    >
      <SplashContent callBackValue={props.callBackValue} />
    </Dialog>
  );
}
