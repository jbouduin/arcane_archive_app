import { Dialog } from "@blueprintjs/core";
import classNames from "classnames";
import { SplashContent } from "./splash-content";
import { SplashScreenProps } from "./splash-screen.props";

export function SplashScreen(props: SplashScreenProps) {
  return (
    <Dialog
      canEscapeKeyClose={true}
      canOutsideClickClose={false}
      className={classNames(props.className, "splash-window")}
      enforceFocus={true}
      isOpen={props.isOpen}
      onClose={props.onDialogClose}
      shouldReturnFocusOnClose={true}
    >
      <SplashContent />
    </Dialog>
  );
}
